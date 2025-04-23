-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 23. 15:24
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `searchrecipes`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `con_recipe_cuisine`
--

CREATE TABLE `con_recipe_cuisine` (
  `recipe_id` int(11) NOT NULL,
  `cuisine_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `con_recipe_cuisine`
--

INSERT INTO `con_recipe_cuisine` (`recipe_id`, `cuisine_id`) VALUES
(2, 14),
(16, 8),
(18, 14),
(20, 14),
(21, 11),
(22, 14),
(23, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `con_recipe_diet_category`
--

CREATE TABLE `con_recipe_diet_category` (
  `recipe_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `con_recipe_diet_category`
--

INSERT INTO `con_recipe_diet_category` (`recipe_id`, `category_id`) VALUES
(2, 5),
(17, 3),
(18, 7),
(20, 1),
(21, 2),
(21, 7),
(23, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `con_recipe_dish_type`
--

CREATE TABLE `con_recipe_dish_type` (
  `recipe_id` int(11) NOT NULL,
  `dishtype_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `con_recipe_dish_type`
--

INSERT INTO `con_recipe_dish_type` (`recipe_id`, `dishtype_id`) VALUES
(2, 4),
(16, 7),
(17, 3),
(18, 4),
(18, 7),
(20, 7),
(21, 4),
(21, 7),
(22, 2),
(22, 3),
(23, 4),
(23, 7);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `con_recipe_ingredients`
--

CREATE TABLE `con_recipe_ingredients` (
  `recipe_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `ingredient_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `con_recipe_ingredients`
--

INSERT INTO `con_recipe_ingredients` (`recipe_id`, `ingredient_id`, `ingredient_quantity`) VALUES
(2, 1, 1000),
(2, 2, 2),
(5, 417, 290),
(5, 740, 150),
(5, 770, 4),
(5, 1198, 4),
(5, 1258, 2),
(5, 1371, 65),
(6, 45, 2),
(6, 121, 300),
(6, 290, 6),
(6, 548, 2),
(6, 570, 5),
(6, 710, 6),
(6, 897, 50),
(6, 1000, 100),
(6, 1015, 300),
(6, 1079, 2),
(6, 1087, 1),
(7, 45, 4),
(7, 292, 2),
(7, 295, 2),
(7, 296, 100),
(7, 310, 100),
(7, 321, 4),
(7, 564, 100),
(7, 671, 400),
(7, 1071, 200),
(7, 1079, 4),
(7, 1370, 50),
(8, 575, 1000),
(8, 1261, 1000),
(9, 45, 5),
(9, 292, 3),
(9, 572, 8),
(9, 747, 5),
(9, 780, 60),
(9, 897, 5),
(9, 954, 8),
(9, 1079, 5),
(9, 1258, 3),
(9, 1370, 100),
(9, 1371, 150),
(10, 295, 50),
(10, 324, 2),
(10, 330, 200),
(10, 385, 150),
(10, 692, 50),
(10, 1079, 2),
(10, 1261, 200),
(10, 1277, 10),
(10, 1389, 100),
(11, 52, 2),
(11, 292, 2),
(11, 473, 90),
(11, 758, 100),
(11, 861, 15),
(11, 1002, 125),
(11, 1014, 2),
(11, 1071, 300),
(11, 1079, 5),
(11, 1370, 100),
(11, 1374, 1000),
(11, 1387, 400),
(11, 1418, 50),
(11, 1449, 2),
(12, 44, 50),
(12, 49, 100),
(12, 144, 2),
(12, 190, 1000),
(12, 296, 100),
(12, 330, 20),
(12, 333, 2),
(12, 557, 50),
(12, 861, 10),
(12, 926, 10),
(12, 1072, 500),
(12, 1079, 2),
(12, 1192, 2),
(12, 1270, 10),
(12, 1370, 50),
(12, 1418, 25),
(13, 137, 10),
(13, 417, 185),
(13, 1079, 2),
(13, 1198, 1),
(13, 1374, 1185),
(14, 2, 1),
(16, 18, 1),
(17, 11, 500),
(17, 45, 5),
(17, 705, 5),
(17, 769, 120),
(17, 1079, 5),
(17, 1258, 2),
(18, 45, 1),
(18, 292, 2),
(18, 295, 5),
(18, 926, 10),
(18, 1079, 3),
(18, 1082, 5),
(18, 1261, 300),
(18, 1416, 500),
(19, 25, 1),
(20, 1088, 1),
(21, 44, 1000),
(21, 45, 1),
(21, 118, 700),
(21, 186, 200),
(21, 297, 1),
(21, 330, 200),
(21, 897, 100),
(21, 930, 500),
(21, 1002, 50),
(21, 1073, 300),
(21, 1079, 1),
(21, 1192, 1),
(21, 1428, 200),
(22, 141, 100),
(22, 175, 1000),
(22, 296, 400),
(22, 557, 200),
(22, 1071, 400),
(22, 1370, 200),
(22, 1418, 200),
(23, 118, 500),
(23, 143, 50),
(23, 190, 200),
(23, 292, 1),
(23, 861, 100),
(23, 927, 50),
(23, 1015, 200),
(23, 1079, 2),
(23, 1370, 200),
(23, 1371, 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `con_shopping_ingredients`
--

CREATE TABLE `con_shopping_ingredients` (
  `shopping_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `ingredient_quantity` int(11) NOT NULL,
  `bought` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `con_shopping_ingredients`
--

INSERT INTO `con_shopping_ingredients` (`shopping_id`, `ingredient_id`, `ingredient_quantity`, `bought`) VALUES
(13, 45, 1, 1),
(13, 121, 200, 0),
(13, 290, 4, 0),
(13, 548, 1, 0),
(13, 570, 3, 1),
(13, 710, 4, 0),
(13, 897, 33, 0),
(13, 1000, 67, 0),
(13, 1015, 200, 0),
(13, 1079, 1, 0),
(13, 1087, 1, 0),
(22, 417, 290, 0),
(22, 740, 150, 0),
(22, 770, 4, 0),
(22, 1198, 4, 0),
(22, 1258, 2, 0),
(22, 1371, 65, 0),
(23, 417, 290, 0),
(23, 740, 150, 0),
(23, 770, 4, 0),
(23, 1198, 4, 0),
(23, 1371, 65, 0),
(26, 417, 290, 0),
(26, 740, 150, 0),
(26, 770, 4, 0),
(26, 1198, 4, 0),
(26, 1258, 2, 1),
(26, 1371, 65, 0),
(27, 417, 290, 0),
(27, 740, 150, 0),
(27, 770, 4, 1),
(27, 1198, 4, 1),
(27, 1258, 2, 0),
(27, 1371, 65, 0),
(28, 45, 4, 1),
(28, 292, 2, 1),
(28, 295, 2, 0),
(28, 296, 100, 1),
(28, 310, 100, 0),
(28, 321, 4, 1),
(28, 564, 100, 0),
(28, 671, 400, 0),
(28, 1071, 200, 0),
(28, 1079, 4, 1),
(28, 1370, 50, 0),
(30, 417, 290, 0),
(30, 740, 150, 0),
(30, 770, 4, 0),
(30, 1198, 4, 0),
(30, 1258, 2, 1),
(30, 1371, 65, 0),
(31, 52, 2, 0),
(31, 292, 2, 1),
(31, 473, 90, 1),
(31, 758, 100, 0),
(31, 861, 15, 1),
(31, 1002, 125, 1),
(31, 1014, 2, 0),
(31, 1071, 300, 0),
(31, 1079, 5, 0),
(31, 1370, 100, 0),
(31, 1374, 1000, 0),
(31, 1387, 400, 0),
(31, 1418, 50, 0),
(31, 1449, 2, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `con_user_pantry`
--

CREATE TABLE `con_user_pantry` (
  `user_id` int(11) NOT NULL,
  `pantry_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `con_user_pantry`
--

INSERT INTO `con_user_pantry` (`user_id`, `pantry_id`) VALUES
(1, 1),
(6, 6),
(7, 7),
(8, 8),
(10, 10),
(103, 103),
(335, 335),
(336, 336);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `con_user_shopping`
--

CREATE TABLE `con_user_shopping` (
  `user_id` int(11) NOT NULL,
  `shopping_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `con_user_shopping`
--

INSERT INTO `con_user_shopping` (`user_id`, `shopping_id`) VALUES
(1, 26),
(6, 13),
(6, 30),
(6, 31),
(103, 22),
(103, 23),
(336, 27),
(336, 28);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `diet_category`
--

CREATE TABLE `diet_category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `diet_category`
--

INSERT INTO `diet_category` (`category_id`, `category_name`) VALUES
(1, 'Vegán'),
(2, 'Vegetariánus'),
(3, 'Kóser'),
(4, 'Halal'),
(5, 'Laktózmentes'),
(6, 'Gluténmentes'),
(7, 'Diabetikus');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `dish_cuisine`
--

CREATE TABLE `dish_cuisine` (
  `cuisine_id` int(11) NOT NULL,
  `cuisine_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `dish_cuisine`
--

INSERT INTO `dish_cuisine` (`cuisine_id`, `cuisine_name`) VALUES
(1, 'olasz'),
(2, 'kínai'),
(3, 'japán'),
(4, 'francia'),
(5, 'mexikói'),
(6, 'indiai'),
(7, 'thai'),
(8, 'spanyol'),
(9, 'mediterrán'),
(10, 'amerikai'),
(11, 'görög'),
(12, 'orosz'),
(13, 'lengyel'),
(14, 'magyar');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `dish_type`
--

CREATE TABLE `dish_type` (
  `dishtype_id` int(11) NOT NULL,
  `dishtype_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `dish_type`
--

INSERT INTO `dish_type` (`dishtype_id`, `dishtype_name`) VALUES
(2, 'Előétel'),
(3, 'Leves'),
(4, 'Főétel'),
(5, 'Desszert'),
(6, 'Saláta'),
(7, 'Egyéb');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ingredients`
--

CREATE TABLE `ingredients` (
  `ingredient_id` int(11) NOT NULL,
  `ingredient_name` varchar(255) NOT NULL,
  `ingredient_measurement` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ingredients`
--

INSERT INTO `ingredients` (`ingredient_id`, `ingredient_name`, `ingredient_measurement`) VALUES
(1, 'Alma', 'g'),
(2, 'Ananász', 'g'),
(3, 'Avokádó', 'g'),
(6, 'Aszalt gyümölcsök', 'g'),
(7, 'Agar agar', 'g'),
(8, 'Articsóka', 'g'),
(9, 'Ajvár', 'g'),
(10, 'Amur', 'g'),
(11, 'Alaplé', 'ml'),
(12, 'Amarettó', 'ml'),
(13, 'Almaecet', 'ml'),
(14, 'Aszalt szilva', 'g'),
(15, 'Aszalt sárgabarack', 'g'),
(17, 'Almalé', 'ml'),
(18, 'Ananászkonzerv', 'g'),
(19, 'Aludttej', 'ml'),
(20, 'Akácméz', 'g'),
(21, 'Aszkorbinsav', 'g'),
(22, 'Ananászlé', 'ml'),
(23, 'Almapaprika', 'g'),
(24, 'Almapüré', 'g'),
(25, 'Afrikai harcsa', 'g'),
(26, 'Angolszalonna', 'g'),
(27, 'Arab hétfűszerkeverék', 'g'),
(28, 'Akácvirág', 'g'),
(29, 'Almakompót', 'g'),
(30, 'Agávé szirup', 'ml'),
(31, 'Aszalt áfonya', 'g'),
(32, 'Aquafaba', 'g'),
(33, 'Áfonya', 'g'),
(34, 'Ázsiai tészta', 'g'),
(35, 'Ánizs', 'g'),
(36, 'Áfonyadzsem', 'g'),
(37, 'Ásványvíz', 'g'),
(38, 'Árpapehely', 'g'),
(39, 'Ánizsolaj', 'ml'),
(40, 'Árpaliszt', 'g'),
(41, 'Árvácska', 'g'),
(42, 'Áfonyalevél', 'g'),
(43, 'Bazsalikom', 'g'),
(44, 'Burgonya', 'g'),
(45, 'Bors', 'g'),
(46, 'Banán', 'g'),
(47, 'Borjúhús', 'g'),
(48, 'Bárányhús', 'g'),
(49, 'Bacon', 'g'),
(50, 'Balzsamecet', 'g'),
(51, 'Brokkoli', 'g'),
(52, 'Babérlevél', 'db'),
(53, 'Bodzavirág', 'g'),
(54, 'Borsikafű', 'g'),
(55, 'Borkősav', 'g'),
(56, 'Búzadara', 'g'),
(57, 'Bokorbab', 'g'),
(58, 'Borókabogyó', 'g'),
(59, 'Bambuszrügy', 'g'),
(60, 'Birsalma', 'g'),
(61, 'Burgonyapehely', 'g'),
(62, 'Busa', 'g'),
(63, 'Barna cukor', 'g'),
(64, 'Brazil dió', 'g'),
(65, 'Bulgur', 'g'),
(66, 'Búzakorpa', 'g'),
(67, 'Babapiskóta', 'g'),
(68, 'Borkén', 'g'),
(69, 'Barna sör', 'ml'),
(70, 'Barackbefőtt', 'g'),
(71, 'Befőzőcukor', 'g'),
(72, 'Báránygerinc', 'g'),
(73, 'Borjúcomb', 'g'),
(74, 'Borjúlábszár', 'g'),
(75, 'Borjúkaraj', 'g'),
(76, 'Bébirépa', 'g'),
(77, 'Borsmentalevél', 'g'),
(78, 'Bagett', 'db'),
(79, 'Basmati rizs', 'g'),
(80, 'Bébikukorica', 'g'),
(81, 'Barackkonzerv', 'g'),
(82, 'Barnarizs', 'g'),
(83, 'Burgonyapüré', 'g'),
(84, 'Bolognai alap', 'g'),
(85, 'Búzacsíra', 'g'),
(86, 'Bárányborda', 'g'),
(87, 'Báránykaraj', 'g'),
(88, 'Barbecue szósz', 'ml'),
(89, 'Barna rum', 'ml'),
(90, 'Bolognai szósz', 'ml'),
(91, 'Brandy', 'ml'),
(92, 'Burgonyakeményítő', 'g'),
(93, 'Bodzabogyó', 'g'),
(95, 'Birsalmasajt', 'g'),
(96, 'Borjúmáj', 'g'),
(97, 'Befőtt tartósító', 'g'),
(98, 'Barna mártás', 'ml'),
(99, 'Borjúbríz', 'g'),
(100, 'Babpüré', 'g'),
(101, 'Baileys', 'ml'),
(102, 'Biryani masala', 'g'),
(103, 'Brie sajt', 'g'),
(104, 'Búzafű', 'g'),
(105, 'Baobab por', 'g'),
(106, 'Bagel', 'db'),
(108, 'Báránycsülök', 'g'),
(109, 'Barnarizsliszt', 'g'),
(110, 'Barna mártás por', 'g'),
(111, 'Borslevél', 'g'),
(112, 'Bébispenót', 'g'),
(113, 'Burgonyachips', 'g'),
(114, 'Burrata', 'g'),
(117, 'Citrom', 'g'),
(118, 'Cukkini', 'g'),
(119, 'Cukor', 'g'),
(120, 'Crème fraîche', 'g'),
(121, 'Cékla', 'g'),
(122, 'Citromfű', 'g'),
(123, 'Curry por', 'g'),
(124, 'Cukorborsó', 'g'),
(125, 'Chili', 'g'),
(126, 'Cointreau', 'ml'),
(127, 'Cayenne paprika', 'g'),
(128, 'Curry levél', 'g'),
(129, 'Cikória', 'g'),
(130, 'Chorizo', 'g'),
(131, 'Cannelloni', 'g'),
(132, 'Citrombors', 'g'),
(133, 'Curry paszta', 'g'),
(134, 'Calvados', 'ml'),
(135, 'Camembert sajt', 'g'),
(136, 'Chayote', 'g'),
(137, 'Citromlé', 'ml'),
(138, 'Cukrozatlan kakaópor', 'g'),
(139, 'Citromhéj', 'g'),
(140, 'Chiliszósz', 'ml'),
(141, 'Cérnametélt', 'g'),
(142, 'Citromlekvár', 'g'),
(143, 'Cheddar sajt', 'g'),
(144, 'Chilipehely', 'g'),
(145, 'Cottage cheese', 'g'),
(146, 'Citrom aroma', 'g'),
(147, 'Chiliolaj', 'ml'),
(148, 'Cukorfondant', 'g'),
(149, 'Chilipaszta', 'g'),
(150, 'Curacao szirup', 'ml'),
(151, 'Cukormentes csokoládé', 'g'),
(152, 'Campari', 'ml'),
(153, 'Cukormáz', 'ml'),
(154, 'Cukormentes dzsem', 'g'),
(155, 'Cukormentes lekvár', 'g'),
(156, 'Citromsav', 'g'),
(158, 'Cukorgyöngy', 'g'),
(159, 'Citrompótló', 'g'),
(160, 'Céklalé', 'ml'),
(161, 'Cukkinivirág', 'db'),
(162, 'Chiamag', 'g'),
(163, 'Cider', 'ml'),
(164, 'Cappuccino por', 'g'),
(165, 'Cukormentes befőzőcukor', 'g'),
(166, 'Cukormentes fagylalt', 'g'),
(167, 'Chutney', 'g'),
(168, 'Cukorszirup', 'ml'),
(169, 'Chilis kukorica konzerv', 'g'),
(170, 'Cigánymeggy', 'g'),
(171, 'Carbonara alap', 'g'),
(172, 'Céklapor', 'g'),
(174, 'Csokoládé', 'g'),
(175, 'Csirke', 'g'),
(176, 'Csicseriborsó', 'g'),
(177, 'Csalán', 'g'),
(178, 'Cseresznye', 'g'),
(179, 'Csemegekukorica', 'g'),
(180, 'Csirkemáj', 'g'),
(181, 'Csuka', 'g'),
(182, 'Csírák', 'g'),
(183, 'Csillaggyümölcs', 'g'),
(184, 'Csipkebogyó', 'g'),
(185, 'Csicsóka', 'g'),
(186, 'Csiperkegomba', 'g'),
(187, 'Csemegeuborka', 'g'),
(188, 'Csillagánizs', 'db'),
(189, 'Csípős fűszerpaprika', 'g'),
(190, 'Csirke alaplé', 'g'),
(191, 'Csípős kolbász', 'g'),
(192, 'Csirkemell (csontos)', 'g'),
(193, 'Csirkecomb', 'g'),
(194, 'Csirkeszárny', 'g'),
(195, 'Csirke alsócomb', 'g'),
(196, 'Csirkemellsonka', 'g'),
(197, 'Csirke felsőcomb', 'g'),
(198, 'Csirkenyak', 'g'),
(199, 'Csirkeszív', 'g'),
(200, 'Csokoládés pudingpor', 'g'),
(201, 'Csirke fűszersó', 'g'),
(202, 'Csirkefarhát', 'g'),
(203, 'Csontos sertéskaraj', 'g'),
(204, 'Csirkezúza', 'g'),
(205, 'Csuszatészta', 'g'),
(206, 'Csipkebogyó lekvár', 'g'),
(207, 'Csokoládé aroma', 'g'),
(208, 'Cseresznyedzsem', 'g'),
(209, 'Csicseriborsóliszt', 'g'),
(210, 'Csigatészta', 'g'),
(211, 'Cseresznyelekvár', 'g'),
(212, 'Cseresznyebefőtt', 'g'),
(213, 'Cseresznyepaprika', 'g'),
(214, 'Cseresznyepaprika krém', 'g'),
(215, 'Csokoládédara', 'g'),
(216, 'Csokoládéforgács', 'g'),
(217, 'Csokoládés puding', 'g'),
(218, 'Csokiszósz', 'ml'),
(219, 'Csontlé', 'ml'),
(220, 'Csípős paprikakrém', 'g'),
(221, 'Csirkemellfilé', 'g'),
(222, 'Csöves kukorica', 'g'),
(223, 'Csokoládé fagylalt', 'g'),
(224, 'Csirkeláb', 'g'),
(225, 'Császárkörte aroma', 'g'),
(226, 'Császárszalonna', 'g'),
(227, 'Csirkeaprólék', 'g'),
(229, 'Csicseriborsó (konzerv)', 'g'),
(230, 'Csirkebőr', 'g'),
(231, 'Dió', 'g'),
(232, 'Dashi', 'g'),
(233, 'Datolya', 'g'),
(234, 'Dupla tejszín', 'ml'),
(235, 'Darált marhahús', 'g'),
(236, 'Darált pulykahús', 'g'),
(237, 'Datolyaszilva', 'g'),
(238, 'Dijoni mustár', 'g'),
(239, 'Darált sertéshús', 'g'),
(240, 'Disznózsír', 'g'),
(241, 'Dióolaj', 'ml'),
(242, 'Debreceni kolbász', 'g'),
(243, 'Diótej', 'ml'),
(244, 'Dekorgyöngy', 'g'),
(245, 'Diabetikus liszt', 'g'),
(246, 'Diákcsemege', 'g'),
(247, 'Digestive keksz', 'g'),
(248, 'Desszertbor', 'g'),
(249, 'Durumliszt', 'g'),
(250, 'Disznósajt', 'g'),
(251, 'Datolyacukor', 'g'),
(253, 'Dzsemfix', 'g'),
(254, 'Eper', 'g'),
(255, 'Ecet', 'ml'),
(256, 'Egres', 'g'),
(257, 'Erdei gyümölcs mix', 'g'),
(258, 'Epres pudingpor', 'g'),
(259, 'Edami sajt', 'g'),
(260, 'Ementáli sajt', 'g'),
(261, 'Ecetes gyöngyhagyma', 'g'),
(262, 'Ecetes cékla', 'g'),
(263, 'Erdei gyümölcslekvár', 'g'),
(264, 'Eperlevél tészta', 'g'),
(265, 'Erdélyi szalonna', 'g'),
(266, 'Ecetes torma', 'g'),
(267, 'Eperdzsem', 'g'),
(268, 'Eperkonzerv', 'g'),
(269, 'Ezersziget öntet', 'ml'),
(270, 'Eperlé', 'ml'),
(271, 'Eperlekvár', 'g'),
(272, 'Eperszörp', 'ml'),
(273, 'Epres puding', 'g'),
(274, 'Erythritol', 'g'),
(275, 'Ecetes almapaprika', 'g'),
(276, 'Édesburgonya', 'g'),
(277, 'Édeskömény', 'g'),
(278, 'Édesköménymag', 'g'),
(279, 'Élesztő', 'g'),
(280, 'Étkezési keményítő', 'g'),
(281, 'Ételízesítő', 'g'),
(282, 'Ételfesték', 'ml'),
(283, 'Éticsiga', 'db'),
(284, 'Édesítőszer', 'g'),
(285, 'Édes fehérbor', 'ml'),
(286, 'Édes vörösbor', 'ml'),
(287, 'Édes rosé', 'ml'),
(288, 'Étcsokoládé', 'g'),
(289, 'Édes-savanyú mártás', 'ml'),
(290, 'Élesztőpehely', 'g'),
(291, 'Édesgyökér', 'g'),
(292, 'Fokhagyma', 'gerezd'),
(293, 'Földimogyoró', 'g'),
(294, 'Fejessaláta', 'g'),
(295, 'Finomliszt', 'g'),
(296, 'Fehérrépa', 'g'),
(297, 'Fahéj', 'db'),
(298, 'Fenyőmag', 'g'),
(299, 'Fűszerpaprika', 'g'),
(300, 'Fekete burgonya', 'g'),
(301, 'Fehérborecet', 'ml'),
(302, 'Feta sajt', 'g'),
(303, 'Fehér spárga', 'g'),
(304, 'Fejtett bab', 'g'),
(305, 'Füge', 'g'),
(306, 'Feketegyökér', 'g'),
(307, 'Fekete retek', 'g'),
(308, 'Feketekömény', 'g'),
(309, 'Feketeribizli', 'g'),
(310, 'Füstölt szalonna', 'g'),
(311, 'Fehérbor', 'ml'),
(312, 'Fodros kel', 'g'),
(313, 'Felesborsó', 'g'),
(314, 'Fenyérfű', 'g'),
(315, 'Fürjtojás', 'db'),
(316, 'Fehér hagyma', 'g'),
(317, 'Fekete üröm', 'g'),
(318, 'Füstölt hal', 'g'),
(319, 'Felvágott', 'g'),
(320, 'Fűszersó', 'g'),
(321, 'Füstölt pirospaprika', 'g'),
(322, 'Fehér csokoládé', 'g'),
(323, 'Fromage frais', 'g'),
(324, 'Fehér bors', 'g'),
(325, 'Feketekávé', 'ml'),
(326, 'Feketekagyló', 'g'),
(327, 'Fehérbab', 'g'),
(328, 'Fekete olajbogyó', 'g'),
(329, 'Friss élesztő', 'g'),
(330, 'Főzőtejszín', 'ml'),
(331, 'Farfalle', 'g'),
(332, 'Fahéjrúd', 'db'),
(333, 'Fekete bors', 'g'),
(334, 'Finomítatlan nádcukor', 'g'),
(335, 'Főtt tojás', 'db'),
(336, 'Fehér balzsamecet', 'ml'),
(337, 'Fehérpecsenye', 'g'),
(338, 'Főzőkolbász', 'g'),
(339, 'Fokhagymakrém', 'g'),
(340, 'Földimogyoró olaj', 'ml'),
(341, 'Feketeerdő sonka', 'g'),
(342, 'Fajita fűszerkeverék', 'g'),
(343, 'Fokhagyma szósz', 'ml'),
(344, 'Feketeribizli szörp', 'ml'),
(345, 'Fusilli tészta', 'g'),
(346, 'Füstölt sajt', 'g'),
(347, 'Fagylaltpor', 'g'),
(348, 'Fehér mustármag', 'g'),
(349, 'Fasírt fűszerkeverék', 'g'),
(350, 'Fehér tortabevonó', 'g'),
(351, 'Félédes vörösbor', 'ml'),
(352, 'Fekete tea', 'ml'),
(353, 'Félédes rosé', 'ml'),
(354, 'Félszáraz vörösbor', 'ml'),
(355, 'Félszáraz rosé', 'ml'),
(356, 'Fehér rum', 'ml'),
(357, 'Fehér tortadara', 'g'),
(358, 'Fehérjepor', 'g'),
(359, 'Fejtett lóbab', 'g'),
(360, 'Fekete áfonya', 'g'),
(361, 'Fekete kardamom', 'db'),
(362, 'Feketeribizli lekvár', 'g'),
(363, 'Félszáraz fehérbor', 'ml'),
(364, 'Flekken fűszerkeverék', 'g'),
(365, 'Frankfurti virsli', 'g'),
(366, 'Füstölt virsli', 'g'),
(367, 'Fokhagymapor', 'g'),
(368, 'Folyékony édesítőszer', 'ml'),
(369, 'Forrócsoki por', 'g'),
(370, 'Foszfátmentes sütőpor', 'g'),
(371, 'Főzőhagyma', 'g'),
(372, 'Franciadrazsé', 'g'),
(373, 'Franciasaláta alap', 'g'),
(374, 'Fügelekvár', 'g'),
(375, 'Fügemustár', 'g'),
(376, 'Füstölthús kocka', 'g'),
(377, 'Fűszervaj', 'g'),
(378, 'Folyami rák', 'g'),
(379, 'Fogas', 'g'),
(380, 'Fácánhús', 'g'),
(381, 'Fokhagymabors', 'g'),
(382, 'Fafülgomba', 'g'),
(383, 'Fagomba', 'g'),
(385, 'Főtt sonka', 'g'),
(386, 'füstölt-főtt tarja', 'g'),
(387, 'Feketebabszósz', 'ml'),
(388, 'Fenyőcsúcs', 'g'),
(389, 'Füstölt lapocka', 'g'),
(390, 'Füstölt tarja', 'g'),
(391, 'Füstölt oldalas', 'g'),
(392, 'Füstölt sertéscsülök', 'g'),
(393, 'Füstölt lazac', 'g'),
(394, 'Füstölt libamell', 'g'),
(395, 'Fürj', 'g'),
(396, 'Főzőbanán', 'g'),
(397, 'Friss tészta', 'g'),
(398, 'Fánk', 'db'),
(399, 'Fűszerpaprikamag-olaj', 'ml'),
(400, 'Fekete berkenye', 'g'),
(401, 'Feketebab', 'g'),
(402, 'Fekete fokhagyma', 'gerezd'),
(403, 'Fűszerkeverék', 'g'),
(404, 'Gomba', 'g'),
(405, 'Grépfrút', 'g'),
(406, 'Gránátalma', 'g'),
(407, 'Gesztenye', 'g'),
(408, 'Gruyére sajt', 'g'),
(409, 'Garnéla', 'g'),
(410, 'Garam masala', 'g'),
(411, 'Görögdinnye', 'g'),
(412, 'Gnocchi', 'g'),
(413, 'Gomolya sajt', 'g'),
(414, 'Graham-liszt', 'g'),
(415, 'Ghee', 'ml'),
(416, 'Gersli', 'g'),
(417, 'Gluténmentes lisztkeverék', 'g'),
(418, 'Grana Padano', 'g'),
(419, 'Görög joghurt', 'g'),
(420, 'Gesztenyemassza', 'g'),
(421, 'Gépsonka', 'g'),
(422, 'Gorgonzola', 'g'),
(423, 'Gomolyatúró', 'g'),
(424, 'Görög fűszerkeverék', 'g'),
(425, 'Görögszéna', 'g'),
(426, 'Grand Marnier', 'ml'),
(427, 'Galambmáj', 'g'),
(428, 'Gránátalma szirup', 'ml'),
(429, 'Görög mazsola', 'g'),
(430, 'Görögsaláta fűszerkeverék', 'g'),
(431, 'Gumicukor', 'g'),
(432, 'Galangal', 'g'),
(433, 'Galagonya', 'g'),
(434, 'Gluténmentes gríz', 'g'),
(435, 'GM babapiskóta', 'g'),
(436, 'Gluténmentes sütőpor', 'g'),
(437, 'Galambgomba', 'g'),
(438, 'Galamb', 'g'),
(439, 'Gesztenyeliszt', 'g'),
(440, 'Gin', 'ml'),
(441, 'Gulyáskrém', 'g'),
(442, 'Golden szirup', 'ml'),
(443, 'Gombakonzerv', 'g'),
(444, 'Grépfrútlé', 'ml'),
(445, 'Glutén', 'g'),
(446, 'Gesztenyekrém', 'g'),
(447, 'Goji bogyó', 'g'),
(450, 'Gluténmentes tészta', 'g'),
(451, 'Gyömbér', 'g'),
(452, 'Gyümölcscukor', 'g'),
(453, 'Gyros fűszerkeverék', 'g'),
(454, 'Gyöngyhagyma', 'g'),
(455, 'Gyömbérpor', 'g'),
(456, 'Gyors rizs', 'g'),
(457, 'Gyulai kolbász', 'g'),
(458, 'Gyufatészta', 'g'),
(459, 'Gyömbéres keksz', 'g'),
(460, 'Gyümölcslé', 'g'),
(461, 'Gyöngybab', 'g'),
(462, 'Gyömbér üdítő', 'ml'),
(463, 'Gyömbérsör', 'ml'),
(464, 'Gyümölcsjoghurt', 'ml'),
(465, 'Gyümölcstea', 'ml'),
(466, 'Gyümölcskonzervlé', 'ml'),
(467, 'Gyöngytyúk', 'g'),
(468, 'Gyümölcskocsonya por', 'g'),
(469, 'Gyümölcsízű italpor', 'g'),
(470, 'Gyümölcsös dresszing', 'ml'),
(471, 'Gyoza', 'db'),
(472, 'Halványító zeller', 'g'),
(473, 'Hajdina', 'g'),
(474, 'Hokkaido tök', 'g'),
(475, 'Heck', 'g'),
(476, 'Háztartási keksz', 'g'),
(477, 'Habfixáló', 'g'),
(478, 'Halloumi sajt', 'g'),
(479, 'Haltej/halikra', 'g'),
(480, 'Hal', 'g'),
(481, 'Halszósz', 'ml'),
(482, 'Hajdinaliszt', 'g'),
(483, 'Habtejszín', 'ml'),
(484, 'Hamburger zsemle', 'db'),
(485, 'Hot-dog kifli', 'db'),
(486, 'Hosszúmetélt', 'g'),
(487, 'Habcsók', 'g'),
(488, 'Harissa paszta', 'g'),
(489, 'Himalája só', 'g'),
(490, 'Hegyes erős paprika', 'g'),
(491, 'Halgerinc', 'g'),
(492, 'Halászlékocka', 'db'),
(493, 'Hering (konzerv)', 'g'),
(494, 'Homár', 'g'),
(495, 'Hal alaplé', 'ml'),
(496, 'Halolaj', 'ml'),
(497, 'Hal fűszerkeverék', 'g'),
(498, 'Hamburgerhús', 'g'),
(499, 'Hasábburgonya', 'g'),
(500, 'Hoisin-szósz', 'ml'),
(501, 'Főzőkrém', 'ml'),
(502, 'Halrudacska', 'g'),
(503, 'Hollandi mártás', 'g'),
(504, 'Hummusz', 'g'),
(505, 'Izsóp', 'g'),
(506, 'Istengyalulta tök', 'g'),
(507, 'Instant élesztő', 'g'),
(508, 'Instant kávé', 'g'),
(509, 'Instant kakaópor', 'g'),
(510, 'Instant pótkávé', 'ml'),
(511, 'India szószos bab', 'g'),
(512, 'Ibolya', 'g'),
(513, 'Író', 'ml'),
(514, 'Ízesített gabonapehely', 'g'),
(515, 'Joghurt', 'ml'),
(516, 'Jalapeño', 'g'),
(517, 'Juharszirup', 'ml'),
(518, 'Juhtúró', 'g'),
(519, 'Juhsajt', 'g'),
(520, 'Jégcukor', 'g'),
(521, 'Jégsaláta', 'g'),
(522, 'Jázmin rizs', 'g'),
(523, 'Juhbeles virsli', 'g'),
(524, 'Joghurtos salátaöntet', 'ml'),
(525, 'Japánszilva', 'g'),
(526, 'Jégkocka', 'db'),
(527, 'Juhkefir', 'ml'),
(528, 'Jégcsapretek', 'g'),
(529, 'Juhhús', 'g'),
(530, 'Jackfruit', 'g'),
(531, 'jégkrém', 'ml'),
(532, 'Körte', 'g'),
(533, 'Kakaó', 'ml'),
(534, 'Kakukkfű', 'g'),
(535, 'Kávé', 'ml'),
(536, 'Kesudió', 'g'),
(537, 'Kapor', 'g'),
(538, 'Karfiol', 'g'),
(539, 'Koktélrák', 'g'),
(540, 'Kuszkusz', 'g'),
(541, 'Kecskesajt', 'g'),
(542, 'Közönséges tök', 'g'),
(543, 'Kapribogyó', 'g'),
(544, 'Kacsahús', 'g'),
(545, 'Kacsamáj', 'g'),
(546, 'Konyak', 'ml'),
(547, 'Kiwi', 'g'),
(548, 'Koriander', 'g'),
(549, 'Kaviár', 'g'),
(550, 'Kucsmagomba', 'g'),
(551, 'Kínai kel', 'g'),
(552, 'Köménymag', 'g'),
(553, 'Köles', 'g'),
(554, 'Kagyló', 'g'),
(555, 'Kókusz', 'g'),
(556, 'Kurkuma', 'g'),
(557, 'Karalábé', 'g'),
(558, 'Kefir', 'ml'),
(559, 'Káposzta', 'g'),
(560, 'Kelkáposzta', 'g'),
(561, 'Kardamom', 'g'),
(562, 'Kukoricaliszt', 'g'),
(563, 'Kukoricadara', 'g'),
(564, 'Kolbász', 'g'),
(565, 'Kókuszolaj', 'ml'),
(566, 'Kifli', 'db'),
(567, 'Kelbimbó', 'g'),
(568, 'Kumquat', 'g'),
(569, 'Krinolin', 'g'),
(570, 'Kínai ötfűszer-keverék', 'g'),
(571, 'Kárász', 'g'),
(572, 'Ketchup', 'g'),
(573, 'Kétszersült', 'g'),
(574, 'Kenyér', 'g'),
(575, 'Keksz', 'g'),
(576, 'Kukoricapehely', 'g'),
(577, 'Kéksajt', 'g'),
(578, 'Kókusztej', 'ml'),
(579, 'Krémsajt', 'g'),
(580, 'Kecskehús', 'g'),
(581, 'Kókuszzsír', 'g'),
(582, 'Kacsazsír', 'g'),
(583, 'Kígyóuborka', 'g'),
(584, 'Konzerv paradicsom', 'g'),
(585, 'Kacsamell', 'g'),
(586, 'Kókuszreszelék', 'g'),
(587, 'Kukoricakeményítő', 'g'),
(588, 'Kápia paprika', 'g'),
(589, 'Kacsa testháj', 'g'),
(590, 'Kékszőlő', 'g'),
(591, 'Kenyérliszt BL80', 'g'),
(592, 'Kekszmorzsa', 'g'),
(593, 'Kruton', 'g'),
(594, 'Kovászos uborka', 'g'),
(595, 'Kandírozott citromhéj', 'g'),
(596, 'Kovászosuborka-lé', 'ml'),
(597, 'Kandírozott narancshéj', 'g'),
(598, 'Karamellás pudingpor', 'g'),
(599, 'Keserűmandula aroma', 'ml'),
(600, 'Kenyérszalonna', 'g'),
(601, 'Kaukázusi kefir', 'ml'),
(602, 'Kockacukor', 'g'),
(603, 'Kovász', 'g'),
(604, 'Krémtúró', 'g'),
(605, 'Kandírozott ananász', 'g'),
(606, 'Kenőmájas', 'g'),
(607, 'Knédli', 'g'),
(608, 'Kókuszos puding', 'g'),
(609, 'Kókuszos pudingpor', 'g'),
(610, 'Krokant', 'g'),
(611, 'Kanadai sütőtök', 'g'),
(612, 'Kendermag', 'g'),
(613, 'Koriandermag', 'g'),
(614, 'Kukoricaolaj', 'ml'),
(615, 'Kökénylekvár', 'g'),
(616, 'Kókusztejpor', 'g'),
(617, 'Koktélcseresznye', 'g'),
(618, 'Körömvirág', 'g'),
(619, 'Körözött', 'g'),
(620, 'Koffeinmentes kávé', 'ml'),
(621, 'Kacsacomb', 'g'),
(622, 'Kagylóhús', 'g'),
(623, 'Kagylótészta', 'g'),
(624, 'Kamillavirág', 'g'),
(625, 'Kanadai bacon', 'g'),
(626, 'Kandírozott citrom', 'g'),
(627, 'Kandírozott meggy', 'g'),
(628, 'Kandírozott papaja', 'g'),
(629, 'Kakas', 'g'),
(630, 'Kacsazúza', 'g'),
(631, 'Kifliburgonya', 'g'),
(632, 'Királyrák', 'g'),
(633, 'Karamellás puding', 'g'),
(634, 'Karamell öntet', 'g'),
(635, 'Kecsketej-joghurt', 'ml'),
(636, 'Kínai tészta', 'g'),
(637, 'Kelkáposzta levél', 'g'),
(638, 'Kentucky fűszerkeverék', 'g'),
(639, 'Kínai rizsbor', 'ml'),
(640, 'Kókuszvíz', 'ml'),
(641, 'Kolbászhús', 'g'),
(642, 'Kökény', 'g'),
(643, 'Kolozsvári szalonna', 'g'),
(644, 'Kötözött sonka', 'g'),
(645, 'Kukoricaszirup', 'ml'),
(646, 'Kurkumagyökér', 'g'),
(647, 'Keszeg', 'g'),
(648, 'Káposztalevél', 'g'),
(649, 'Kókuszchips', 'g'),
(650, 'Kávétejszín', 'ml'),
(651, 'Kókuszkrém', 'ml'),
(652, 'Kókuszliszt', 'g'),
(653, 'Kockasajt', 'g'),
(654, 'Kalács', 'g'),
(655, 'Koktélparadicsom', 'g'),
(656, 'Körtelé', 'ml'),
(657, 'Kóla', 'ml'),
(658, 'Karalábélevél', 'g'),
(659, 'Kínai zöldségkeverék', 'g'),
(660, 'Kókuszcukor', 'g'),
(661, 'Konzerv vagdalthús', 'g'),
(662, 'Kínai só', 'g'),
(663, 'Körtebefőtt', 'g'),
(664, 'Konyak aroma', 'ml'),
(665, 'Kakaóvaj', 'g'),
(666, 'Karob por', 'g'),
(667, 'Kacsaaprólék', 'g'),
(668, 'Kamut liszt', 'g'),
(669, 'Kókusz aroma', 'ml'),
(670, 'Konjac liszt', 'g'),
(671, 'Konzerv bab', 'g'),
(672, 'Kenguruhús', 'g'),
(673, 'Kakaóbab', 'g'),
(674, 'Kecsege', 'g'),
(675, 'Kefirgomba', 'g'),
(676, 'Kölesliszt', 'g'),
(677, 'Kristálygomba', 'g'),
(678, 'Konyakmeggy', 'g'),
(679, 'Kakaós pudingpor', 'g'),
(680, 'Kókusznektár szirup', 'ml'),
(681, 'Komló', 'g'),
(682, 'Kankalin', 'g'),
(683, 'Kelt tészta', 'g'),
(684, 'Kékszőlőmagőrlemény', 'g'),
(685, 'Krémfehérsajt', 'g'),
(686, 'Kekszkrém', 'g'),
(687, 'Kimchi', 'g'),
(688, 'Lime', 'g'),
(689, 'Lazac', 'g'),
(690, 'Lencse', 'g'),
(691, 'Libahús', 'g'),
(692, 'Lilahagyma', 'g'),
(693, 'Lenmag', 'g'),
(694, 'Laskagomba', 'g'),
(695, 'Leveles tészta', 'g'),
(696, 'Levendulavirág', 'g'),
(697, 'Lestyán', 'g'),
(698, 'Leveskocka', 'db'),
(699, 'Lekvár/ dzsem', 'g'),
(700, 'Limoncello', 'ml'),
(701, 'Libamáj', 'g'),
(702, 'Lasagne tészta', 'g'),
(703, 'Lapzselatin', 'db'),
(704, 'Libatepertő', 'g'),
(705, 'Libazsír', 'g'),
(706, 'Libamell', 'g'),
(707, 'Libaháj', 'g'),
(708, 'Lecsókolbász', 'g'),
(709, 'Lapkasajt', 'db'),
(710, 'Lenmagliszt', 'g'),
(711, 'Libacomb', 'g'),
(712, 'Lemon curd', 'g'),
(713, 'Laktózmentes túró', 'g'),
(714, 'Lecsó', 'g'),
(715, 'Levendula', 'g'),
(716, 'Lenmagcsíra', 'g'),
(717, 'Levesgyöngy', 'g'),
(718, 'Levendulaszirup', 'ml'),
(719, 'Levescsont', 'g'),
(720, 'Löncshús', 'g'),
(721, 'Libamájpástétom', 'g'),
(722, 'Lenmagolaj', 'ml'),
(723, 'Libaszív', 'g'),
(724, 'Lime héja', 'g'),
(725, 'Lime levél', 'g'),
(726, 'Lángolt kolbász', 'g'),
(728, 'Limelé', 'ml'),
(729, 'Likőr', 'ml'),
(730, 'Lecsópaprika', 'g'),
(731, 'Licsi', 'g'),
(732, 'Licsi konzerv', 'g'),
(733, 'Libaaprólék', 'g'),
(734, 'Lenmagpehely', 'g'),
(735, 'Lótuszgyökér', 'g'),
(736, 'Laktózmentes sajt', 'g'),
(737, 'Laktózmentes tej', 'g'),
(738, 'Lavash', 'g'),
(739, 'Menta', 'g'),
(740, 'Méz', 'g'),
(741, 'Mangó', 'g'),
(742, 'Mandula', 'g'),
(743, 'Marhahús', 'g'),
(744, 'Mák', 'g'),
(745, 'Mozzarella', 'g'),
(746, 'Mascarpone', 'g'),
(747, 'Mustár', 'g'),
(748, 'Marsala', 'g'),
(749, 'Makréla', 'g'),
(750, 'Mirin', 'ml'),
(751, 'Meggy', 'g'),
(752, 'Miso', 'g'),
(753, 'Málna', 'g'),
(754, 'Makadámdió', 'g'),
(755, 'Medvehagyma', 'g'),
(756, 'Margarin', 'g'),
(757, 'Majonéz', 'g'),
(758, 'Mángold', 'g'),
(759, 'Majoranna', 'g'),
(760, 'Melaszos nádcukor', 'g'),
(761, 'Mazsola', 'g'),
(762, 'Mortadella', 'g'),
(763, 'Must', 'ml'),
(764, 'Marcipán', 'g'),
(765, 'Mustármag', 'g'),
(766, 'Mogyoróvaj', 'g'),
(767, 'Madársaláta', 'g'),
(768, 'Mangalica hús', 'g'),
(769, 'Macesz', 'g'),
(770, 'Mézeskalács fűszerkeverék', 'g'),
(771, 'Müzli', 'g'),
(772, 'Mandarin', 'g'),
(773, 'Mincemeat', 'g'),
(774, 'Makaróni', 'g'),
(775, 'Málnaecet', 'ml'),
(776, 'Mandulaliszt', 'g'),
(777, 'Matcha por', 'g'),
(778, 'Marharostélyos', 'g'),
(779, 'Mangalicasonka', 'g'),
(780, 'Marhabélszín', 'g'),
(781, 'Marhalapocka', 'g'),
(782, 'Marhalábszár', 'g'),
(783, 'Marhacomb', 'g'),
(784, 'Marhacsont', 'g'),
(785, 'Marhafartő', 'g'),
(786, 'Mangalica szalonna', 'g'),
(787, 'Marha velőscsont', 'g'),
(788, 'Mangalica zsír', 'g'),
(789, 'Mangalicaszűz', 'g'),
(790, 'Mandulaaroma', 'ml'),
(791, 'Mandulapehely', 'g'),
(792, 'Majonézes torma', 'g'),
(793, 'Marinara szósz', 'ml'),
(794, 'Medvehagyma pesto', 'g'),
(795, 'Milánói alappor', 'g'),
(796, 'Milánói szósz', 'ml'),
(797, 'Mogyoróolaj', 'ml'),
(798, 'Mungóbabcsíra', 'g'),
(799, 'Mexikói keverék', 'g'),
(800, 'Málnalekvár', 'g'),
(801, 'Málnadzsem', 'g'),
(802, 'Mandulatej', 'ml'),
(803, 'Marinált feta', 'g'),
(804, 'Marinált paprika', 'g'),
(805, 'Mahi mahi filé', 'g'),
(806, 'Májgombóc', 'g'),
(807, 'Májkrém', 'g'),
(808, 'Málnaszörp', 'ml'),
(809, 'Mangalicatarja', 'g'),
(810, 'Maracuja', 'g'),
(811, 'Marha alaplé', 'ml'),
(812, 'Marha hátszín', 'g'),
(813, 'Marhafarok', 'g'),
(814, 'Márna', 'g'),
(815, 'Martini Bianco', 'ml'),
(816, 'Martini Rosso', 'ml'),
(817, 'Meggybefőtt', 'g'),
(818, 'Mentaszirup', 'ml'),
(819, 'Marhamáj', 'g'),
(820, 'Meggylé', 'ml'),
(821, 'Melegszendvicskrém', 'g'),
(822, 'Mexikói alap', 'g'),
(823, 'Mézes puszedli', 'g'),
(824, 'Mézkaramell', 'g'),
(825, 'Mogyorós puding', 'g'),
(826, 'Müzli mix', 'g'),
(827, 'Magyaros fűszerkeverék', 'g'),
(828, 'Madras curry', 'g'),
(829, 'Meggyfa levél', 'g'),
(830, 'Muflon', 'g'),
(831, 'Marhavelő', 'g'),
(832, 'Meggylekvár', 'g'),
(833, 'Meggydzsem', 'g'),
(834, 'Marhafelsál', 'g'),
(835, 'Májusi pereszke', 'g'),
(836, 'Mezei cickafark', 'g'),
(837, 'Májas hurka', 'g'),
(838, 'Metélőhagyma', 'g'),
(839, 'Marhanyelv', 'g'),
(840, 'Mungóbab', 'g'),
(841, 'Mojo szósz', 'ml'),
(842, 'Maláj aszaltszilva mártás', 'ml'),
(843, 'Marhanyak', 'g'),
(844, 'Mangó chutney', 'g'),
(845, 'Melasz', 'g'),
(846, 'Mézes tortalap', 'g'),
(847, 'Mákliszt', 'g'),
(848, 'Mandulavaj', 'g'),
(849, 'Marmite', 'g'),
(850, 'Macskagyökér', 'g'),
(851, 'Mexicana szószos bab', 'g'),
(852, 'Marinált hering', 'g'),
(853, 'Mogyorókrémmel töltött bonbon', 'g'),
(854, 'Marhafaggyú', 'g'),
(855, 'Manióka', 'g'),
(856, 'Mexicói fűszerkeverék', 'g'),
(857, 'Narancs', 'g'),
(858, 'Növényi tejszín', 'ml'),
(859, 'Napraforgómag', 'g'),
(860, 'Nádcukor', 'g'),
(861, 'Napraforgó olaj', 'ml'),
(862, 'Nektarin', 'g'),
(863, 'Növényi tej', 'ml'),
(864, 'Növényi habtejszín', 'ml'),
(865, 'Nutella', 'g'),
(866, 'Növényi joghurt', 'ml'),
(867, 'Japán körte', 'g'),
(868, 'Narancslekvár', 'g'),
(869, 'Naspolya', 'g'),
(870, 'Narancs eszencia', 'ml'),
(871, 'Narancsvirágvíz', 'ml'),
(872, 'Narancsdzsem', 'g'),
(873, 'Nápolyi', 'g'),
(874, 'Narancslé', 'ml'),
(875, 'Narancsszörp', 'ml'),
(876, 'Nugátmassza', 'g'),
(877, 'Narancsaroma', 'ml'),
(878, 'Narancshéj', 'g'),
(879, 'Narancsvirág aroma', 'ml'),
(880, 'Négyszínű bors', 'g'),
(881, 'Némakacsa', 'g'),
(882, 'Némakacsa melle', 'g'),
(883, 'Nátrium-benzoát', 'g'),
(884, 'Négercsók', 'db'),
(885, 'Nori lap', 'db'),
(886, 'Növényi tejföl', 'ml'),
(887, 'Natúr gabonapehely', 'g'),
(888, 'Növényi sajt', 'g'),
(889, 'NoCarb Noodle', 'g'),
(890, 'Nyelvhal', 'g'),
(891, 'Nyúlhús', 'g'),
(892, 'Nyúlcomb', 'g'),
(893, 'Nyúlmáj', 'g'),
(894, 'Nyírfacukor', 'g'),
(895, 'Nyílgyökér liszt', 'g'),
(896, 'Olajbogyó', 'g'),
(897, 'Olívaolaj', 'ml'),
(898, 'Oregánó', 'g'),
(899, 'Okra', 'g'),
(900, 'Osztrigaszósz', 'ml'),
(901, 'Ostya', 'g'),
(902, 'Osztriga', 'g'),
(903, 'Ostyalap', 'g'),
(904, 'Olajos hal', 'g'),
(905, 'Orecchiette tészta', 'g'),
(906, 'Olasz fűszerkeverék', 'g'),
(907, 'Orda', 'g'),
(908, 'Omlós tészta', 'g'),
(909, 'Oreo keksz', 'g'),
(910, 'Orgonavirág', 'g'),
(911, 'Ottoman', 'g'),
(912, 'Orzo', 'g'),
(913, 'Oroblanco', 'ml'),
(914, 'Ördöghal', 'g'),
(915, 'Öregtészta', 'g'),
(916, 'Őszibarack', 'g'),
(917, 'Őzhús', 'g'),
(918, 'Őszibaracklekvár', 'g'),
(919, 'Őszibarackdzsem', 'g'),
(920, 'Őrölt kávé', 'g'),
(921, 'Őrölt fűszerkömény', 'g'),
(922, 'Őszibarack konzerv', 'g'),
(923, 'Őzgerinc', 'g'),
(924, 'Őzcomb', 'g'),
(925, 'Paradicsom', 'g'),
(926, 'Petrezselyem', 'g'),
(927, 'Parmezán sajt', 'g'),
(928, 'Prosciutto', 'g'),
(929, 'Póréhagyma', 'g'),
(930, 'Padlizsán', 'g'),
(931, 'Ponty', 'g'),
(932, 'Pulykahús', 'g'),
(933, 'Pesto', 'g'),
(934, 'Piros ribizli', 'g'),
(935, 'Pancetta', 'g'),
(936, 'Pitypang', 'g'),
(937, 'Pita', 'db'),
(938, 'Paprika', 'g'),
(939, 'Pisztácia', 'g'),
(940, 'Polip', 'g'),
(941, 'Pulykamáj', 'g'),
(942, 'Pezsgő', 'ml'),
(943, 'Pomelo', 'g'),
(944, 'Pacal', 'g'),
(945, 'Pisztráng', 'g'),
(946, 'Papaja', 'g'),
(947, 'Pangasius', 'g'),
(948, 'Provence-i fűszerkeverék', 'g'),
(949, 'Pillecukor', 'g'),
(950, 'Pasztinák', 'g'),
(951, 'Patisszon', 'g'),
(952, 'Puffasztott rizs', 'g'),
(953, 'Pudingpor', 'g'),
(954, 'Paprikakrém', 'g'),
(955, 'Portobello gomba', 'g'),
(956, 'Pepperoni', 'g'),
(957, 'Paradicsomlé', 'ml'),
(958, 'Penne', 'g'),
(959, 'Paprikás szalámi', 'g'),
(960, 'Párizsi', 'g'),
(961, 'Pármai sonka', 'g'),
(962, 'Piskótalap', 'g'),
(963, 'Pizzaszósz', 'ml'),
(964, 'Pulykamell', 'g'),
(965, 'Pulykacomb', 'g'),
(966, 'Porcukor', 'g'),
(967, 'Pulykafelsőcomb', 'g'),
(968, 'Piros kaliforniai paprika', 'g'),
(969, 'Pulykamellsonka', 'g'),
(970, 'Pálinka', 'ml'),
(971, 'Pálmazsír', 'g'),
(972, 'Paprikás kolbász', 'g'),
(973, 'Paradicsom ivólé', 'ml'),
(974, 'Pecorino sajt', 'g'),
(975, 'Piros curry paszta', 'g'),
(976, 'Pizza fűszerkeverék', 'g'),
(977, 'Pulykafűszerkeverék', 'g'),
(978, 'Puttanesca fűszerkeverék', 'g'),
(979, 'Pekándió', 'g'),
(980, 'Paradicsompaprika', 'g'),
(981, 'Parenyica sajt', 'g'),
(982, 'Parasztkolbász', 'g'),
(983, 'Parázskrumpli', 'g'),
(984, 'Pattogatott kukorica', 'g'),
(985, 'Pecsenyezsír', 'g'),
(986, 'Piskótarolád', 'db'),
(987, 'Piskótatallér', 'g'),
(988, 'Pizzatészta', 'g'),
(989, 'Pontyfej', 'db'),
(990, 'Prágai sonka', 'g'),
(991, 'Pritaminpaprika', 'g'),
(992, 'Pulykazúza', 'g'),
(993, 'Pulykahere', 'g'),
(994, 'Puncs puding', 'g'),
(995, 'Puncs pudingpor', 'g'),
(996, 'Puncsaroma', 'ml'),
(998, 'Puncs fűszerkeverék', 'g'),
(999, 'Pálmacukor', 'g'),
(1000, 'Passzírozott paradicsom', 'ml'),
(1001, 'Pulykanyak', 'g'),
(1002, 'Paradicsomszósz', 'ml'),
(1003, 'Prosecco - habzóbor', 'ml'),
(1004, 'Paradicsomos salsa', 'g'),
(1005, 'Panko', 'g'),
(1006, 'Pastrami', 'g'),
(1007, 'Pak-choi', 'g'),
(1008, 'Pandanlevél', 'g'),
(1009, 'Pektin', 'g'),
(1010, 'Paradicsomos babkonzerv', 'g'),
(1011, 'Perilla', 'g'),
(1012, 'Padlizsánkrém', 'g'),
(1013, 'Pisztáciakrém', 'g'),
(1014, 'Rozmaring', 'g'),
(1015, 'Rizs', 'g'),
(1016, 'Ricotta', 'g'),
(1017, 'Rukkola', 'g'),
(1018, 'Rum', 'ml'),
(1019, 'Radicchio', 'g'),
(1020, 'Rizstészta', 'g'),
(1021, 'Rózsavíz', 'ml'),
(1022, 'Rózsaszirup', 'ml'),
(1023, 'Rókagomba', 'g'),
(1024, 'Rozsliszt', 'g'),
(1025, 'Római kömény', 'g'),
(1026, 'Ringli', 'g'),
(1027, 'Retek', 'g'),
(1028, 'Rizsecet', 'ml'),
(1029, 'Rebarbara', 'g'),
(1030, 'Repceolaj', 'ml'),
(1031, 'Réteslap', 'g'),
(1032, 'Rózsabors', 'g'),
(1033, 'Római saláta', 'g'),
(1034, 'Rizsliszt', 'g'),
(1035, 'Rosé', 'ml'),
(1036, 'Roletti', 'db'),
(1037, 'Rahát', 'g'),
(1038, 'Rizottó rizs', 'g'),
(1039, 'Rétesliszt', 'g'),
(1040, 'Rumaroma', 'ml'),
(1041, 'Rizsborecet', 'ml'),
(1042, 'Rózsaburgonya', 'g'),
(1043, 'Ribizlidzsem', 'g'),
(1044, 'Rózsalekvár', 'g'),
(1045, 'Raklett sajt', 'g'),
(1046, 'Rigatoni tészta', 'g'),
(1047, 'Rizstej', 'ml'),
(1048, 'Ribizliszörp', 'ml'),
(1049, 'Ringlószilva', 'g'),
(1050, 'Rooibos', 'g'),
(1051, 'Rozs', 'g'),
(1052, 'Rozskenyér', 'g'),
(1053, 'Rostos gyümölcslé', 'ml'),
(1054, 'Rozspehely', 'g'),
(1055, 'Rostos almalé', 'ml'),
(1056, 'Rózsa', 'g'),
(1057, 'Rizspehely', 'g'),
(1058, 'Rizslap', 'g'),
(1059, 'Ropi', 'g'),
(1060, 'Rétes fix', 'g'),
(1061, 'Ras el hanout', 'g'),
(1063, 'Raffaello golyó', 'db'),
(1064, 'Rákpaszta', 'g'),
(1065, 'Reteklevél', 'g'),
(1066, 'Rama', 'g'),
(1067, 'Rost sütőmix', 'g'),
(1068, 'Rozsos kétszersült', 'g'),
(1069, 'Rizsdara', 'g'),
(1070, 'Rántott sajt', 'g'),
(1071, 'Sárgarépa', 'g'),
(1072, 'Sütőtök', 'g'),
(1073, 'Sajt', 'g'),
(1074, 'Savanyú káposzta', 'g'),
(1075, 'Sertéshús', 'g'),
(1076, 'Spenót', 'g'),
(1077, 'Serrano sonka', 'g'),
(1078, 'Salottahagyma', 'g'),
(1079, 'Só', 'g'),
(1080, 'Sárgabarack', 'g'),
(1081, 'Sáfrány', 'g'),
(1082, 'Sertészsír', 'g'),
(1083, 'Shiitake gomba', 'g'),
(1084, 'Snidling', 'g'),
(1085, 'Stevia', 'g'),
(1086, 'Sóska', 'g'),
(1087, 'Sütőpor', 'g'),
(1088, 'Sonka', 'g'),
(1089, 'Sárgadinnye', 'g'),
(1090, 'Sör', 'ml'),
(1091, 'Süllő', 'g'),
(1092, 'Sonkahagyma', 'g'),
(1093, 'Scamorza', 'g'),
(1095, 'Sherry', 'g'),
(1096, 'Sűrített tej', 'ml'),
(1097, 'Surimi', 'g'),
(1098, 'Sertésmáj', 'g'),
(1099, 'Sűrített paradicsom', 'g'),
(1100, 'Sertésháj', 'g'),
(1101, 'Spagetti tészta', 'g'),
(1102, 'Sertéscomb', 'g'),
(1103, 'Sertésdagadó', 'g'),
(1104, 'Sertés rövidkaraj', 'g'),
(1105, 'Sertés karajcsont', 'g'),
(1106, 'Sertés szűzpecsenye', 'g'),
(1107, 'Sertésoldalas', 'g'),
(1108, 'Sertéstarja', 'g'),
(1109, 'Sertésköröm', 'g'),
(1110, 'Sertéscsülök', 'g'),
(1111, 'Sertéslapocka', 'g'),
(1112, 'Sárgabaracklekvár', 'g'),
(1113, 'Sonkatök', 'g'),
(1114, 'Sovány tejpor', 'g'),
(1115, 'Sprotni (konzerv)', 'g'),
(1116, 'Sonkás tortellini', 'g'),
(1117, 'Sovány tej', 'ml'),
(1118, 'Sovány túró', 'g'),
(1119, 'Spekulatius keksz', 'g'),
(1120, 'Sóvirág', 'g'),
(1121, 'Sárga currykrém', 'g'),
(1122, 'Savanyított kerekrépa', 'g'),
(1123, 'Salátalevél', 'g'),
(1124, 'Sárgabarackdzsem', 'g'),
(1125, 'Sótlan pisztácia', 'g'),
(1126, 'Salátahagyma', 'g'),
(1127, 'Salátakeverék', 'g'),
(1128, 'Savó', 'ml'),
(1129, 'Dzsemfix', 'g'),
(1130, 'Savanyított gomba', 'g'),
(1131, 'Sajtos tortellini', 'g'),
(1132, 'Sertésfül', 'g'),
(1133, 'Sajtszósz', 'ml'),
(1134, 'Sertésborda', 'g'),
(1135, 'Sangría', 'ml'),
(1136, 'Sárgaborsóliszt', 'g'),
(1137, 'Sertéscsont', 'g'),
(1138, 'Schar Mix', 'g'),
(1139, 'Som', 'g'),
(1140, 'Sertésfarok', 'g'),
(1141, 'Sherryecet', 'ml'),
(1142, 'Sertésorr', 'g'),
(1143, 'Sikér', 'g'),
(1144, 'Sonkalé', 'ml'),
(1145, 'Spárgatök', 'g'),
(1146, 'Selyemsonka', 'g'),
(1147, 'Sertésvese', 'g'),
(1148, 'Sertés virsli', 'g'),
(1149, 'Sonkás szalámi', 'g'),
(1150, 'Spatzle tészta', 'g'),
(1151, 'Stevia por', 'g'),
(1152, 'Sushi rizs', 'g'),
(1153, 'Sügér', 'g'),
(1154, 'Sütésálló lekvár', 'g'),
(1155, 'Sütnivaló kolbász', 'g'),
(1156, 'Sütő rum', 'ml'),
(1157, 'Sáfrányos szeklice', 'g'),
(1158, 'Sertésszív', 'g'),
(1159, 'Sertésnyelv', 'g'),
(1160, 'Sötét trombitagomba', 'g'),
(1161, 'Sertés agyvelő', 'g'),
(1162, 'Sertésvelő', 'g'),
(1163, 'Sózott törökmogyoró', 'g'),
(1164, 'Sárgabarackbefőtt', 'g'),
(1166, 'Steviatabletta', 'db'),
(1167, 'Sertésvér', 'g'),
(1168, 'Sertéstüdő', 'g'),
(1169, 'Sertésbőrke', 'g'),
(1170, 'Sárga kaliforniai paprika', 'g'),
(1171, 'Snickers szelet', 'g'),
(1174, 'Sárgabarackmag', 'g'),
(1175, 'Savanyúkáposztalé', 'ml'),
(1176, 'Sózott retek', 'g'),
(1177, 'Soba tészta', 'g'),
(1179, 'Sárkánygyümölcs', 'g'),
(1180, 'Sombrero mix', 'g'),
(1181, 'Sült hagyma', 'g'),
(1182, 'Sütőmargarin', 'g'),
(1183, 'Skyr', 'ml'),
(1184, 'Sárgarépalé', 'ml'),
(1187, 'Sült csirkemell', 'g'),
(1188, 'Szeder', 'g'),
(1189, 'Szegfűszeg', 'g'),
(1190, 'Szardella (konzerv)', 'g'),
(1191, 'Szárított paradicsom', 'g'),
(1192, 'Szerecsendió', 'g'),
(1193, 'Szójaszósz', 'ml'),
(1194, 'Szaké', 'ml'),
(1195, 'Szilva', 'g'),
(1196, 'Szezámsó', 'g'),
(1197, 'Szezámmag', 'g'),
(1198, 'Szódabikarbóna', 'g'),
(1199, 'Szalalkáli', 'g'),
(1201, 'Szőlő', 'g'),
(1202, 'Szőlőmagolaj', 'ml'),
(1203, 'Szezámolaj', 'ml'),
(1204, 'Szárított zöldségkeverék', 'g'),
(1205, 'Szarvasgomba', 'g'),
(1206, 'Szarvashús', 'g'),
(1207, 'Szója', 'g'),
(1208, 'Szalicil', 'g'),
(1209, 'Szójabab', 'g'),
(1210, 'Szalámi', 'g'),
(1211, 'Szilvalekvár', 'g'),
(1212, 'Száraz vörösbor', 'ml'),
(1213, 'Száraz rosé', 'ml'),
(1214, 'Szénsavas narancsos üdítőital', 'ml'),
(1215, 'Szegfűbors', 'g'),
(1216, 'Szamóca', 'g'),
(1217, 'Szamócadzsem', 'g'),
(1218, 'Szardellapaszta', 'g'),
(1219, 'Szardínia', 'g'),
(1220, 'Szárnyas alaplé', 'ml'),
(1221, 'Szárnyas fűszerkeverék', 'g'),
(1222, 'Szarvacska tészta', 'g'),
(1223, 'Szarvasbélszín', 'g'),
(1224, 'Szendvicskrém', 'g'),
(1225, 'Szerecsendió virág', 'g'),
(1226, 'Szezámliszt', 'g'),
(1227, 'Szilvabefőtt', 'g'),
(1228, 'Színes cukorka', 'g'),
(1229, 'Szójajoghurt', 'ml'),
(1230, 'Szójatej', 'ml'),
(1231, 'Szőlőcukor', 'g'),
(1232, 'Szőlőlé', 'ml'),
(1233, 'Szőlőlevél', 'g'),
(1235, 'Szódavíz', 'ml'),
(1236, 'Szegfűgomba', 'g'),
(1237, 'Szarvascomb', 'g'),
(1238, 'Szörp', 'ml'),
(1239, 'Szárított gomba', 'g'),
(1240, 'Szárított hibiszkuszvirág', 'g'),
(1241, 'Szójaliszt', 'g'),
(1242, 'Szójaolaj', 'ml'),
(1245, 'Szárított hibiszkusz', 'g'),
(1246, 'Szárított jázmin', 'g'),
(1247, 'Szumák', 'g'),
(1248, 'Szentjánoskenyérmag liszt', 'g'),
(1249, 'Szarvasgomba paté', 'g'),
(1250, 'Szarvasgombás olaj', 'ml'),
(1251, 'Szárított almakarika', 'g'),
(1252, 'Szárított fűszerpaprika', 'g'),
(1253, 'Szejtán', 'g'),
(1254, 'Százszorszép', 'g'),
(1255, 'Szénsavas citromos üdítőital', 'ml'),
(1257, 'Szecsuáni bors', 'g'),
(1258, 'Tojás', 'db'),
(1259, 'Tőzegáfonya', 'g'),
(1260, 'Tonhal', 'g'),
(1261, 'Tej', 'ml'),
(1262, 'Tejföl', 'ml'),
(1263, 'Tehéntúró', 'g'),
(1264, 'Tészta', 'g'),
(1265, 'Tofu', 'g'),
(1266, 'Tárkony', 'g'),
(1267, 'Tarhonya', 'g'),
(1268, 'Turbolya', 'g'),
(1269, 'Tahini', 'g'),
(1270, 'Tökmag', 'g'),
(1271, 'Tökmagolaj', 'ml'),
(1272, 'Tönkölybúza', 'g'),
(1273, 'Tintahal', 'g'),
(1274, 'Tepertő', 'g'),
(1275, 'Törpeharcsa', 'g'),
(1276, 'Törökmogyoró', 'g'),
(1277, 'Torma', 'g'),
(1278, 'Tandoori krém', 'g'),
(1279, 'Tortazselé', 'g'),
(1280, 'Tagin fűszerkeverék', 'g'),
(1281, 'Tequila', 'ml'),
(1282, 'Tojáslikőr', 'ml'),
(1283, 'Tejpor', 'g'),
(1284, 'Tortellini', 'g'),
(1285, 'Tortabevonó', 'g'),
(1286, 'Tea', 'ml'),
(1287, 'Tilápia', 'g'),
(1288, 'Tabasco szósz', 'ml'),
(1289, 'Tölcsér', 'g'),
(1290, 'Tejcsokoládé', 'g'),
(1291, 'Tojássárgája', 'g'),
(1292, 'Tojásfehérje', 'g'),
(1293, 'TV-paprika', 'g'),
(1294, 'Trappista sajt', 'g'),
(1295, 'Tortilla lap', 'g'),
(1296, 'Teafilter', 'db'),
(1297, 'Teljes kiőrlésű liszt', 'g'),
(1298, 'Teavaj', 'g'),
(1299, 'Tejszínhab', 'ml'),
(1300, 'Tejszínhab por', 'g'),
(1301, 'Tömlős krémsajt', 'g'),
(1302, 'Tintahalkarika', 'g'),
(1303, 'Tortilla chips', 'g'),
(1304, 'Tápióka', 'g'),
(1305, 'Tápiókaliszt', 'g'),
(1306, 'Tárkonyecet', 'ml'),
(1307, 'Tartármártás', 'g'),
(1308, 'Tejkaramella', 'g'),
(1309, 'Tejszínízű pudingpor', 'g'),
(1310, 'Téliszalámi', 'g'),
(1311, 'Teljeskiőrlésű tönkölybúza liszt', 'g'),
(1312, 'Tonhalkonzerv', 'g'),
(1313, 'Tonik', 'ml'),
(1314, 'Tőkehalfilé', 'g'),
(1315, 'Tönkölybúza liszt', 'g'),
(1316, 'Triple sec', 'ml'),
(1317, 'Toast kenyér', 'g'),
(1318, 'Tintahalcsáp', 'g'),
(1319, 'Thai halszósz', 'g'),
(1320, 'Tökmagliszt', 'g'),
(1321, 'Törökméz', 'g'),
(1322, 'Tengeri spárga', 'g'),
(1323, 'Tiszta szesz', 'ml'),
(1324, 'Trópusi gyümölcskonzerv', 'g'),
(1325, 'Tenger gyümölcsei mix', 'g'),
(1327, 'Tejszínes-gombás szósz', 'ml'),
(1328, 'Thai zöldségkeverék', 'g'),
(1329, 'Tojáspótló por', 'g'),
(1330, 'Tönkölybúzapehely', 'g'),
(1331, 'Tandoori masala', 'g'),
(1332, 'Toffifee', 'db'),
(1333, 'Tamarind paszta', 'g'),
(1334, 'Timsó', 'g'),
(1335, 'Tokaszalonna', 'g'),
(1336, 'Tigrisrák', 'g'),
(1337, 'Tagliatelle', 'g'),
(1338, 'Tonkabab', 'g'),
(1339, 'Tomatillo', 'g'),
(1340, 'Tostada lap', 'db'),
(1341, 'Teafű', 'g'),
(1342, 'Tokaj Dressing', 'ml'),
(1343, 'Tokaj Vinaigrette', 'ml'),
(1344, 'Tejmentes margarin', 'g'),
(1345, 'Tintahal tinta', 'ml'),
(1346, 'Tésztakosárkák', 'g'),
(1347, 'Teriyaki szósz', 'ml'),
(1348, 'Túródesszert', 'g'),
(1349, 'Tökmagkrém', 'g'),
(1351, 'Tortelloni', 'g'),
(1352, 'Tükörglazúrpor', 'g'),
(1353, 'Trüffelgolyó', 'db'),
(1354, 'Tejoltó enzim', 'g'),
(1355, 'Tengeri hínár', 'g'),
(1356, 'Tangelo', 'g'),
(1358, 'Tyúk', 'g'),
(1359, 'Tyúkháj', 'g'),
(1360, 'Uborka', 'g'),
(1361, 'Udon tészta', 'g'),
(1362, 'Unicum', 'ml'),
(1363, 'Újhagyma', 'g'),
(1364, 'Újkrumpli', 'g'),
(1365, 'Újhagyma zöldje', 'g'),
(1366, 'Útifű maghéj', 'g'),
(1367, 'Üvegtészta', 'g'),
(1368, 'Vargánya gomba', 'g'),
(1369, 'Vöröskáposzta', 'g'),
(1370, 'Vöröshagyma', 'g'),
(1371, 'Vaj', 'g'),
(1372, 'Vanília', 'g'),
(1373, 'Vajrépa', 'g'),
(1374, 'Víz', 'ml'),
(1375, 'Vaníliás cukor', 'g'),
(1377, 'Virsli', 'g'),
(1378, 'Vörösbor', 'ml'),
(1379, 'Vaddisznóhús', 'g'),
(1380, 'Vadrizs', 'g'),
(1381, 'Vaníliaaroma', 'ml'),
(1382, 'Vörösborecet', 'ml'),
(1383, 'Vaníliás pudingpor', ''),
(1384, 'Virágméz', 'g'),
(1385, 'Vodka', 'ml'),
(1386, 'Vöröslencse', 'g'),
(1387, 'Vörösbab', 'g'),
(1388, 'Vinaigrette', 'ml'),
(1389, 'Vajkrém', 'g'),
(1390, 'Vöröskaviár', 'g'),
(1391, 'Vadlazac', 'g'),
(1392, 'Vérnarancs', 'g'),
(1393, 'Vérnarancs aroma', 'ml'),
(1394, 'Vörösáfonya', 'g'),
(1395, 'Vadkacsamell', 'g'),
(1396, 'Vaníliapuding', 'g'),
(1397, 'Vaddisznószűz', 'g'),
(1398, 'Vaddisznókaraj', 'g'),
(1399, 'Vargánya gombapor', 'g'),
(1400, 'Véres hurka', 'g'),
(1401, 'Vanília kivonat', 'ml'),
(1402, 'Vajkaramella', 'g'),
(1403, 'Vanília fagylalt', 'ml'),
(1404, 'Vegyes savanyúság', 'g'),
(1405, 'Vízitorma', 'g'),
(1406, 'Vad fűszerkeverék', 'g'),
(1407, 'Vízigesztenye', 'g'),
(1408, 'Vajhal', 'g'),
(1409, 'Vanillincukor', 'g'),
(1410, 'Vízispenót', 'g'),
(1411, 'Vajbab', 'g'),
(1412, 'Vékonybél (sertés)', 'g'),
(1413, 'Vegán burgerpogácsa', 'g'),
(1414, 'Vegán majonéz', 'g'),
(1415, 'Vegán nuggets', 'g'),
(1416, 'Zöldborsó', 'g'),
(1417, 'Zöldbab', 'g'),
(1418, 'Zeller', 'g'),
(1419, 'Zab', 'g'),
(1420, 'Zöldkagyló', 'g'),
(1421, 'Zúza', 'g'),
(1422, 'Zellerlevél', 'g'),
(1423, 'Zabpehely', 'g'),
(1424, 'Zabtejszín', 'ml'),
(1425, 'Zabkeksz', 'g'),
(1426, 'Zöldbors', 'g'),
(1427, 'Zabtej', 'ml'),
(1428, 'Zöldpaprika', 'g'),
(1429, 'Zöldhagyma', 'g'),
(1430, 'Zöld metélttészta', 'g'),
(1431, 'Zöldparadicsom', 'g'),
(1432, 'Zöld mandula', 'g'),
(1433, 'Zabliszt', 'g'),
(1434, 'Zabkorpa', 'g'),
(1435, 'Zöld olajbogyó', 'g'),
(1436, 'Zabpehelyliszt', 'g'),
(1437, 'Zöld kardamom', 'g'),
(1438, 'Zöldség alaplé', 'ml'),
(1439, 'Zöldspárga', 'g'),
(1440, 'Zöldfűszer', 'g'),
(1441, 'Zellersó', 'g'),
(1442, 'Zöld kaliforniai paprika', 'g'),
(1443, 'Zöldségkeverék', 'g'),
(1444, 'Zöldborsó-kukorica zöldségkeverék', 'g'),
(1445, 'Zöldbab-vajbab keverék', 'g'),
(1446, 'Zaatar', 'g'),
(1447, 'Zöldbanán liszt', 'g'),
(1448, 'Zöldséges golyó', 'g'),
(1449, 'Zsálya', 'g'),
(1450, 'Zselatin', 'g'),
(1451, 'Zsemlemorzsa', 'g'),
(1452, 'Zsemle', 'db'),
(1453, 'Zselatinfix', 'g'),
(1454, 'Zsúrkenyér', 'g'),
(1455, 'Zselécukor', 'g'),
(1456, 'Zselésítő befőzőszer', 'g');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pantry`
--

CREATE TABLE `pantry` (
  `pantry_item_id` int(11) NOT NULL,
  `pantry_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `ingredient_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `pantry`
--

INSERT INTO `pantry` (`pantry_item_id`, `pantry_id`, `ingredient_id`, `ingredient_quantity`) VALUES
(6, 6, 65, 250),
(28, 6, 857, 1000),
(29, 6, 295, 1000),
(30, 6, 44, 1000),
(31, 6, 740, 1000),
(33, 6, 1, 1500),
(34, 6, 1371, 100),
(35, 6, 2, 1),
(36, 1, 43, 100),
(37, 1, 2, 100),
(38, 103, 757, 100),
(39, 103, 572, 500),
(40, 103, 1258, 10),
(41, 6, 1258, 10),
(42, 1, 1079, 1000),
(43, 1, 1261, 150),
(44, 6, 1261, 150),
(45, 1, 1371, 100),
(46, 6, 741, 100),
(47, 336, 417, 290),
(48, 336, 740, 150),
(49, 336, 770, 4),
(50, 336, 1198, 4),
(51, 336, 1258, 2),
(52, 336, 1371, 65),
(53, 1, 44, 1000),
(54, 1, 45, 1),
(55, 1, 118, 700),
(56, 1, 186, 200),
(57, 1, 297, 1),
(58, 1, 330, 200),
(59, 1, 897, 100),
(60, 1, 930, 500),
(61, 1, 1002, 50),
(62, 1, 1073, 300),
(63, 1, 1192, 1),
(64, 1, 1428, 200),
(65, 6, 417, 290),
(66, 6, 770, 4),
(67, 6, 1198, 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `recipes`
--

CREATE TABLE `recipes` (
  `recipe_id` int(11) NOT NULL,
  `recipe_name` varchar(255) NOT NULL,
  `recipe_description` text NOT NULL,
  `recipe_time` int(11) NOT NULL,
  `recipe_headcount` int(11) NOT NULL,
  `source_user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `recipes`
--

INSERT INTO `recipes` (`recipe_id`, `recipe_name`, `recipe_description`, `recipe_time`, `recipe_headcount`, `source_user_id`) VALUES
(2, 'MY TEST RECIPE', 'This is a test recipe used for testing. - \r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 5, 2, NULL),
(5, 'Glutén- és laktózmentes mézeskalács', 'Keverjük össze a puha vajat a mézzel és a tojásokkal, a lisztet pedig a fűszerrel és a szódabikarbónával, majd elegyítsük a nedves és a száraz összetevőket. Gyúrjuk össze, és tegyük egy órára hűtőbe.\nNyújtsuk ki a tésztát. Én két sütőpapír között tettem meg ezt, mert a gluténmentes liszttől könnyebben repedhet és törhet a tészta, érdemes vele óvatosabban bánni.\nAlakítsuk a kívánt formára, majd 190 fokon süssük 10-12 percig, míg aranybarna nem lesz.', 40, 4, NULL),
(6, 'Vegán céklás fasírt', 'A főtt rizsre ráreszeljük a hámozott, tisztított céklát, hozzákeverjük a többi alapanyagot és egy kanál olívaolajat, fűszerezzük, és kis golyókba gyúrjuk.\nEgy nagy olajozott, vagy sütőpapírral borított tepsire helyezzük a golyókat. Meglocsoljuk vagy lepermetezzük olívaolajjal, és mehet az előmelegített sütőbe úgy 30-40 percre sülni.\nFőzelékek mellé, meleg paradicsomszósszal, avagy mártogatóssal tálaljuk. ', 50, 6, NULL),
(7, 'Bableves', 'Az apró kockára vágott szalonnát elkezdjük pirítani. Pár perc után mehet rá a karikákra vágott kolbász, azt is zsírjára pirítjuk.\nA finomra vágott vöröshagymát öntsük rá, majd kevergessük pár percig. Adjuk hozzá a felaprított fokhagymát is.\nTegyük bele a felkarikázott répákat is és pirítsuk tovább az egészet.\nHintsük meg egy evőkanál liszttel és fűszerezzük a pirospaprikával, sóval és borssal.\nÖntsünk rá vizet, hogy elfedjen mindent, és a pirospaprika ne keseredjen meg.\nÖntsük hozzá a konzerves babot, mikor még a zöldségek nem puhultak meg teljesen.\nFőzzük össze az egészet, ízesíteni és sűríteni lehet még ízlés szerint tejföllel.', 60, 4, NULL),
(8, 'keksz', 'jhjh', 100, 10, 6),
(9, 'Tatárbifsztek', 'A húst ujjnyi szeletekre vágjuk, megsózzuk, megborsozzuk, megkenjük mustárral, tálba tesszük, és soronként, hogy mindenhol érje, meglocsoljuk olívaolajjal (a végén lepje el az olaj). A hűtőben érleljük pár napig.\nA készítés reggelén kivesszük a húst a hűtőből, aprítógéppel pépesre daráljuk a hagymával, fokhagymával együtt, majd ízlés szerint fűszerezzük a tatárbifszteket sóval, borssal, piros arannyal, mustárral, ketchuppal. Végül hozzákeverjük a tojást és a vajat is. Kenhető masszává dolgozzuk, majd tálalásig behűtjük.\nFrissen pirított kenyérrel tálaljuk.', 120, 4, 6),
(10, 'Sajttekercs', 'A sonkatekercs elkészítéséhez 8 dkg vajból (100g), a lisztből, a tejből és a tejszínből sűrű besamelt főzünk, majd megsózzuk, megborsozzuk, és hozzáadjuk a lereszelt tormát. Levesszük a tűzről, és hagyjuk szobahőmérsékletűre hűlni. Ha kihűlt, a maradék vajat (60g) kihabosítjuk és fellazítjuk vele a besamelt, majd habzsák segítségével betöltjük vele a sonkákat.A sajttekercs elkészítéséhez a lila hagymát megpucoljuk és apróra vágjuk, az újhagymát megmossuk és összevágjuk, majd a vajkrémmel és a szobahőmérsékletű vajjal kikeverjük.\nEgy sütőtepsit kifolpackozunk, ráhelyezzük a szeletelt sajtot, arra a sonkát, majd 40 fokos sütőben meglangyosítjuk 1-2 perc alatt.\nHa meglágyult a sajt, megkenjük a krémmel, felcsavarjuk a folpackkal szorosan, és kihűtjük legalább 2 órát, hogy szeletelhető legyen.\nA sonkatekercseket kínálótálra rendezzük, a sajttekercseket szeletekre vágjuk, és azokat is elrendezzük a tálon. Csemegeuborkával, friss zöldségekkel és bagettel szuper ünnepi hidegtál lesz belőle.', 30, 8, 6),
(11, 'Minestrone leves', 'Egy fazékban felhevítjük az olajat, majd hozzáadjuk a zúzott fokhagymát, a finomra vágott zsályát, a finomra vágott rozmaringot és a babérlevelet, kb. 2 percig főzzük.\nEzután beletesszük az apróra vágott vöröshagymát, a kockára vágott répát és a zellert, majd pár percig dinszteljük, amíg a hagyma átlátszó lesz.\nHozzáadjuk a babot, és a paradicsomszószt, alaposan összekeverjük, és felöntjük annyi vízzel vagy alaplével, amennyi ellepi. Lefedjük, és 15 percig főzzük.\nVégül hozzáadjuk a mángoldot és a hajdinát is, hozzáöntünk még annyi folyadékot, hogy 5 cm-re ellepje, és félig lefedve addig főzzük, amíg a hozzávalók megpuhulnak.', 50, 4, NULL),
(12, 'Gluténmentes sütőtökkrémleves', 'A gluténmentes sütőtökkrémleve elkészítéséhez a sütőtököt feldaraboljuk, sütőpapírral bélelt tepsibe tesszük, és 180 fokra előmelegített sütőben kb. 40 perc alatt puhára sütjük.\nA bacont vékony csíkokra vágjuk, és ropogósra pirítjuk. Ha szükséges, tegyünk hozzá pár csepp olajat. A ropogós baconcsipszet kiszedjük az olajból, és félretesszük a tálalásig.\nA zöldségeket alaposan megtisztítjuk. A hagymát apró kockákra vágjuk, a sárgarépát felkarikázzuk és megfuttatjuk a baconből kisült zsíron. A többi zöldséget (krumpli, karalábé, fehérrépa) felkockázzuk, és a lábosba tesszük.\nFelöntjük az alaplével, megszórjuk a durvára vágott petrezselyemmel, és puhára főzzük fedő alatt.\nAz előre megsütött sütőtökszeleteket a levesbe tesszük a tejszínnel együtt, és botmixer segítségével krémesre turmixoljuk. A levest alaposan felforraljuk, közben ízlés szerint fűszerezzük sóval, borssal, szerecsendióval és csilivel.\nA tökmagot egy serpenyőben zsiradék nélkül megpirítjuk. A levest a baconcsipsszel és a pirított tökmaggal tálaljuk, és meglocsolhatjuk tökmagolajjal és ízlés szerint tejszínnel. Forrás: https://glutenmentesizlik.com/', 80, 4, 6),
(13, 'Szénhidrátcsökkentett, gluténmentes bagel', 'A receptből 4 db bagel készül. A keverőtálba tegyünk 185ml vizet, sót, citromlevet és keverjük össze. Adjuk hozzá a liszkeveréket és keverjünk egynemű tésztát, majd pihentessük 10 percig. Forraljuk fel a maradék 1L vizet és adjuk hozzá a szódabikarbónát. A tésztát gyúrjuk át 4 egyenlő részre, majd a megformázott bageleket tegyük a forrásban lévő vízbe, mindkét oldalukat főzzük 30-30 másodpercig. Vegyük ki őket és tegyük egy sütőpapírral bélelt tepsibe. Ízlés szerint díszítsük különféle magokkal. 180 fokos sötőben 35-10 percig süssük. Forrás: https://glutenmentesizlik.com/', 150, 4, 6),
(14, 'jajj', 'jajj', 1, 1, NULL),
(16, 'o', 'o', 1, 1, 1),
(17, 'Maceszgombóc', 'A maceszt vagy pászkát robotgép segítségével összezúzzuk. Ha nincs gépünk, akkor törjük apróra.\nAz apróra zúzott pászkát egy keverőtálba szórjuk, amire ráöntünk két, kissé felvert tojást.\nHozzáadunk két evőkanál libazsírt a pászkához, és 1-2 evőkanál alaplevet.\nSózzuk-borsozzuk ízlésünknek megfelelően, és keverjük jól össze az egészet. Majd helyezzük hűtőbe fél órára.\nA hűtőből kivéve formáljunk kézzel vagy kanállal diónyi gombócokat, és jól megsózott, lobogó vízbe dobjuk bele. Fedjük le, és főzzük a maceszgombócokat 40 percig, aztán levesbe téve fogyaszthatjuk is!', 45, 4, NULL),
(18, 'Zöldborsófőzelék', 'A zsírt felolvasztjuk, beletesszük a kifejtett borsót, sót, őrölt borsot, az apróra vágott fokhagymát, petrezselyem zöldet, összekeverjük.\nFedő alatt puhára pároljuk.\nMegszórjuk liszttel, megkeverjük, felöntjük tejjel, hogy ellepje, összefőzzük.', 50, 2, NULL),
(19, '0', '0', 0, 0, NULL),
(20, 'Sonka', 'Egye meg a sonkát!', 10, 1, 6),
(21, 'Vegetariánus moussaka', 'A padlizsánokat felszeleteljük, besózzuk, majd állni hagyjuk. Az összes többi zöldséget megtisztútjuk és vékony szeletekre vágjuk. Egy sütő tepsit megolajozunk, és kezdjük a rétegezést. Alulról felfelé: Burgonya, Padlizsán (papírtörlővel megszárítjuk előtte), Zöldpaprika, Gomba, Paradicsomszósz, Cukkini, Burgonya, és végül Olívaolaj, só és bors. A tepsit befedjük és 2 óráig sütjük. 2 óra elteltével a levesszük a fedelet, a fogás tetejét megcsorgatjuk tejszínnel, és ráhintjük a Fajéhat és Szerecsendiót, Sót, Borsot, és Sajtot reszelünk a tetejére. Fél órára visszatesszük a sütőbe, amíg készre sül. Jó étvágyat!! :)', 200, 6, 1),
(22, 'Húsleves', 'A húsleves elkészítéséhez a sárgarépát, a fehérrépát, a zellert, a karalábét, valamint a vöröshagymát meghámozzuk. A répákat hasábokra vágjuk. A konyhakész csirkét megmossuk, és darabokra vágjuk. Mindent egy lábasba teszünk és felöntünk annyi vízzel, hogy ellepje. Felforraljuk, majd mérsékeljük a hőt, és félig lefedve 1,5-2 óra alatt készre főzzük a levest. Ha nagyon elfövi a levét, vízzel pótoljuk, és megkóstoljuk, hogy elég sós-e.\nA cérnametéltet forrásban lévő, sós vízben, a csomagoláson található útmutatás szerint kifőzzük.', 135, 4, 6),
(23, 'Cukkinis rizottó', 'A felaprított vöröshagymát és fokhagymát némi olajon, közepes hőfokon egy serpenyőben megdinszteljük, majd hozzáadjuk a rizst és kicsit lepirítjuk. Felöntjük az alaplével, és alacsony hőfokon, kb.15-20 percig lefedve, időnként megkevergetve puhára főzzük.\nHozzáadjuk a lereszelt cukkinit, a sajtokat, a vajat és a sót. Összeforgatjuk, és addig keverjük, amíg a sajt teljesen el nem olvad.', 50, 6, 6);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `recipe_status`
--

CREATE TABLE `recipe_status` (
  `status_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `status` enum('pending','approved','rejected','') NOT NULL,
  `changed` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `recipe_status`
--

INSERT INTO `recipe_status` (`status_id`, `recipe_id`, `status`, `changed`) VALUES
(1, 2, 'rejected', '2025-04-01 12:58:03'),
(3, 5, 'approved', '2025-03-26 12:08:34'),
(4, 6, 'approved', '2025-03-26 16:22:51'),
(5, 7, 'approved', '2025-03-28 11:04:57'),
(6, 8, 'rejected', '2025-04-04 08:12:41'),
(7, 9, 'approved', '2025-04-02 09:01:45'),
(8, 10, 'approved', '2025-04-02 09:01:57'),
(9, 11, 'approved', '2025-04-02 09:02:00'),
(10, 12, 'approved', '2025-04-02 09:02:02'),
(11, 13, 'approved', '2025-04-02 09:02:05'),
(12, 14, 'rejected', '2025-04-02 09:25:33'),
(14, 16, 'rejected', '2025-04-02 09:25:31'),
(15, 17, 'approved', '2025-04-04 08:11:51'),
(16, 18, 'approved', '2025-04-04 08:12:20'),
(17, 19, 'rejected', '2025-04-16 07:52:26'),
(18, 20, 'rejected', '2025-04-16 07:52:29'),
(19, 21, 'approved', '2025-04-16 07:52:52'),
(20, 22, 'approved', '2025-04-18 12:32:23'),
(21, 23, 'pending', '2025-04-18 12:30:45');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `shopping`
--

CREATE TABLE `shopping` (
  `shopping_id` int(11) NOT NULL,
  `shopping_name` varchar(255) NOT NULL,
  `recipe_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `shopping`
--

INSERT INTO `shopping` (`shopping_id`, `shopping_name`, `recipe_id`) VALUES
(13, 'Vegán céklás fasírt', 6),
(22, 'Glutén- és laktózmentes mézeskalács', 5),
(23, 'Glutén- és laktózmentes mézeskalács', 5),
(26, 'Glutén- és laktózmentes mézeskalács', 5),
(27, 'Első bevásárlólistám', 5),
(28, 'Második bevásárlólistám', 7),
(30, 'Pénteken ezt akarom megsütni!', 5),
(31, 'Leves', 11);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_desc` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `inactive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `user_desc`, `email`, `inactive`) VALUES
(1, 'admin', '$argon2i$v=19$m=65536,t=4,p=1$ULbKU3e7vlotzllU9QrcBQ$kqoxPn8zry5YaTuRy/OTVKIN9fjyLkaCEBdpdwqypLg', NULL, 'bogi@mitfozzek.hu', 0),
(6, 'test', '$argon2i$v=19$m=65536,t=4,p=1$JP98F+q5QWmkXKNW256/iA$Hic/raSgS7roLldU/Kw07lRWonwajdjWTdpVxjrS100', ' Hello Világ, ez itt a bemutatkozó szövegem! Itt vagyok!', 'test1@test.hu', 0),
(7, 'sanyi', '$argon2i$v=19$m=65536,t=4,p=1$AuIhlb14FAU3hI0s3V1lJQ$nLoIV/1gF8sbqkaHbtK8CI0AnUEzp+qOw42y9d6kJUM', NULL, 'sanyi@email.hu', 0),
(8, 'postman', '$argon2i$v=19$m=65536,t=4,p=1$hG0jM+FXvHyF313JKTzX9w$/Qatx0i03ATW+3D5QJTt5NqbvrrvsHHh5gX6Dn2nR4c', NULL, 'post@man.com', 0),
(10, 'bogi', '$argon2i$v=19$m=65536,t=4,p=1$mFypDNnTCX/1x5Y5JLegyg$qf5cve1DpuJGFom4IXcAqQ9pYdrC2kV8TjmPS36pP90', NULL, 'bogi@bogi.com', 0),
(103, 'hello', '$argon2i$v=19$m=65536,t=4,p=1$lIH7rW0e81nEwqtMM/e9jw$w+U7ChhNDEbAv76gK3gw8iHBvlqPyjp5eTahVdx8YtI', NULL, 'hello@hello.com', 0),
(335, 'envagyok', '$argon2id$v=19$m=65536,t=4,p=1$VS6EBeZma/hvgyGya6Segg$3IIjVh8sGujGfYQljCBYxi72uzoSI8H0AHdKZecyVzc', NULL, 'en@vagyok.en', 0),
(336, 'bogibogi', '$argon2id$v=19$m=65536,t=4,p=1$N7l/p+YybJ4/pfcEoFLlyQ$W16FAMmrRgVfn581k82zqh6kpLL02EOTKoLUOSaDwGE', 'Helló Világ, ez itt a bemutatkozó szövegem!', 'bogi@bogi1.com', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_diet_category`
--

CREATE TABLE `user_diet_category` (
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user_diet_category`
--

INSERT INTO `user_diet_category` (`user_id`, `category_id`) VALUES
(6, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_fav_recipes`
--

CREATE TABLE `user_fav_recipes` (
  `user_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user_fav_recipes`
--

INSERT INTO `user_fav_recipes` (`user_id`, `recipe_id`) VALUES
(1, 2),
(1, 5);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `con_recipe_cuisine`
--
ALTER TABLE `con_recipe_cuisine`
  ADD PRIMARY KEY (`recipe_id`,`cuisine_id`),
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `cuisine_id` (`cuisine_id`) USING BTREE;

--
-- A tábla indexei `con_recipe_diet_category`
--
ALTER TABLE `con_recipe_diet_category`
  ADD PRIMARY KEY (`recipe_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- A tábla indexei `con_recipe_dish_type`
--
ALTER TABLE `con_recipe_dish_type`
  ADD PRIMARY KEY (`recipe_id`,`dishtype_id`),
  ADD KEY `dishtype` (`dishtype_id`);

--
-- A tábla indexei `con_recipe_ingredients`
--
ALTER TABLE `con_recipe_ingredients`
  ADD PRIMARY KEY (`recipe_id`,`ingredient_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- A tábla indexei `con_shopping_ingredients`
--
ALTER TABLE `con_shopping_ingredients`
  ADD PRIMARY KEY (`shopping_id`,`ingredient_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- A tábla indexei `con_user_pantry`
--
ALTER TABLE `con_user_pantry`
  ADD PRIMARY KEY (`user_id`,`pantry_id`),
  ADD KEY `pantry_id` (`pantry_id`);

--
-- A tábla indexei `con_user_shopping`
--
ALTER TABLE `con_user_shopping`
  ADD PRIMARY KEY (`user_id`,`shopping_id`),
  ADD KEY `shopping_id` (`shopping_id`);

--
-- A tábla indexei `diet_category`
--
ALTER TABLE `diet_category`
  ADD PRIMARY KEY (`category_id`);

--
-- A tábla indexei `dish_cuisine`
--
ALTER TABLE `dish_cuisine`
  ADD PRIMARY KEY (`cuisine_id`);

--
-- A tábla indexei `dish_type`
--
ALTER TABLE `dish_type`
  ADD PRIMARY KEY (`dishtype_id`);

--
-- A tábla indexei `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`ingredient_id`);

--
-- A tábla indexei `pantry`
--
ALTER TABLE `pantry`
  ADD PRIMARY KEY (`pantry_item_id`),
  ADD KEY `ingredient_id` (`ingredient_id`),
  ADD KEY `pantry_id` (`pantry_id`);

--
-- A tábla indexei `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipe_id`),
  ADD KEY `source_user_id` (`source_user_id`);

--
-- A tábla indexei `recipe_status`
--
ALTER TABLE `recipe_status`
  ADD PRIMARY KEY (`status_id`),
  ADD KEY `con_recipe_status_ibfk_1` (`recipe_id`);

--
-- A tábla indexei `shopping`
--
ALTER TABLE `shopping`
  ADD PRIMARY KEY (`shopping_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- A tábla indexei `user_diet_category`
--
ALTER TABLE `user_diet_category`
  ADD PRIMARY KEY (`user_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- A tábla indexei `user_fav_recipes`
--
ALTER TABLE `user_fav_recipes`
  ADD PRIMARY KEY (`user_id`,`recipe_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `diet_category`
--
ALTER TABLE `diet_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `dish_cuisine`
--
ALTER TABLE `dish_cuisine`
  MODIFY `cuisine_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `dish_type`
--
ALTER TABLE `dish_type`
  MODIFY `dishtype_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1457;

--
-- AUTO_INCREMENT a táblához `pantry`
--
ALTER TABLE `pantry`
  MODIFY `pantry_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT a táblához `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT a táblához `recipe_status`
--
ALTER TABLE `recipe_status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `shopping`
--
ALTER TABLE `shopping`
  MODIFY `shopping_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=337;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `con_recipe_cuisine`
--
ALTER TABLE `con_recipe_cuisine`
  ADD CONSTRAINT `cuisine` FOREIGN KEY (`cuisine_id`) REFERENCES `dish_cuisine` (`cuisine_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `con_recipe_diet_category`
--
ALTER TABLE `con_recipe_diet_category`
  ADD CONSTRAINT `category` FOREIGN KEY (`category_id`) REFERENCES `diet_category` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `con_recipe_diet_category_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `con_recipe_dish_type`
--
ALTER TABLE `con_recipe_dish_type`
  ADD CONSTRAINT `con_recipe_dish_type_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `dishtype` FOREIGN KEY (`dishtype_id`) REFERENCES `dish_type` (`dishtype_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `con_recipe_ingredients`
--
ALTER TABLE `con_recipe_ingredients`
  ADD CONSTRAINT `con_recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `con_recipe_ingredients_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `con_recipe_ingredients_ibfk_3` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`),
  ADD CONSTRAINT `con_recipe_ingredients_ibfk_4` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`);

--
-- Megkötések a táblához `con_shopping_ingredients`
--
ALTER TABLE `con_shopping_ingredients`
  ADD CONSTRAINT `con_shopping_ingredients_ibfk_1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `con_shopping_ingredients_ibfk_2` FOREIGN KEY (`shopping_id`) REFERENCES `shopping` (`shopping_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `con_shopping_ingredients_ibfk_3` FOREIGN KEY (`shopping_id`) REFERENCES `shopping` (`shopping_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `con_user_pantry`
--
ALTER TABLE `con_user_pantry`
  ADD CONSTRAINT `con_user_pantry_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Megkötések a táblához `con_user_shopping`
--
ALTER TABLE `con_user_shopping`
  ADD CONSTRAINT `con_user_shopping_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `con_user_shopping_ibfk_2` FOREIGN KEY (`shopping_id`) REFERENCES `shopping` (`shopping_id`);

--
-- Megkötések a táblához `pantry`
--
ALTER TABLE `pantry`
  ADD CONSTRAINT `ingredient_id` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `pantry_ibfk_1` FOREIGN KEY (`pantry_id`) REFERENCES `con_user_pantry` (`pantry_id`);

--
-- Megkötések a táblához `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_3` FOREIGN KEY (`source_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `recipe_status`
--
ALTER TABLE `recipe_status`
  ADD CONSTRAINT `recipe_status_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `shopping`
--
ALTER TABLE `shopping`
  ADD CONSTRAINT `shopping_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`);

--
-- Megkötések a táblához `user_diet_category`
--
ALTER TABLE `user_diet_category`
  ADD CONSTRAINT `user_diet_category_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `diet_category` (`category_id`),
  ADD CONSTRAINT `user_diet_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `diet_category` (`category_id`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Megkötések a táblához `user_fav_recipes`
--
ALTER TABLE `user_fav_recipes`
  ADD CONSTRAINT `user_fav_recipes_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`),
  ADD CONSTRAINT `user_fav_recipes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
