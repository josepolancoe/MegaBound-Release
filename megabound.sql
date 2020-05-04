-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-05-2020 a las 01:17:58
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `megabound`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accounts`
--

CREATE TABLE `accounts` (
  `Id` int(11) NOT NULL,
  `Email` varchar(120) DEFAULT NULL,
  `Name` varchar(120) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `Salt` varchar(10) DEFAULT NULL,
  `Session` varchar(45) DEFAULT NULL,
  `IsOnline` int(11) DEFAULT NULL,
  `Birthday` date DEFAULT NULL,
  `facebook_id` varchar(70) DEFAULT '0',
  `Username` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `account_sessions`
--

CREATE TABLE `account_sessions` (
  `session_id` varchar(120) NOT NULL,
  `expires_time` varchar(80) DEFAULT NULL,
  `data_acc` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `event_log`
--

CREATE TABLE `event_log` (
  `Id` int(11) NOT NULL,
  `Event1` bigint(50) DEFAULT 0,
  `Event2` bigint(50) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guild`
--

CREATE TABLE `guild` (
  `Id` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guild_member`
--

CREATE TABLE `guild_member` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Job` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `game_id` varchar(45) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `ranking` int(11) DEFAULT NULL,
  `gp` int(11) DEFAULT NULL,
  `gold` int(11) DEFAULT NULL,
  `cash` int(11) DEFAULT NULL,
  `gender` char(2) DEFAULT NULL,
  `unlock` int(11) DEFAULT NULL,
  `photo_url` varchar(200) DEFAULT NULL,
  `name_changes` int(11) DEFAULT NULL,
  `power_user` int(11) DEFAULT NULL,
  `plus10gp` int(11) DEFAULT NULL,
  `mobile_fox` int(11) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `flowers` int(11) DEFAULT NULL,
  `map_pack` int(11) DEFAULT NULL,
  `megaphones` int(11) DEFAULT NULL,
  `is_muted` int(2) DEFAULT 0,
  `win` int(11) DEFAULT 0,
  `loss` int(11) DEFAULT 0,
  `gm` int(2) DEFAULT 0,
  `IdAcc` int(11) NOT NULL,
  `bg_url` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_avatars`
--

CREATE TABLE `user_avatars` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `aId` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT 0,
  `expire` datetime DEFAULT NULL,
  `is_cash` int(2) DEFAULT 0,
  `is_gift` int(2) DEFAULT 0,
  `amount` int(11) DEFAULT 0,
  `expire_time` bigint(40) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_avatar_equiped`
--

CREATE TABLE `user_avatar_equiped` (
  `Id` int(11) NOT NULL,
  `head` int(11) DEFAULT NULL,
  `body` int(11) DEFAULT NULL,
  `eyes` int(11) DEFAULT NULL,
  `flag` int(11) DEFAULT NULL,
  `background` int(11) DEFAULT NULL,
  `foreground` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Username_UNIQUE` (`Username`);

--
-- Indices de la tabla `account_sessions`
--
ALTER TABLE `account_sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `event_log`
--
ALTER TABLE `event_log`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `guild`
--
ALTER TABLE `guild`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FKUserAcc_idx` (`IdAcc`);

--
-- Indices de la tabla `user_avatars`
--
ALTER TABLE `user_avatars`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `user_avatar_equiped`
--
ALTER TABLE `user_avatar_equiped`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id_UNIQUE` (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accounts`
--
ALTER TABLE `accounts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `guild`
--
ALTER TABLE `guild`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `user_avatars`
--
ALTER TABLE `user_avatars`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FKUserAcc` FOREIGN KEY (`IdAcc`) REFERENCES `accounts` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
