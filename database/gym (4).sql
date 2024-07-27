-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2024 at 11:04 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gym`
--

-- --------------------------------------------------------

--
-- Table structure for table `centers`
--

CREATE TABLE `centers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `centers`
--

INSERT INTO `centers` (`id`, `name`, `address`) VALUES
(12, 'Gym-1', 'Pune'),
(13, 'Gym-2', 'Mumbai'),
(14, 'Gym-3', 'Baramati');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `center_id` int(11) DEFAULT NULL,
  `joining_date` date NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `name`, `phone`, `center_id`, `joining_date`, `image`) VALUES
(22, 'Punam', '9960811829', 12, '2023-07-27', 'uploads\\1722067688819.jpg'),
(23, 'Pooja', '1234567890', 13, '2023-07-27', 'uploads\\1722067810873.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `package_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `center_id` int(11) DEFAULT NULL,
  `no_of_days` int(11) NOT NULL,
  `training_type` enum('General','Personal') NOT NULL,
  `package_type` enum('Basic','Premium') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `package_name`, `price`, `center_id`, `no_of_days`, `training_type`, `package_type`) VALUES
(10, 'Basic', 1000.00, 12, 30, 'General', 'Basic'),
(11, 'Premium', 2000.00, 13, 30, 'General', 'Premium');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL,
  `offer_price` decimal(10,2) DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `paid_amount` decimal(10,2) NOT NULL,
  `payment_date` date NOT NULL,
  `payment_mode` enum('Cash','Card','Online') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `member_id`, `package_id`, `offer_price`, `start_date`, `end_date`, `paid_amount`, `payment_date`, `payment_mode`) VALUES
(51, 14, 1, 34.00, '0432-04-03', '0432-05-03', 4.00, '0023-03-31', 'Online'),
(52, 15, 4, 34.00, '0003-02-23', '0003-03-18', 4.00, '0003-03-31', 'Card'),
(53, 14, 1, 34.00, '0000-00-00', '0000-00-00', 10.00, '0003-02-02', 'Cash'),
(54, 16, 8, 34.00, '0043-03-04', '0043-10-24', 4.00, '0002-03-23', 'Cash'),
(55, 15, 4, 34.00, '0000-00-00', '0000-00-00', 100.00, '0023-03-31', 'Cash'),
(56, 17, 2, 34.00, '0003-02-03', '0003-09-25', 4.00, '0003-03-31', 'Card'),
(57, 18, 1, 34.00, '0002-03-23', '0002-04-22', 4.00, '0002-03-23', 'Cash'),
(58, 19, 4, 34.00, '0043-02-22', '0043-03-17', 4.00, '0002-02-03', 'Online'),
(59, 19, 1, 200.00, '0000-00-00', '0000-00-00', 9.00, '0003-03-31', 'Online'),
(60, 19, 1, 22.00, '0000-00-00', '0000-00-00', 22.00, '0002-03-31', 'Online'),
(93, 19, 1, 200.00, '0000-00-00', '0000-00-00', 20.00, '0032-04-23', 'Cash'),
(94, NULL, 1, 20.00, '0000-00-00', '0000-00-00', 10.00, '0002-03-31', 'Card'),
(95, NULL, 1, 10.00, '0000-00-00', '0000-00-00', 5.00, '0321-02-13', 'Cash'),
(96, NULL, 1, 2.00, '0002-12-12', '0001-02-21', 2.00, '0001-11-22', 'Online'),
(97, NULL, 1, 10.00, '0000-00-00', '0000-00-00', 5.00, '0002-02-22', 'Cash'),
(98, NULL, 1, 20.00, '0000-00-00', '0000-00-00', 15.00, '0002-02-22', 'Cash'),
(99, NULL, 1, 2.00, '0000-00-00', '0000-00-00', 3.00, '0002-02-12', 'Card'),
(100, 19, 1, 22.00, '0000-00-00', '0000-00-00', 22.00, '0002-02-22', 'Cash'),
(101, 19, 1, 11.00, '0000-00-00', '0000-00-00', 1.00, '0001-11-11', 'Cash'),
(102, 19, 1, 22.00, '0000-00-00', '0000-00-00', 2.00, '0002-02-22', 'Cash'),
(103, 19, 1, 1.00, '0000-00-00', '0000-00-00', 1.00, '0001-11-11', 'Card'),
(104, 19, 1, 1.00, '0000-00-00', '0000-00-00', 1.00, '0001-11-11', 'Card'),
(105, 19, 1, 30.00, '0000-00-00', '0000-00-00', 15.00, '0002-02-11', 'Cash'),
(106, 20, 1, 34.00, '0002-03-31', '0002-04-30', 22.00, '0002-03-31', 'Card'),
(107, 21, 4, 34.00, '3423-02-04', '3423-02-27', 22.00, '0043-03-24', 'Cash'),
(108, 22, 10, 2000.00, '2023-07-30', '2023-08-29', 1000.00, '2023-07-28', 'Card'),
(109, 23, 11, 2000.00, '2023-08-01', '2023-08-31', 500.00, '2023-07-30', 'Online'),
(110, 22, 10, 2000.00, '0000-00-00', '0000-00-00', 500.00, '2023-08-01', 'Card'),
(111, 22, 10, 2000.00, '0000-00-00', '0000-00-00', 500.00, '2023-08-05', 'Cash');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`) VALUES
(1, 'admin@gmail.com', 'admin', '12'),
(2, 'rani@gmail.com', 'punam@123', '12345'),
(4, 'p@gmail.com', 'punu', '123'),
(5, 'prisha@gmail.com', 'pr', '12');

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

CREATE TABLE `visitors` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `center_id` int(11) DEFAULT NULL,
  `visiting_date` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `enquiry_mode` enum('Call','Visit') DEFAULT NULL,
  `address` text DEFAULT NULL,
  `interested_in_joining` enum('Yes','No') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visitors`
--

INSERT INTO `visitors` (`id`, `image`, `name`, `mobile`, `center_id`, `visiting_date`, `gender`, `enquiry_mode`, `address`, `interested_in_joining`) VALUES
(6, 'C:\\fakepath\\Admit Card (2).pdf', 'anjali', '9876543210', 13, '2023-07-27', 'Female', 'Call', 'Rashin', 'Yes'),
(7, '', 'Sanchit', '9876543210', 12, '2023-07-28', 'Male', 'Visit', 'Shrigonda', 'No');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `centers`
--
ALTER TABLE `centers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `center_id` (`center_id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `center_id` (`center_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `package_id` (`package_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `center_id` (`center_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `centers`
--
ALTER TABLE `centers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`center_id`) REFERENCES `centers` (`id`);

--
-- Constraints for table `packages`
--
ALTER TABLE `packages`
  ADD CONSTRAINT `packages_ibfk_1` FOREIGN KEY (`center_id`) REFERENCES `centers` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`);

--
-- Constraints for table `visitors`
--
ALTER TABLE `visitors`
  ADD CONSTRAINT `visitors_ibfk_1` FOREIGN KEY (`center_id`) REFERENCES `centers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
