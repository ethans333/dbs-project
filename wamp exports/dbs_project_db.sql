
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 04, 2024 at 04:30 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET foreign_key_checks = 0;  -- Disable foreign key checks for easy table manipulation
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Database: `dbs_project_db`
-- --------------------------------------------------------

-- Drop all tables if they exist in the correct order considering foreign key constraints
DROP TABLE IF EXISTS `comments`, `events_at_location`, `private_events_creates`, `public_events_creates`, `rso_events_owns`, `super_admins`, `users_joins_rsos`, `admins_create_rsos`;
DROP TABLE IF EXISTS `events`, `users`, `admins`, `rso`, `location`;

-- Creating tables
CREATE TABLE `admins` (
  `id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `location` (
  `location_id` bigint NOT NULL,
  `lname` varchar(100) NOT NULL,
  `address` varchar(300) NOT NULL,
  `longitude` double NOT NULL,
  `latitude` double NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `rso` (
  `rso_id` bigint NOT NULL,
  `name` varchar(1000) NOT NULL,
  PRIMARY KEY (`rso_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `rso` (`rso_id`, `name`) VALUES
(971346969697, 'Shrek 2'),
(30812977505, 'Spongebob Club');


CREATE TABLE `events` (
  `event_id` bigint NOT NULL,
  `time` date NOT NULL,
  `description` varchar(1000) NOT NULL,
  `ename` varchar(200) NOT NULL,
  `rso_id` bigint,
  PRIMARY KEY(`event_id`),
  FOREIGN KEY (`rso_id`) REFERENCES `rso`(`rso_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `comments` (
  `comment_id` bigint NOT NULL,
  `event_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `text` varchar(1000) NOT NULL,
  `number_of_ratings` bigint NOT NULL,
  `total_rating` bigint NOT NULL,
  `timestamp` bigint NOT NULL,
  PRIMARY KEY(`comment_id`),
  FOREIGN KEY(`event_id`) REFERENCES `events`(`event_id`),
  FOREIGN KEY(`user_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `events_at_location` (
  `event_id` bigint NOT NULL,
  `location_id` bigint NOT NULL,
  PRIMARY KEY (`event_id`),
  FOREIGN KEY (`location_id`) REFERENCES `location`(`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `private_events_creates` (
  `event_id` bigint NOT NULL,
  `creator_id` bigint NOT NULL,
  PRIMARY KEY (`event_id`, `creator_id`),
  FOREIGN KEY (`event_id`) REFERENCES `events`(`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `public_events_creates` (
  `event_id` bigint NOT NULL,
  `creator_id` bigint NOT NULL,
  PRIMARY KEY(`event_id`, `creator_id`),
  FOREIGN KEY (`event_id`) REFERENCES `events`(`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `rso_events_owns` (
  `rso_id` bigint NOT NULL,
  `event_id` bigint NOT NULL,
  PRIMARY KEY (`rso_id`, `event_id`),
  FOREIGN KEY (`rso_id`) REFERENCES `rso`(`rso_id`) ON DELETE CASCADE,
  FOREIGN KEY (`event_id`) REFERENCES `events`(`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `super_admins` (
  `id` bigint NOT NULL,
  PRIMARY KEY(`id`),
  FOREIGN KEY(`id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users_joins_rsos` (
  `user_id` bigint NOT NULL,
  `rso_id` bigint NOT NULL,
  PRIMARY KEY(`user_id`, `rso_id`),
  FOREIGN KEY(`user_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`rso_id`) REFERENCES `rso`(`rso_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Inserting data into the tables in the correct order ensuring foreign key references are respected
INSERT INTO `admins` (`id`) VALUES
(161952429028);

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(161952429028, 'bob', 'bob'),
(1592473318447, '', 'root'),
(445471898626, 'superadmin', 'root'),
(1326367976287, 'johndoe', 'lol');

INSERT INTO `location` (`location_id`, `lname`, `address`, `longitude`, `latitude`) VALUES
(1401732226609, 'Bikini Bottom', '1141 Lol Rd', 456456456, 465456456),
(676093774432, 'Student Union', '456 Lol Dr', 8888888, 777777);

-- INSERT INTO `rso` (`rso_id`, `name`) VALUES
-- (971346969697, 'Shrek 2'),
-- (30812977505, 'Spongebob Club');

INSERT INTO `events` (`event_id`, `time`, `description`, `ename`, `rso_id`) VALUES
(1448899233087, '2024-04-18', 'Eating eggs with friends!', 'Brunch', NULL),
(1279047598765, '2024-04-18', 'Were Playing Soccer with squidward.', 'Soccer Game', NULL),
(250112326565, '2024-05-01', 'Hahahahaha', 'Comedy Club', NULL),
(1460422602350, '2024-04-25', 'Get ready to chow down!', 'Burger Eating Contest', NULL),
(1295936591262, '2024-05-03', 'Rep up those fryers!', 'Meat and Greet', NULL),
(1007488911692, '2024-05-16', 'Join the swamp for some slimey grimey burgers!', 'BBQ With Shrek', 971346969697),
(1379054124903, '2024-05-03', 'Play some pigskin', 'Foot Ball', NULL),
(812807252152, '2024-05-09', 'Get a pump in.', 'Leg Day', NULL),
(1339897487686, '2024-05-15', 'Bruh!', 'Test Event', NULL),
(49912992132, '2024-04-17', 'Location', 'Test Location Location', NULL),
(287345154081, '2024-05-03', 'LOrem Ipsum', 'Hello World Event', NULL),
(404890370705, '2024-05-08', 'Lol', 'Hallo Event', NULL),
(1225483983466, '2024-04-17', 'dddddd', 'ddd', NULL),
(1336331533788, '2024-05-02', 'Lol brooo', 'Kanye West', NULL);

INSERT INTO `comments` (`comment_id`, `event_id`, `user_id`, `text`, `number_of_ratings`, `total_rating`, `timestamp`) VALUES
(96826253769, 812807252152, 445471898626, 'haha bruh', 6, 13, 1712244073509);

INSERT INTO `events_at_location` (`event_id`, `location_id`) VALUES
(1225483983466, 1401732226609),
(1336331533788, 676093774432);

INSERT INTO `private_events_creates` (`event_id`, `creator_id`) VALUES
(1339897487686, 161952429028),
(287345154081, 445471898626),
(1225483983466, 445471898626),
(1336331533788, 445471898626);

INSERT INTO `public_events_creates` (`event_id`, `creator_id`) VALUES
(1379054124903, 123456),
(49912992132, 445471898626),
(404890370705, 445471898626);

INSERT INTO `rso_events_owns` (`rso_id`, `event_id`) VALUES
(971346969697, 1007488911692);

INSERT INTO `super_admins` (`id`) VALUES
(1592473318447),
(445471898626);

INSERT INTO `users_joins_rsos` (`user_id`, `rso_id`) VALUES
(1326367976287, 971346969697);

DELIMITER $$

CREATE TRIGGER `after_rso_delete`
AFTER DELETE ON `rso`
FOR EACH ROW BEGIN
    -- Delete events owned by the RSO.
    DELETE FROM `events` WHERE `rso_id` = OLD.`rso_id`;
    DELETE FROM `rso_events_owns` WHERE `rso_id` = OLD.`rso_id`;
END$$

DELIMITER ;

-- Re-enabling foreign key checks
SET foreign_key_checks = 1;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
