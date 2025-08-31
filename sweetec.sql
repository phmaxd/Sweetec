-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 31/08/2025 às 14:14
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
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`Nome`, `Descricao`, `Id`, `Imagem`, `preco`, `Escola`) VALUES
('Cachorro', 'É um cachorro', 19, 'imagens/68b343a3b9dac.png', 9.99, 'EE Profª Silvia Jorge Pollastrini'),
('Cadeira Gamer', 'cadeira gamer pro', 20, 'imagens/68b37ae1edbea.png', 799, 'Etec de Itanhaém'),
('Isaac', 'é o isaac', 15, 'imagens/68a3392fd3ca3.jpg', 10, 'Maria Aparecida Soares Amêndola'),
('Cookies de monstro', 'Feito de muito de leite de monstro', 16, 'imagens/68ada93ed6ca1.jpg', 9, 'Maria Aparecida Soares Amêndola'),
('Marvel', 'Sim, estamos vendendo a marvel', 17, 'imagens/68adb4b2909df.jpg', 10, 'Maria Aparecida Soares Amêndola'),
('Loli', 'Estamos vendendo uma loli para uso pessoal', 18, 'imagens/68adc4a4aa061.jpg', 150.99, 'Maria Aparecida Soares Amêndola'),
('Cookie caseiro', 'Cookies caseiros feitos com muito amor, perfeitos para ocasiões especiais.', 23, 'imagens/68b44f4fc5804.png', 5, 'Etec de Itanhaém');

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
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `userproduto`
--

INSERT INTO `userproduto` (`usuarios`, `produtos`, `Id`) VALUES
(13, 23, 18),
(8, 15, 10),
(8, 16, 11),
(8, 17, 12),
(8, 18, 13),
(9, 19, 14),
(13, 20, 15);

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
('Pedro', '$2y$10$KGsOCPk.h0dm0Rdf3AQZ1.lxxBZP7AsaZEWLmxWrTmvC6WpRZI/YC', 'EE Profª Silvia Jorge Pollastrini', 9, '88888'),
('Isaac', '$2y$10$BH5Af7AQeeIIGrkaxJkBFe0poYpKYY3x9tKEWqDDvDp1ml8ub5uCq', 'Maria Aparecida Soares Amêndola', 8, '33333'),
('isaac2', '$2y$10$tWOy3PtHM7QvQa3p.x84jOQOmoNI5OpQJS/87IzejAv4L8vXK6zGe', 'Etec de Itanhaém', 13, '13 99161-7260');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
