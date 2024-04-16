-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 16, 2024 at 06:25 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbs_project_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`) VALUES
(873248947238);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` bigint NOT NULL,
  `event_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `text` varchar(1000) NOT NULL,
  `number_of_ratings` bigint NOT NULL,
  `total_rating` bigint NOT NULL,
  `timestamp` bigint NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `event_id` (`event_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `event_id`, `user_id`, `text`, `number_of_ratings`, `total_rating`, `timestamp`) VALUES
(96826253769, 812807252152, 445471898626, 'haha bruh', 6, 13, 1712244073509),
(307528575325, 250112326565, 161952429028, 'This is funny', 1, 5, 1713291833339);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `event_id` bigint NOT NULL,
  `time` date NOT NULL,
  `description` varchar(1000) NOT NULL,
  `ename` varchar(200) NOT NULL,
  `rso_id` bigint DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `rso_id` (`rso_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `time`, `description`, `ename`, `rso_id`) VALUES
(49912992132, '2024-04-17', 'Location', 'Test Location Location', NULL),
(250112326565, '2024-05-01', 'Hahahahaha', 'Comedy Club', NULL),
(287345154081, '2024-05-03', 'LOrem Ipsum', 'Hello World Event', NULL),
(404890370705, '2024-05-08', 'Lol', 'Hallo Event', NULL),
(413746937490, '2024-04-24', 'See the Ye live', 'Kanye West Concert', 559917014109),
(812807252152, '2024-05-09', 'Get a pump in.', 'Leg Day', NULL),
(1007488911692, '2024-05-16', 'Join the swamp for some slimey grimey burgers!', 'BBQ With Shrek', 971346969697),
(1225483983466, '2024-04-17', 'dddddd', 'ddd', NULL),
(1279047598765, '2024-04-18', 'Were Playing Soccer with squidward.', 'Soccer Game', NULL),
(1295936591262, '2024-05-03', 'Rep up those fryers!', 'Meat and Greet', NULL),
(1336331533788, '2024-05-02', 'Lol brooo', 'Kanye West', NULL),
(1339897487686, '2024-05-15', 'Bruh!', 'Test Event', NULL),
(1379054124903, '2024-05-03', 'Play some pigskin', 'Foot Ball', NULL),
(1394692921850, '2024-04-25', 'Hay Squiwaa', 'Squidward Dabs Live', 30812977505),
(1448899233087, '2024-04-18', 'Eating eggs with friends!', 'Brunch', NULL),
(1460422602350, '2024-04-25', 'Get ready to chow down!', 'Burger Eating Contest', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `events_at_location`
--

DROP TABLE IF EXISTS `events_at_location`;
CREATE TABLE IF NOT EXISTS `events_at_location` (
  `event_id` bigint NOT NULL,
  `location_id` bigint NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `location_id` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `events_at_location`
--

INSERT INTO `events_at_location` (`event_id`, `location_id`) VALUES
(413746937490, 676093774432),
(1336331533788, 676093774432),
(1225483983466, 1401732226609),
(1394692921850, 1401732226609);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
CREATE TABLE IF NOT EXISTS `location` (
  `location_id` bigint NOT NULL,
  `lname` varchar(100) NOT NULL,
  `address` varchar(300) NOT NULL,
  `longitude` double NOT NULL,
  `latitude` double NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `lname`, `address`, `longitude`, `latitude`) VALUES
(676093774432, 'Student Union', '456 Lol Dr', 8888888, 777777),
(1401732226609, 'Bikini Bottom', '1141 Lol Rd', 456456456, 465456456);

-- --------------------------------------------------------

--
-- Table structure for table `private_events_creates`
--

DROP TABLE IF EXISTS `private_events_creates`;
CREATE TABLE IF NOT EXISTS `private_events_creates` (
  `event_id` bigint NOT NULL,
  `creator_id` bigint NOT NULL,
  PRIMARY KEY (`event_id`,`creator_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `private_events_creates`
--

INSERT INTO `private_events_creates` (`event_id`, `creator_id`) VALUES
(287345154081, 445471898626),
(1225483983466, 445471898626),
(1336331533788, 445471898626),
(1339897487686, 161952429028);

-- --------------------------------------------------------

--
-- Table structure for table `public_events_creates`
--

DROP TABLE IF EXISTS `public_events_creates`;
CREATE TABLE IF NOT EXISTS `public_events_creates` (
  `event_id` bigint NOT NULL,
  `creator_id` bigint NOT NULL,
  PRIMARY KEY (`event_id`,`creator_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `public_events_creates`
--

INSERT INTO `public_events_creates` (`event_id`, `creator_id`) VALUES
(49912992132, 445471898626),
(404890370705, 445471898626),
(1379054124903, 123456);

-- --------------------------------------------------------

--
-- Table structure for table `rso`
--

DROP TABLE IF EXISTS `rso`;
CREATE TABLE IF NOT EXISTS `rso` (
  `rso_id` bigint NOT NULL,
  `name` varchar(1000) NOT NULL,
  PRIMARY KEY (`rso_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rso`
--

INSERT INTO `rso` (`rso_id`, `name`) VALUES
(30812977505, 'Spongebob Club'),
(559917014109, 'Kanye West Fan Club'),
(971346969697, 'Shrek 2');

--
-- Triggers `rso`
--
DROP TRIGGER IF EXISTS `after_rso_delete`;
DELIMITER $$
CREATE TRIGGER `after_rso_delete` AFTER DELETE ON `rso` FOR EACH ROW BEGIN
    -- Delete events owned by the RSO.
    DELETE FROM `events` WHERE `rso_id` = OLD.`rso_id`;
    DELETE FROM `rso_events_owns` WHERE `rso_id` = OLD.`rso_id`;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `rso_events_owns`
--

DROP TABLE IF EXISTS `rso_events_owns`;
CREATE TABLE IF NOT EXISTS `rso_events_owns` (
  `rso_id` bigint NOT NULL,
  `event_id` bigint NOT NULL,
  PRIMARY KEY (`rso_id`,`event_id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rso_events_owns`
--

INSERT INTO `rso_events_owns` (`rso_id`, `event_id`) VALUES
(559917014109, 413746937490),
(971346969697, 1007488911692),
(30812977505, 1394692921850);

-- --------------------------------------------------------

--
-- Table structure for table `super_admins`
--

DROP TABLE IF EXISTS `super_admins`;
CREATE TABLE IF NOT EXISTS `super_admins` (
  `id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `super_admins`
--

INSERT INTO `super_admins` (`id`) VALUES
(445471898626);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(161952429028, 'user', 'root'),
(445471898626, 'superadmin', 'root'),
(873248947238, 'admin', 'root'),
(1326367976287, 'user1', 'root'),
(1592473318447, 'user2', 'root');

-- --------------------------------------------------------

--
-- Table structure for table `users_joins_rsos`
--

DROP TABLE IF EXISTS `users_joins_rsos`;
CREATE TABLE IF NOT EXISTS `users_joins_rsos` (
  `user_id` bigint NOT NULL,
  `rso_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`rso_id`),
  KEY `rso_id` (`rso_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users_joins_rsos`
--

INSERT INTO `users_joins_rsos` (`user_id`, `rso_id`) VALUES
(161952429028, 30812977505),
(1326367976287, 971346969697);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`rso_id`) REFERENCES `rso` (`rso_id`) ON DELETE CASCADE;

--
-- Constraints for table `events_at_location`
--
ALTER TABLE `events_at_location`
  ADD CONSTRAINT `events_at_location_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`);

--
-- Constraints for table `private_events_creates`
--
ALTER TABLE `private_events_creates`
  ADD CONSTRAINT `private_events_creates_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`);

--
-- Constraints for table `public_events_creates`
--
ALTER TABLE `public_events_creates`
  ADD CONSTRAINT `public_events_creates_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`);

--
-- Constraints for table `rso_events_owns`
--
ALTER TABLE `rso_events_owns`
  ADD CONSTRAINT `rso_events_owns_ibfk_1` FOREIGN KEY (`rso_id`) REFERENCES `rso` (`rso_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rso_events_owns_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`);

--
-- Constraints for table `super_admins`
--
ALTER TABLE `super_admins`
  ADD CONSTRAINT `super_admins_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users_joins_rsos`
--
ALTER TABLE `users_joins_rsos`
  ADD CONSTRAINT `users_joins_rsos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users_joins_rsos_ibfk_2` FOREIGN KEY (`rso_id`) REFERENCES `rso` (`rso_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
