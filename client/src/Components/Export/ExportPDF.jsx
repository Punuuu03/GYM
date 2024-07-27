import jsPDF from 'jspdf';
import 'jspdf-autotable';

const exportPDF = (data, columns, title) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(title, 14, 22);

  doc.autoTable({
    startY: 30,
    head: [columns],
    body: data,
  });

  doc.save(`${title}.pdf`);
};

export default exportPDF;
