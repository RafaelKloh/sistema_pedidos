-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07-Dez-2023 às 22:46
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sistema_pedidos`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `carrinho`
--

CREATE TABLE `carrinho` (
  `id_carrinho` int(11) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `id_produto` int(11) DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `carrinho`
--

INSERT INTO `carrinho` (`id_carrinho`, `id_pedido`, `id_produto`, `quantidade`) VALUES
(99, 2, 1, 15),
(101, 2, 4, 7),
(103, 2, 3, 1),
(104, 2, 7, 7),
(105, 3, 1, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `forma_pagamento`
--

CREATE TABLE `forma_pagamento` (
  `id_forma_pagamento` int(11) NOT NULL,
  `descricao` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `forma_pagamento`
--

INSERT INTO `forma_pagamento` (`id_forma_pagamento`, `descricao`) VALUES
(1, 'pix');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_status` int(11) DEFAULT NULL,
  `id_forma_pagamento` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `id_usuario`, `id_status`, `id_forma_pagamento`) VALUES
(2, 1, 2, 1),
(3, 46, 1, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `id_produto` int(11) NOT NULL,
  `descricao` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`id_produto`, `descricao`, `preco`) VALUES
(1, 'hamburger', '15.50'),
(3, 'Macarrão', '5.00'),
(4, 'Arroz Rei Arthur', '7.00'),
(5, 'Feijão', '10.00'),
(7, 'Cuca da Cucas da Rosana', '25.00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `status`
--

CREATE TABLE `status` (
  `id_status` int(11) NOT NULL,
  `descricao` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `status`
--

INSERT INTO `status` (`id_status`, `descricao`) VALUES
(1, 'aberto'),
(2, 'em andamento'),
(3, 'concluido'),
(4, 'cancelado');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` int(11) NOT NULL,
  `descricao` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id_tipo_usuario`, `descricao`) VALUES
(1, 'cliente'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `senha` varchar(32) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `id_tipo_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nome`, `senha`, `email`, `id_tipo_usuario`) VALUES
(1, 'Rafael', '998747178', 'rafaelkloh04@gmail.com', 1),
(2, 'Felipe', '2', 'felipe@gmail.com', 2),
(6, 'Carlos', 'f5491d72610965dd0a287c1ab1025c0f', 'novoemail@gmail.com', 1),
(7, 'Carlos', '0b4e7a0e5fe84ad35fb5f95b9ceeac79', 'carlosprofessor@gmail.com', 1),
(12, 'Anna', 'ecf88cb3927303638ac55d734b6ab081', 'AnaMAria@braga.com', 2),
(13, 'Neymar', 'ee1fb89baf447b4870e5bbd6d0ec0255', 'neymar@junior.com', 1),
(15, 'Lucas', '59275a44e12a464e047772d5b07789d0', 'emo@roqueiro.com', 1),
(34, 'Joao', '81ca20d54baac8f901583ec8a65941ea', 'joao@gmail.com', 1),
(35, 'Joao', '81ca20d54baac8f901583ec8a65941ea', 'joao@gmail.com', 1),
(36, 'Joao', '81ca20d54baac8f901583ec8a65941ea', 'joao@gmail.com', 1),
(37, 'Sofia', 'e10adc3949ba59abbe56e057f20f883e', 'soufia@gmail.com', 1),
(38, 'Rafael', '16643abbf8a2eaff34fc266a052093f8', 'rafaelkloh04@gmail.com', 1),
(39, 'Pedro', 'e10adc3949ba59abbe56e057f20f883e', 'pedro@gmail.com', 2),
(41, 'Vinicios', '1ff99c43dd95fbc795c29dbd15dbc6f0', 'vinicius13@gmail.com', 2),
(45, 'Sofia', '16643abbf8a2eaff34fc266a052093f8', 'sofia@gmail.com', 1),
(46, 'diego', '16643abbf8a2eaff34fc266a052093f8', 'diego@gmail.com', 1),
(47, 'teste', 'd6a705d3fc542ded7c761528e54b3048', 'teste@gmail.com', 1),
(48, 'admin', '16643abbf8a2eaff34fc266a052093f8', 'admin@gmail.com', 2);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `carrinho`
--
ALTER TABLE `carrinho`
  ADD PRIMARY KEY (`id_carrinho`);

--
-- Índices para tabela `forma_pagamento`
--
ALTER TABLE `forma_pagamento`
  ADD PRIMARY KEY (`id_forma_pagamento`);

--
-- Índices para tabela `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Índices para tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id_produto`);

--
-- Índices para tabela `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id_status`);

--
-- Índices para tabela `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id_tipo_usuario`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `carrinho`
--
ALTER TABLE `carrinho`
  MODIFY `id_carrinho` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT de tabela `forma_pagamento`
--
ALTER TABLE `forma_pagamento`
  MODIFY `id_forma_pagamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `id_produto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `status`
--
ALTER TABLE `status`
  MODIFY `id_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id_tipo_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
