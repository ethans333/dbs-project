-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 04, 2024 at 04:30 PM
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
  `id` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`) VALUES
(161952429028);

-- --------------------------------------------------------

--
-- Table structure for table `admins_create_rsos`
--

DROP TABLE IF EXISTS `admins_create_rsos`;
CREATE TABLE IF NOT EXISTS `admins_create_rsos` (
  `rso_id` bigint NOT NULL,
  `admin_id` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `timestamp` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `event_id`, `user_id`, `text`, `number_of_ratings`, `total_rating`, `timestamp`) VALUES
(96826253769, 812807252152, 445471898626, 'haha bruh', 6, 13, 1712244073509);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `event_id` bigint NOT NULL,
  `time` date NOT NULL,
  `description` varchar(1000) NOT NULL,
  `ename` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `time`, `description`, `ename`) VALUES
(1448899233087, '2024-04-18', 'Eating eggs with friends!', 'Brunch'),
(1279047598765, '2024-04-18', 'Were Playing Soccer with squidward.', 'Soccer Game'),
(250112326565, '2024-05-01', 'Hahahahaha', 'Comedy Club'),
(1460422602350, '2024-04-25', 'Get ready to chow down!', 'Burger Eating Contest'),
(1295936591262, '2024-05-03', 'Rep up those fryers!', 'Meat and Greet'),
(1007488911692, '2024-05-16', 'Join the swamp for some slimey grimey burgers!', 'BBQ With Shrek'),
(1379054124903, '2024-05-03', 'Play some pigskin', 'Foot Ball'),
(812807252152, '2024-05-09', 'Get a pump in.', 'Leg Day'),
(1339897487686, '2024-05-15', 'Bruh!', 'Test Event'),
(49912992132, '2024-04-17', 'Location', 'Test Location Location'),
(287345154081, '2024-05-03', 'LOrem Ipsum', 'Hello World Event'),
(404890370705, '2024-05-08', 'Lol', 'Hallo Event'),
(1225483983466, '2024-04-17', 'dddddd', 'ddd'),
(1336331533788, '2024-05-02', 'Lol brooo', 'Kanye West');

-- --------------------------------------------------------

--
-- Table structure for table `events_at_location`
--

DROP TABLE IF EXISTS `events_at_location`;
CREATE TABLE IF NOT EXISTS `events_at_location` (
  `event_id` bigint NOT NULL,
  `location_id` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `events_at_location`
--

INSERT INTO `events_at_location` (`event_id`, `location_id`) VALUES
(1225483983466, 0),
(1336331533788, 676093774432);

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
  `latitude` double NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `lname`, `address`, `longitude`, `latitude`) VALUES
(1401732226609, 'Bikini Bottom', '1141 Lol Rd', 456456456, 465456456),
(676093774432, 'Student Union', '456 Lol Dr', 8888888, 777777);

-- --------------------------------------------------------

--
-- Table structure for table `private_events_creates`
--

DROP TABLE IF EXISTS `private_events_creates`;
CREATE TABLE IF NOT EXISTS `private_events_creates` (
  `event_id` bigint NOT NULL,
  `creator_id` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `private_events_creates`
--

INSERT INTO `private_events_creates` (`event_id`, `creator_id`) VALUES
(1339897487686, 161952429028),
(287345154081, 445471898626),
(1225483983466, 445471898626),
(1336331533788, 445471898626);

-- --------------------------------------------------------

--
-- Table structure for table `public_events_creates`
--

DROP TABLE IF EXISTS `public_events_creates`;
CREATE TABLE IF NOT EXISTS `public_events_creates` (
  `event_id` bigint NOT NULL,
  `creator_id` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `public_events_creates`
--

INSERT INTO `public_events_creates` (`event_id`, `creator_id`) VALUES
(1379054124903, 123456),
(49912992132, 445471898626),
(404890370705, 445471898626);

-- --------------------------------------------------------

--
-- Table structure for table `rso`
--

DROP TABLE IF EXISTS `rso`;
CREATE TABLE IF NOT EXISTS `rso` (
  `rso_id` bigint NOT NULL,
  `name` varchar(1000) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rso`
--

INSERT INTO `rso` (`rso_id`, `name`) VALUES
(971346969697, 'Shrek 2'),
(30812977505, 'Spongebob Club');

-- --------------------------------------------------------

--
-- Table structure for table `rso_events_owns`
--

DROP TABLE IF EXISTS `rso_events_owns`;
CREATE TABLE IF NOT EXISTS `rso_events_owns` (
  `rso_id` bigint NOT NULL,
  `event_id` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rso_events_owns`
--

INSERT INTO `rso_events_owns` (`rso_id`, `event_id`) VALUES
(0, 115041780673),
(971346969697, 1007488911692);

-- --------------------------------------------------------

--
-- Table structure for table `super_admins`
--

DROP TABLE IF EXISTS `super_admins`;
CREATE TABLE IF NOT EXISTS `super_admins` (
  `id` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `super_admins`
--

INSERT INTO `super_admins` (`id`) VALUES
(1592473318447),
(445471898626);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(161952429028, 'bob', 'bob'),
(1592473318447, '', 'root'),
(445471898626, 'superadmin', 'root'),
(1326367976287, 'johndoe', 'lol');

-- --------------------------------------------------------

--
-- Table structure for table `users_joins_rsos`
--

DROP TABLE IF EXISTS `users_joins_rsos`;
CREATE TABLE IF NOT EXISTS `users_joins_rsos` (
  `user_id` bigint NOT NULL,
  `rso_id` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users_joins_rsos`
--

INSERT INTO `users_joins_rsos` (`user_id`, `rso_id`) VALUES
(1326367976287, 971346969697);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
