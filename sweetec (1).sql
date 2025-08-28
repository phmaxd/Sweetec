-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 18/08/2025 às 12:23
-- Versão do servidor: 9.1.0
-- Versão do PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sweetec`
--
CREATE DATABASE IF NOT EXISTS `sweetec` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `sweetec`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `escolas`
--

DROP TABLE IF EXISTS `escolas`;
CREATE TABLE IF NOT EXISTS `escolas` (
  `Nome` varchar(100) NOT NULL,
  `Id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

DROP TABLE IF EXISTS `produtos`;
CREATE TABLE IF NOT EXISTS `produtos` (
  `Nome` varchar(100) NOT NULL,
  `Descricao` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Id` int NOT NULL AUTO_INCREMENT,
  `Imagem` varchar(50) NOT NULL,
  `preco` double NOT NULL,
  `Escola` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`Nome`, `Descricao`, `Id`, `Imagem`, `preco`, `Escola`) VALUES
('borracha de chocolate', 'gostosa', 12, 'imagens/68a31658b5c9a.torrent', 13, 'EE Profª Silvia Jorge Pollastrini'),
('Fabricio de chocolate', 'redondo', 13, 'imagens/68a3168756a5e.ico', -1, 'Maria Aparecida Soares Amêndola'),
('Santos de chocolate', 'Perdeu', 14, 'imagens/68a318b495b3e.ico', -6, 'Ana Cândida Ebling de Oliveira');

-- --------------------------------------------------------

--
-- Estrutura para tabela `userescola`
--

DROP TABLE IF EXISTS `userescola`;
CREATE TABLE IF NOT EXISTS `userescola` (
  `usuarios` int NOT NULL,
  `escolas` int NOT NULL,
  `Id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`),
  KEY `usuarios` (`usuarios`),
  KEY `escolas` (`escolas`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `userproduto`
--

DROP TABLE IF EXISTS `userproduto`;
CREATE TABLE IF NOT EXISTS `userproduto` (
  `usuarios` int NOT NULL,
  `produtos` int NOT NULL,
  `Id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`),
  KEY `usuarios` (`usuarios`),
  KEY `produtos` (`produtos`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `userproduto`
--

INSERT INTO `userproduto` (`usuarios`, `produtos`, `Id`) VALUES
(12, 14, 9),
(8, 13, 8),
(9, 12, 7);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `Usuarios` varchar(100) NOT NULL,
  `Senha` varchar(255) NOT NULL,
  `Escola` varchar(50) NOT NULL,
  `Id` int NOT NULL AUTO_INCREMENT,
  `Numero` varchar(15) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`Usuarios`, `Senha`, `Escola`, `Id`, `Numero`) VALUES
('Pedro', '$2y$10$xtxXbtLMNv7K9jElfOqIlun9LBvGbgXCVjTe.Bnyd0dy6t3jg63Uy', 'EE Profª Silvia Jorge Pollastrini', 9, '88888'),
('Isaac', '$2y$10$BH5Af7AQeeIIGrkaxJkBFe0poYpKYY3x9tKEWqDDvDp1ml8ub5uCq', 'Maria Aparecida Soares Amêndola', 8, '33333'),
('Fabricio', '$2y$10$hAIZX5YvQC..Cn8UhDtMK.mLmjnyswMKZVwZ0PxhyccxdCx.0.sJu', 'Maria Aparecida Soares Amêndola', 10, '551319480984747'),
('Andre', '$2y$10$m2sRa/ZiRZVITEhJKeFg0ObJfD09b3Net8Bu7DgwcjK7y10drV3eW', 'Ana Cândida Ebling de Oliveira', 11, '551312312312421'),
('Afonso', '$2y$10$DglSsVNZsGkvZmowBD06ReQgVF29D0WHVO10jBdirgi4ZCSQS5f0e', 'Ana Cândida Ebling de Oliveira', 12, '5513988386852');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
