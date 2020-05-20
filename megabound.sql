-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2020 a las 08:54:42
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

--
-- Volcado de datos para la tabla `accounts`
--

INSERT INTO `accounts` (`Id`, `Email`, `Name`, `Password`, `Salt`, `Session`, `IsOnline`, `Birthday`, `facebook_id`, `Username`) VALUES
(1, '', 'Polanco', 'Veilsiderx7', ':', '4e05df95af95f24626659124500b2b68', 0, '1990-01-01', '0', 'Polanco'),
(2, '', 'Atenea', 'Veilsiderx7', ':', 'cc4fa2d4f30c34d39853d9a98d08f7c6', 0, '1990-01-01', '0', 'Atenea');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `account_sessions`
--

CREATE TABLE `account_sessions` (
  `session_id` varchar(120) NOT NULL,
  `expires_time` varchar(80) DEFAULT NULL,
  `data_acc` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `account_sessions`
--

INSERT INTO `account_sessions` (`session_id`, `expires_time`, `data_acc`) VALUES
('-0USkQJd-6uTv36uQ1lxgYIYDJ7LgMPB', '1589958226', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.641Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('-5cPgvDI-3ElVbGgwPbXr8pJGwguFuBz', '1589958125', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:02:05.303Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('-hXwYJsfLF_15tUUC74PbJC1hOQLM7iA', '1589958257', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:17.060Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('-n6SfOoESxFEu19httLYcAkKkqgXNeZW', '1589957991', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:50.761Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('-sk046YOsHWydGjlG7NUB0bcGabB27tw', '1589957991', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:50.803Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('0jeO0xsZNBXR93kIi-DmXEPw23PYPEo0', '1589958226', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.660Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('15HaD4RqbrreRmUjCM3X7dxZ7MnaCKFD', '1589957970', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:30.091Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('1InMsXBsPcKhPEn9Ol-SijQoVT8886_u', '1589958259', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.287Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('1JPGXXQw3lUxOywKYKhGDbIYv13MDBwK', '1589958217', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.112Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('2YkE5_6mJrGHsIIDcIFuOL6gCSZEOFzu', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:13.821Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('3Fh8QYAg9QyONZqSI7-cn2ia739IMMQ3', '1589958125', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:02:05.252Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('3OZwn6KiDaLqQTCz_I6ndVCFN9dM3bn9', '1589958112', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:51.660Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('3XjgQPIsuS6ymYd34JafwlIUGHFHbnYz', '1589957970', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:29.637Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('4fjKfyoDHrZ_Pi2FfMCqxUVfkwzmlRYw', '1589958260', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.709Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('4Raes0hHjQIAe_eOm4X5YQ7pT6qgrcOi', '1589958217', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.153Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('5EH1PDzUUxI0KmSH5sYhRilYVOt7F2HI', '1589958225', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.015Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('5k9dM8EZVu9dwS-DB0pIuw1mIRAoOQCx', '1589958260', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.669Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('62VAytvGemJlyk4LhUnOL8rQcu-BMHwf', '1589958192', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:11.975Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('67JrdY6z6MPUzSi7EhfOYBSQGzsBhfjc', '1589958260', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.669Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('6IkJPFS8UUYhKyxfioTqoBlUgKbgIfSS', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:13.875Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('6NlPvbETdkXkl-2wJ1qmJjUMYl1zen4J', '1589958112', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:51.660Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('6YQc5pHVLjIDC_tEPRwphQWy1nbphrBv', '1589958114', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:53.526Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('7-30WNYkx6tTyrFHnImlu0Ulx3Hdmxp8', '1589958192', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:12.088Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('73RTzh5JK1joNW5E0EnCaA2AJSqgBmvK', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:14.293Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('77DOoW-nOgF2yaFnth6m3uzRrNiFOpca', '1589958225', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.016Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('7JjEdFdC_MA7gVA0pvqX2TUNhmjsfJnD', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:13.818Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('7sdGe61X3nqz6oV3n_Ask1oWswey3LEt', '1589958125', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:02:05.167Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('7Th0jN-ax49YsrQub8zNCr_j3Y5hEjNV', '1589958112', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:51.979Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('86QKQuQFbFNucg8168ltx1Vrg_grZMI1', '1589957989', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:49.317Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('88qwJ5KFMhThBFAcn_ZR6k-bvdmtDAj9', '1589958114', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:53.584Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('89UJcr1i7nW_5_1E4N0XYsVoUsURgTxx', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:14.268Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('98WqNkaq3KJjanx5Ny13wgMOWstRZEd1', '1589958261', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:21.461Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('9KCo5XoLq3BmpsCYADNcNolPMseQ7xm3', '1589957989', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:49.332Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('9KjEPPPcvQDbQjSwuzncRw5lL-LNENTx', '1589958192', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:12.101Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('9pbwO53LGt5Xml1NFC58gM4gzydyvwTw', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:13.799Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('a5xnQ4RnIOSJsXmzfFJehs84dOtSIGMs', '1589958218', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.559Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('ABfrDHq9AbJurX2Y3NVkE7rkiEW4pVvf', '1589958218', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.561Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('aSgk87pE_df6_w9txnGmX2msM8J3husT', '1589958183', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:03.170Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('Aug2QR2qym3NGyr-CXCT9VMiua81izGF', '1589957970', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:29.804Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('B3ub9GueBbzBgpNRIdrO8pAGv9UmtDZ8', '1589958262', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:21.604Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('B4FeL2z2VA7g6TG_gk9T_YnzBnmD6LK5', '1589958182', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:02.250Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('BjOFIN2T6IzdgoXwBZVQn0iSTE3dK0yG', '1589958260', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.652Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('BkZeUewqDE8wpKfovttKUGhwVKnD6Fv0', '1589958259', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.286Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('BOCvSBY4nKpCk_X56JGcvZhXvpcVqkuq', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:14.270Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('B_2hJAousGu69u8Ow5h-IR0MDFIIlX94', '1589958258', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:18.002Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('CAVSRqhm5Oq9GMQ0RxhLEfk7_A1sI62a', '1589958192', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:11.992Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('cL_-aboVk2nsBZFgHBE3-2IKwBWfppFk', '1589958056', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:00:56.326Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":2,\"acc_session\":\"cc4fa2d4f30c34d39853d9a98d08f7c6\",\"game_id\":\"Atenea\"}'),
('cRNTbCrSCTI6bTCbYmy9xc902h1MMvQw', '1589958112', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:51.511Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('d7WFEZbfe5c2_-j6XtFyurfG4CHrRbHj', '1589958125', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:02:05.227Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('DGgVZH26g230uZvGHT1CzHI_eySjmCmy', '1589958112', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:51.894Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('DwXhQ_xljVFaDVIrmNVMB9ZPOFJO5NP8', '1589958218', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.654Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('dzsafwHMa3vmgapH5E2t8SCFS4WJ-IRp', '1589958217', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.111Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('D_h0SGXBERNM_24rGAOU-Bjh5RQDIuNp', '1589958217', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.112Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('Eau1azMF4nGoPL1-NK0lU711Remm7DSZ', '1589958112', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:51.515Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('EBwip9F2MGkOI9GcM6o1bsAVJW_NVq_T', '1589957970', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:29.636Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('EBy3YSfFo6wjLeO-35_IBRfMSVnLp-_-', '1589958258', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:18.001Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('eBy7KmUQeuYG6KBZgpjARbPMn7dzv3wD', '1589958124', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:02:03.673Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('EcYgAgkZIRZpH9-iNc5BeYG0cyYOC613', '1589958112', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:51.661Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('EDHCRIiCoB7XuMreD3ks2dQrPIjBmzHU', '1589958056', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:00:56.426Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('EwvO5SHyGvTZd6u9CBadFAB049iVtyJ9', '1589958225', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.051Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('E_kyP15ldqSpgu41EmYv_4XBsn3be6vd', '1589958124', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:02:03.570Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":1,\"rank\":26,\"acc_session\":\"4e05df95af95f24626659124500b2b68\",\"game_id\":\"Polanco\"}'),
('FEMtUCF942GlEETXC9prCaPvmE_2jVUa', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:13.821Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('fKrq1FXTOATjntu_cC0DlHRdhjRGx4I1', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:14.247Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('fo5ac92_dEUvQsX6hCxMtpqBXv-NlzfK', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:14.270Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('fP7rZewl4M_wHWCa9sZ255EOAJpeGwJo', '1589958225', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.015Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('fqJE2XHQZCuPgDiNpQq6dJ0BFeXsqvVH', '1589958259', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.266Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('GkepDxGMlaNfncVFIPLJGJwUkmpM1piD', '1589958191', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:10.541Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('gPuO3WugN2qaZvhPCzj0WFRdYFs5_aix', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:14.269Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('gqtYIGRwRMeJT_7M6TaR43H_kX9jtsU8', '1589958185', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:04.851Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('GrbYv6_k96nn2vIhSSdmX5KCnS_bUMxF', '1589958124', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:02:03.680Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('GTKeASI2RszPxvzK5WVZ4dbbqbKVdJho', '1589958262', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:21.590Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('hcZ5B72FAj-3P9I31VbfSGS_XTiaoqmf', '1589958183', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:02.807Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('HfcyvOy-kG9DdOo8d6nl7Dmfu2eoT3gu', '1589958182', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:02.178Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('Hpv0-uoUOhNSviZopKtWy3T7xxQB1gsn', '1589958182', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:02.249Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('hTmbGVK8L3IHEwoV_weZg0p8Ec3ecAF3', '1589957991', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:50.592Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('hyY89KEDFtd1rTWQLTqf1id_rfMUBBtB', '1589957989', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:49.047Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":1,\"acc_session\":\"4e05df95af95f24626659124500b2b68\",\"game_id\":\"Polanco\"}'),
('I-WeWUwIKnIv7w5oBCZrtqI6pTQ1cnzy', '1589958111', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:50.974Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('i5e7BBxtSrFy3OH1HUqjOQlKhqWjlhQV', '1589958261', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:21.032Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('ieZhJodQlw2b1vEixdUXX-vzkw80uwxe', '1589958260', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.734Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('IIlKALIjV3K1XTBEMGGtFwmj4RbCpzt2', '1589957991', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:50.804Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('iMIMAGoTFnV4dE81C4EUbpbmKGmr01ED', '1589957969', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:29.300Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('iO8KB_-OFL-TvX8CKpNnlNTiuvsJr2L3', '1589958260', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.671Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('Iq9o5RTOHSsYaWBnw8vRQ1Z-YomAJWGX', '1589958226', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.659Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('ISH1fvmYc3IgwrTFTJ12i92CdAOtD98S', '1589958261', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:20.997Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('itfr_WN5HTCp_DnHd-OUX7d079KQSQT9', '1589957991', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:50.592Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('j-b76x86aGoahaSf2vHvrXNzRZ6Pa_JM', '1589957970', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:29.630Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('JdIKn0zUnCFmvThxvDiDnLaXfcWFDYLm', '1589958226', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.797Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('JEz2m7Cm4prMZFT8yXSR87jAAgFku2_s', '1589957970', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:29.804Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('jfwiLUgec01ehsdJigovFbfr8Rrf1CLm', '1589958125', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:02:05.172Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('jGeBzkN4EOE0kPl7MzrdM5MYrM2SL_ar', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:14.397Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('jGvg6TbRWeqDRCkH3crJpQmGMmggn9Kg', '1589958059', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:00:59.005Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('jGVwCOHGrRjj4nZdWs0EX7Rfn449kdji', '1589958041', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:00:40.879Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('jxVkHfrspuTZv--NzRyAMOiBUJZTtNsE', '1589957970', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:29.989Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('KgpUDKvT-pMji5Q54hd_3KkmA_2cGEIw', '1589958260', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.671Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('KGsNxZ3q4zU9_AEEWE4DryZ3AP4kfKsy', '1589958112', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:51.514Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('KH5i46Dyt0sV8UOoSlGrHaQZr6nch26g', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:13.820Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('KuX5jNAR7UM1oW4OAxbZSzP8x56EUtrr', '1589958260', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.669Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('LBTDPCkBMxiJraWuiy5exLGtxHlb8B1n', '1589957969', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:29.301Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('LDwot9_qAtPkbsSqX-lsiDfRZecOofTK', '1589958125', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:02:05.150Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('lPMFf5AwBh1_adpp0wuhQGBPEPXJZo5L', '1589958217', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.112Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('lq2Y0-N2wX9OhJcLTURu41yhQl9dEzPn', '1589958183', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:02.727Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('lynojETIbzstPsdSA4BbOOwq-gaV0OzH', '1589958262', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:21.634Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('m1dSAygp4OMsJa4d3c5jEYjpwDrS31Iw', '1589957991', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:50.580Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('MhgvEcG9EPxaLwUFDoEDfvGUbxpzTNle', '1589958218', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.537Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('MipZfkQwLmI8L0C1q3413CEpQhq1WhvK', '1589958218', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.562Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('n5VKdTjxkphj-lbZ-_Jn17m1_fkP_pB_', '1589958226', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.712Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('NaP3GsHT9Oel1KPXt8QT53KyKZq8fJUm', '1589958261', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:21.036Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('o8xDGMWn93XIPjhb6WR_1sczOGdVh6ep', '1589957972', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:32.132Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('oeJyT4X0yxB35T1s16yZS3gnJs34tMkp', '1589958192', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:12.086Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('oFZG3nBpd0-GfLQjsF473gzhYjhMXNV9', '1589958226', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.658Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('og0QbfJwAJLLtFxoqef6f8ecAqaNvxEl', '1589958217', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.090Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('OgyfiPhuthUq3EBPmVkvssPOs0ujOgKF', '1589958218', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.561Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('oL3e2HHwZYqBnqNGaBSc78KLR5QcU-sA', '1589958125', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:02:05.171Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('OuMx9VOJZUUl_6lC7Bfm6XGlDY5smC8e', '1589958111', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:50.916Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('PG8B4B91tHuEq8PoFvu1dAU5VTZeR05a', '1589958183', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:02.727Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('pW_XIMrGId0baPUnPYlrBJDEVqmd8a9c', '1589958226', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.660Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('PySCJ_OfoRl0DMLfTYuHTlUhOAzDTzs6', '1589958112', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:51.670Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('QLRZShaOOdLQYqmIMX5XaROacD1cH4U2', '1589958259', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.286Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('Qq6gQhaFxL29WU0iXcSVEzIXvfEFmeCQ', '1589958111', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:50.974Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('qq_InrNOgjAcL8XifWeOnTsjV257570-', '1589957970', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:29.907Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('Qt3vy-u63g9CszK-PwhPDIR9QwURCWbD', '1589958183', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:02.727Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('qVcCjNpBcDimjDyBZBz6qffQJOxSudBt', '1589958183', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:02.981Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('qWGLUGqUEvF69i-YXO7zChT9KIXY1xV_', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:13.819Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('rC79mDylJjz8N3IRtcWSA3Nbe2BNb_xI', '1589957972', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:32.291Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('RF-kssnewHR1DCL2Zj1ZjsvGlZkkbPDH', '1589958113', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:53.469Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('rmzKjEXVqwQ0F6Ysb7MOxL0Y9CTJuPZu', '1589958183', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:02.572Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('rXewrE4hxXMtEFcvyxg3uu4fxBmCYmrc', '1589958261', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:21.032Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('SjYxz4W1CvYYQROh1calxKSNavLmrEkl', '1589957970', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:30.024Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('SKPv2RBdZe6moJrr6MnZ_iv_QEDw1sfU', '1589958218', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.593Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('SoDoINb8Jzvy7OzsNXca50BqcRkldNkB', '1589958183', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:02.573Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('Sq38qqhsG2tGHRLhnIUPdAMk6F7OZ3eB', '1589958258', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:18.001Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('TIA37VN9T68yNsdpypy3aOzXqL5IsqtQ', '1589958218', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.628Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('TIaoC6Oo4sUL7ohqkAxiixqjdU9GhGoy', '1589957970', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:29.854Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('TqEhWDUdou7R_TAj9Z4sp_DUj_CYUquQ', '1589957970', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:29.632Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('TRt5clypsRFvVTvDlaWwwGZSN_g1drSz', '1589958125', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:02:05.304Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('TwreEi9x24QsmSyezpCR3LmwEcaglWmj', '1589958225', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.017Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('tzoWImv6sNXh2VOwOCnLndfvcXooksrG', '1589958262', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:21.583Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('u-YbVwGW7xQHoJsuYGvIBImVwEyuhtMP', '1589957991', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:50.610Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('ukJVTHJN8rW8Xx6kwcyjYUQpzcsHL4RF', '1589958226', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.759Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('upkieUH-abGf_c5ilbbvFQEx0sT4UIib', '1589957991', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:50.756Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('utausS4wz95xZ0GouHM4KCrsxUFk87Bl', '1589958191', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:10.548Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('UUpuvKT8rXnZD7ycT4_diBqsnR6nfC8H', '1589958225', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:44.987Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('uZJpYkyUnSCpvgObZAeMtCDZxE4X19-3', '1589958259', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.287Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('VhSuOam9ja00lVBzKscAD6XBEicLQBR-', '1589958260', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.780Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('VKfDbL23B-ncSvX2YNSMC0h5jGs1rvDp', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:14.361Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('vKngSDi4KGWiq5HO3km1R5lD4vBdrr9x', '1589958190', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:10.448Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"},\"account_id\":1,\"rank\":26,\"acc_session\":\"4e05df95af95f24626659124500b2b68\",\"game_id\":\"Polanco\"}'),
('VOVnN8Z36t45WUTI3VVNBGfezVB-hDU0', '1589958183', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:02.575Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('vupCSGCG0SU4akgA9lLrS3HEZTnqn7Zc', '1589958225', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.016Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('VwNvwsl6qLMRCp3nd5vMlYrUi9iNCTxa', '1589958194', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:14.268Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('W5VRwYJmtso28AooXJ84YZq6umcAYPJO', '1589958036', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:00:36.462Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('WhhzMhWT1xLeUoYx4v1GOHkD8Px_GewR', '1589958038', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:00:37.525Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('wksQIH5-DTayXrRtR6i4R3ZCnJPGo0KX', '1589958185', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:04.573Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('wNHfMr3AguZpalVvIsPqvtb3S68tQCYg', '1589958259', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.287Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('wrsuZ4EckJL2PnU5QmjG153eM1Lc5dwr', '1589958112', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:51.514Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('x1XfH8LHjz06_0sGXVPH4zpBV_a6BQlg', '1589958192', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:12.009Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('x77UEmo1x8rXAiIvMl8ltyRvLrKAI3sq', '1589958112', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:52.089Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('xcOVfmZxxZAYIGO49_wrZunL_T6mVlgb', '1589957970', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:29.634Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('XDRWtHEtvuK34xSifG1wBSz1F4PnGktw', '1589958192', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:11.995Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('XgX1B5mx1_vZ3l0mw3P8FiVjlPejdVqi', '1589957970', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:29.803Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('xktR8A782g3ssAZHfsinpKI3exYfygqf', '1589957969', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:29.264Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('YeWrRR_t4oomkmA12Ecu1ViT5vM9eg7-', '1589958226', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:45.659Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('YfurdkXj0tQruQHcCsjiBr2-uKsloIGQ', '1589958217', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.111Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('ytMsDAHgnL_6n85bO68Czs3hwNXS3YiO', '1589958218', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:37.561Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('ZA5yNNy4J07A9XxzsYgL1NeTPk1j0Qm8', '1589957991', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T06:59:50.533Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('zG-rHsr0FIX4SRccN4rI_SSrjjwEKmMi', '1589958261', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:21.036Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('zltY6jiBrB7VAKKFnUmw6tKFy_q0qX_Y', '1589958192', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:12.029Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('zNeWihKImsRR7zfamMypygL0ZVP7eo59', '1589958259', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:04:19.325Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('ZTAc0LQvVDwg9oFBtQyMDwqAcHkLpFwZ', '1589958183', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:02.747Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('_ocjvpDc7V-lJA1c20PA4yCgH8uR7KaK', '1589958112', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:01:51.784Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('_oVjJbJ7FfQ0dVoAzbOTd6c5ZyvrpSu3', '1589958183', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:02.874Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('_OxUesd4esYn5NDguHiNcqs9127beaBU', '1589958183', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:02.575Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('_tS5b2sOoUtQwxnR1cLAbIdOgFwPE964', '1589958058', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:00:57.580Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}'),
('_Y7iVfqwVmPWptzQH-zGJSdA9ykyQXIE', '1589958185', '{\"cookie\":{\"originalMaxAge\":600000,\"expires\":\"2020-05-20T07:03:04.686Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\"}}');

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

--
-- Volcado de datos para la tabla `guild`
--

INSERT INTO `guild` (`Id`, `Name`) VALUES
(1, 'GM');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guild_member`
--

CREATE TABLE `guild_member` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Job` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `guild_member`
--

INSERT INTO `guild_member` (`Id`, `UserId`, `Job`) VALUES
(1, 1, 1);

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
  `MyDateRegister` varchar(200) DEFAULT NULL,
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

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`Id`, `game_id`, `rank`, `ranking`, `gp`, `gold`, `cash`, `gender`, `unlock`, `photo_url`, `MyDateRegister`, `name_changes`, `power_user`, `plus10gp`, `mobile_fox`, `country`, `flowers`, `map_pack`, `megaphones`, `is_muted`, `win`, `loss`, `gm`, `IdAcc`, `bg_url`) VALUES
(1, 'Polanco', 26, NULL, 1000, 999999999, 999999999, 'm', 0, 'https://image.prntscr.com/image/GshFog4tSoCw4WF4eaYBOw.jpg', 'May 20 2020 01:49:48', 0, 0, 0, 0, NULL, 0, 0, 0, 0, 0, 0, 1, 1, NULL),
(2, 'Atenea', 0, NULL, 1000, 3000000, 50000, 'm', 0, 'https://image.prntscr.com/image/akT_bwuLT0_1Yl-EAS-vnA.png', 'May 20 2020 01:50:55', 0, 0, 0, 0, NULL, 0, 0, 0, 0, 0, 0, 0, 2, NULL);

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
-- Volcado de datos para la tabla `user_avatar_equiped`
--

INSERT INTO `user_avatar_equiped` (`Id`, `head`, `body`, `eyes`, `flag`, `background`, `foreground`) VALUES
(1, 1, 2, 0, 0, 0, 0),
(2, 1, 2, 0, 0, 0, 0);

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `guild`
--
ALTER TABLE `guild`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user_avatars`
--
ALTER TABLE `user_avatars`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

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
