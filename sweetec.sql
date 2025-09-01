-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 01/09/2025 às 02:51
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
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`Nome`, `Descricao`, `Id`, `Imagem`, `preco`, `Escola`) VALUES
('Bolo de cenoura', 'Bolo de cenoura com cobertura de chocolate.', 32, 'uploads/68b4a71609ac7.png', 8, 'EE Profª Silvia Jorge Pollastrini'),
('Morango do Amor', 'Morango do amor delicioso, feito com carinho e com muito amor, perfeito para ocasiões especiais.', 26, 'uploads/68b461a773e91.png', 4, 'Maria Aparecida Soares Amêndola'),
('Cookie caseiro', 'Cookies caseiros feitos com muito amor, perfeitos para ocasiões especiais.', 23, 'uploads/68b4930352f4c.png', 5, 'Etec de Itanhaém');

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
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `userproduto`
--

INSERT INTO `userproduto` (`usuarios`, `produtos`, `Id`) VALUES
(13, 23, 18),
(8, 26, 21),
(9, 32, 27);

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
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`Usuarios`, `Senha`, `Escola`, `Id`, `Numero`) VALUES
('Pedro', '$2y$10$KGsOCPk.h0dm0Rdf3AQZ1.lxxBZP7AsaZEWLmxWrTmvC6WpRZI/YC', 'EE Profª Silvia Jorge Pollastrini', 9, '13 99123-4567'),
('Isaac', '$2y$10$BH5Af7AQeeIIGrkaxJkBFe0poYpKYY3x9tKEWqDDvDp1ml8ub5uCq', 'Maria Aparecida Soares Amêndola', 8, '13 8002-0922'),
('isaac2', '$2y$10$tWOy3PtHM7QvQa3p.x84jOQOmoNI5OpQJS/87IzejAv4L8vXK6zGe', 'Maria Aparecida Soares Amêndola', 13, '13 99161-7260');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
