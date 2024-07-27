const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '', 
    database: 'gym',
});

db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to database');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/register', (req, res) => {
    const { Email, UserName, Password } = req.body;
    const SQL = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    const Values = [Email, UserName, Password];
    db.query(SQL, Values, (err, results) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).send(err);
        } else {
            res.send({ message: 'User added!' });
        }
    });
});

app.post('/login', (req, res) => {
    const { LoginUserName, LoginPassword } = req.body;
    const SQL = 'SELECT * FROM users WHERE username = ?';
    db.query(SQL, [LoginUserName], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).send({ error: err });
        }
        if (results.length > 0) {
            const user = results[0];
            if (LoginPassword === user.password) {
                res.send(user);
            } else {
                res.status(401).send({ message: `Credentials don't match!` });
            }
        } else {
            res.status(404).send({ message: `User not found!` });
        }
    });
});

app.post('/verify-email', (req, res) => {
    const { email } = req.body;
    const SQL = 'SELECT * FROM users WHERE email = ?';
    db.query(SQL, [email], (err, results) => {
        if (err) {
            console.error('Error querying email:', err);
            res.status(500).send({ message: 'Server error' });
        } else if (results.length > 0) {
            res.send({ message: 'Email exists' });
        } else {
            res.status(404).send({ message: 'Email not found' });
        }
    });
});

app.post('/update-password', (req, res) => {
    const { email, newPassword } = req.body;
    const SQL = 'UPDATE users SET password = ? WHERE email = ?';
    db.query(SQL, [newPassword, email], (err, results) => {
        if (err) {
            console.error('Error updating password:', err);
            res.status(500).send({ message: 'Server error' });
        } else if (results.affectedRows > 0) {
            res.send({ message: 'Password updated successfully' });
        } else {
            res.status(404).send({ message: 'Email not found' });
        }
    });
});

app.get('/user', (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send({ message: 'User ID is required' });
    }

    const SQL = 'SELECT * FROM users WHERE id = ?';
    db.query(SQL, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).send({ message: 'Server error' });
        } else if (results.length > 0) {
            res.send(results[0]);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    });
});

app.post('/add_center', (req, res) => {
    const { name, address } = req.body;
    const sql = "INSERT INTO centers (name, address) VALUES (?, ?)";
    db.query(sql, [name, address], (err, result) => {
        if (err) {
            console.error("Query error in /add_center:", err);
            return res.status(500).json({ Status: false, Error: "Query error" });
        }
        return res.json({ Status: true });
    });
});

app.get('/centers/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM centers WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Query error in /centers/:id:", err);
            return res.status(500).json({ Status: false, Error: "Query error" });
        }
        if (result.length > 0) {
            return res.json({ Status: true, Result: result[0] });
        } else {
            return res.status(404).json({ Status: false, Error: "Center not found" });
        }
    });
});

app.put('/centers/:id', (req, res) => {
    const id = req.params.id;
    const { name, address } = req.body;
    const sql = "UPDATE centers SET name = ?, address = ? WHERE id = ?";
    
    db.query(sql, [name, address, id], (err, result) => {
        if (err) {
            console.error("Query error in /centers/:id:", err);
            return res.status(500).json({ Status: false, Error: "Query error" });
        }
        if (result.affectedRows > 0) {
            return res.json({ Status: true });
        } else {
            return res.status(404).json({ Status: false, Error: "Center not found" });
        }
    });
});

app.get('/centers', (req, res) => {
    const query = 'SELECT * FROM centers';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching centers:', err);
        res.status(500).json({ Error: 'Error fetching centers' });
      } else {
        res.json({ Status: true, Result: results });
      }
    });
  });
  
  app.delete('/centers/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM centers WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error deleting center:', err);
        res.status(500).json({ Error: 'Error deleting center' });
      } else {
        res.json({ Status: true });
      }
    });
  });
  
  
  
app.get('/api/packages', (req, res) => {
    const sql = `SELECT p.*, c.name AS center_name FROM packages p
                 LEFT JOIN centers c ON p.center_id = c.id`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching packages:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

app.get('/api/centers', (req, res) => {
    const sql = `SELECT id, name FROM centers`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching centers:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

app.post('/api/packages', (req, res) => {
    const { package_name, price, center_id, no_of_days, training_type, package_type } = req.body;
    const sql = `INSERT INTO packages (package_name, price, center_id, no_of_days, training_type, package_type)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [package_name, price, center_id, no_of_days, training_type, package_type];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error adding package:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ id: results.insertId, message: 'Package added successfully' });
    });
});

app.put('/api/packages/:id', (req, res) => {
    const packageId = req.params.id;
    const { package_name, price, center_id, no_of_days, training_type, package_type } = req.body;
    const sql = `UPDATE packages SET package_name = ?, price = ?, center_id = ?, no_of_days = ?, training_type = ?, package_type = ?
                 WHERE id = ?`;
    const values = [package_name, price, center_id, no_of_days, training_type, package_type, packageId];
    db.query(sql, values, (err) => {
        if (err) {
            console.error('Error updating package:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Package updated successfully' });
    });
});

app.delete('/api/packages/:id', (req, res) => {
    const packageId = req.params.id;
    const sql = `DELETE FROM packages WHERE id = ?`;
    db.query(sql, [packageId], (err) => {
        if (err) {
            console.error('Error deleting package:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Package deleted successfully' });
    });
});

app.post('/api/members', upload.single('image'), (req, res) => {
    const { name, phone, center_id, joining_date } = req.body;
    const image = req.file ? req.file.path : null;

    const memberSql = `INSERT INTO members (name, phone, center_id, joining_date, image)
                       VALUES (?, ?, ?, ?, ?)`;
    const memberValues = [name, phone, center_id, joining_date, image];

    db.query(memberSql, memberValues, (err, memberResults) => {
        if (err) {
            console.error('Error adding member:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json({ id: memberResults.insertId, message: 'Member added successfully' });
    });
});

app.post('/api/transactions', (req, res) => {
    const { member_id, package_id, offer_price, start_date, end_date, paid_amount, payment_date, payment_mode } = req.body;

    const transactionSql = `INSERT INTO transactions (member_id, package_id, offer_price, start_date, end_date, paid_amount, payment_date, payment_mode)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const transactionValues = [member_id, package_id, offer_price, start_date, end_date, paid_amount, payment_date, payment_mode];

    db.query(transactionSql, transactionValues, (err) => {
        if (err) {
            console.error('Error adding transaction:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json({ message: 'Transaction added successfully' });
    });
});

app.get('/adp/members', (req, res) => {
    const query = `
      SELECT 
        members.id, 
        members.name, 
        members.phone, 
        members.image, 
        members.joining_date AS joiningDate, 
        centers.name AS centerName 
      FROM members
      LEFT JOIN centers ON members.center_id = centers.id
    `;
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching members:', err);
        res.status(500).json({ error: 'Error fetching members' });
      } else {
        res.json(results);
      }
    });
  });


app.get('/api/members/:id', (req, res) => {
    const memberId = req.params.id;
    const memberSql = 'SELECT * FROM members WHERE id = ?';
    db.query(memberSql, [memberId], (err, memberResults) => {
      if (err) {
        console.error('Error fetching member:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (memberResults.length > 0) {
        res.json(memberResults[0]);
      } else {
        res.status(404).json({ error: 'Member not found' });
      }
    });
  });
  
  app.get('/api/transactions/:id', (req, res) => {
    const memberId = req.params.id;
    const transactionSql = 'SELECT * FROM transactions WHERE member_id = ?';
    db.query(transactionSql, [memberId], (err, transactionResults) => {
      if (err) {
        console.error('Error fetching transactions:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(transactionResults);
    });
  });


app.get('/api/member-packages/:memberId', (req, res) => {
    const memberId = parseInt(req.params.memberId, 10);
  
    const query = `
      SELECT t.package_id, p.price AS offer_price
FROM transactions t
JOIN packages p ON t.package_id = p.id
WHERE t.member_id = ?
`;
  
    connection.query(query, [memberId], (err, results) => {
      if (err) {
        console.error('Error fetching package details:', err);
        return res.status(500).json({ error: 'Failed to fetch package details' });
      }
  
      res.json(results);
    });
  });


app.get('/visitors', (req, res) => {
    const query = `SELECT v.*, c.name as center_name FROM visitors v
                   JOIN centers c ON v.center_id = c.id`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).send({ Status: false, Error: err });
        res.json({ Status: true, Result: results });
    });
});

app.post('/add_visitors', (req, res) => {
    const { image, name, mobile, center_id, visiting_date, gender, enquiry_mode, address, interested_in_joining } = req.body;
    const query = `INSERT INTO visitors (image, name, mobile, center_id, visiting_date, gender, enquiry_mode, address, interested_in_joining) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [image, name, mobile, center_id, visiting_date, gender, enquiry_mode, address, interested_in_joining], (err, result) => {
        if (err) return res.status(500).send({ Status: false, Error: err });
        res.json({ Status: true, id: result.insertId });
    });
});

app.delete('/visitors/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM visitors WHERE id = ?`;
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).send({ Status: false, Error: err });
        res.json({ Status: true, Result: result });
    });
});


app.get('/transactions', (req, res) => {
    const query = `
      SELECT 
        members.id AS member_id, 
        members.name AS member_name, 
        transactions.id AS transaction_id, 
        transactions.package_id, 
        transactions.offer_price, 
        transactions.start_date, 
        transactions.end_date, 
        transactions.paid_amount, 
        transactions.payment_date, 
        transactions.payment_mode
      FROM 
        transactions 
      JOIN 
        members 
      ON 
        transactions.member_id = members.id
      ORDER BY 
        members.id, transactions.id;
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });


app.get('/exp/members', (req, res) => {
    const query = 'SELECT * FROM members';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching members', error: err });
        }
        res.json(results);
    });
});

app.get('/exp/visitors', (req, res) => {
    const query = 'SELECT * FROM visitors';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching visitors', error: err });
        }
        res.json(results);
    });
});

app.get('/exp/transactions', (req, res) => {
    const query = 'SELECT * FROM transactions';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching transactions', error: err });
        }
        res.json(results);
    });
});

app.get('/exp/packages', (req, res) => {
    const query = 'SELECT * FROM packages';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching packages', error: err });
        }
        res.json(results);
    });
});

app.get('/exp/centers', (req, res) => {
    const query = 'SELECT * FROM centers';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching centers', error: err });
        }
        res.json(results);
    });
});
