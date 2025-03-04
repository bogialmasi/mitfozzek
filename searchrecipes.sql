-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 04. 17:57
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.0.28

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
-- Tábla szerkezet ehhez a táblához `con_recipe_category`
--

CREATE TABLE `con_recipe_category` (
  `recipe_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `con_recipe_category`
--

INSERT INTO `con_recipe_category` (`recipe_id`, `category_id`) VALUES
(2, 5),
(3, 1),
(3, 7);

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
(2, 14);

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
(3, 5),
(3, 7);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `con_recipe_ingredients`
--

CREATE TABLE `con_recipe_ingredients` (
  `recipe_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `ingredient_quantity` int(11) NOT NULL,
  `measurement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `con_recipe_ingredients`
--

INSERT INTO `con_recipe_ingredients` (`recipe_id`, `ingredient_id`, `ingredient_quantity`, `measurement_id`) VALUES
(2, 1, 1000, 1),
(2, 2, 2, 5),
(3, 1, 500, 1),
(3, 231, 250, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `con_shopping_ingredients`
--

CREATE TABLE `con_shopping_ingredients` (
  `shopping_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `ingredient_quantity` int(11) NOT NULL,
  `measurement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `con_shopping_ingredients`
--

INSERT INTO `con_shopping_ingredients` (`shopping_id`, `ingredient_id`, `ingredient_quantity`, `measurement_id`) VALUES
(6, 1, 1000, 1),
(6, 2, 2, 5),
(7, 30, 2, 1),
(7, 500, 3, 2),
(10, 30, 2, 1),
(10, 500, 3, 2);

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
(2, 2),
(5, 5),
(6, 6),
(7, 7),
(8, 8);

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
(6, 6),
(6, 7),
(6, 10);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `dish_category`
--

CREATE TABLE `dish_category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `dish_category`
--

INSERT INTO `dish_category` (`category_id`, `category_name`) VALUES
(1, 'Vegán'),
(2, 'Vegetariánus'),
(3, 'Kóser'),
(4, 'Halal'),
(5, 'Laktózmentes'),
(6, 'Gluténmentes'),
(7, 'Diabetikus'),
(8, 'FODMAP Diéta');

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
(1, 'Hors d\'oeuvre'),
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
  `ingredient_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ingredients`
--

INSERT INTO `ingredients` (`ingredient_id`, `ingredient_name`) VALUES
(1, 'Alma'),
(2, 'Ananász'),
(3, 'Avokádó'),
(4, 'Amarántliszt'),
(5, 'Aszatgyanta'),
(6, 'Aszalt gyümölcsök'),
(7, 'Agar agar'),
(8, 'Articsóka'),
(9, 'Ajvár'),
(10, 'Amur'),
(11, 'Alaplé'),
(12, 'Amarettó'),
(13, 'Almaecet'),
(14, 'Aszalt szilva'),
(15, 'Aszalt sárgabarack'),
(16, 'Apró uborka'),
(17, 'Almalé'),
(18, 'Ananászkonzerv'),
(19, 'Aludttej'),
(20, 'Akácméz'),
(21, 'Aszkorbinsav'),
(22, 'Ananászlé'),
(23, 'Almapaprika'),
(24, 'Almapüré'),
(25, 'Afrikai harcsa'),
(26, 'Angolszalonna'),
(27, 'Arab hétfűszerkeverék'),
(28, 'Akácvirág'),
(29, 'Almakompót'),
(30, 'Agávé szirup'),
(31, 'Aszalt áfonya'),
(32, 'Aquafaba'),
(33, 'Áfonya'),
(34, 'Ázsiai tészta'),
(35, 'Ánizs'),
(36, 'Áfonyadzsem'),
(37, 'Ásványvíz'),
(38, 'Árpapehely'),
(39, 'Ánizsolaj'),
(40, 'Árpaliszt'),
(41, 'Árvácska'),
(42, 'Áfonyalevél'),
(43, 'Bazsalikom'),
(44, 'Burgonya'),
(45, 'Bors'),
(46, 'Banán'),
(47, 'Borjúhús'),
(48, 'Bárányhús'),
(49, 'Bacon'),
(50, 'Balzsamecet'),
(51, 'Brokkoli'),
(52, 'Babérlevél'),
(53, 'Bodzavirág'),
(54, 'Borsikafű'),
(55, 'Borkősav'),
(56, 'Búzadara'),
(57, 'Bokorbab'),
(58, 'Borókabogyó'),
(59, 'Bambuszrügy'),
(60, 'Birsalma'),
(61, 'Burgonyapehely'),
(62, 'Busa'),
(63, 'Barna cukor'),
(64, 'Brazil dió - Paradió'),
(65, 'Bulgur'),
(66, 'Búzakorpa'),
(67, 'Babapiskóta'),
(68, 'Borkén'),
(69, 'Barna sör'),
(70, 'Barackbefőtt'),
(71, 'Befőzőcukor'),
(72, 'Báránygerinc'),
(73, 'Borjúcomb'),
(74, 'Borjúlábszár'),
(75, 'Borjúkaraj'),
(76, 'Bébirépa'),
(77, 'Borsmentalevél'),
(78, 'Bagett'),
(79, 'Basmati rizs'),
(80, 'Bébikukorica'),
(81, 'Barackkonzerv'),
(82, 'Barnarizs'),
(83, 'Burgonyapüré'),
(84, 'Bolognai alap'),
(85, 'Búzacsíra'),
(86, 'Bárányborda'),
(87, 'Báránykaraj'),
(88, 'Barbecue szósz'),
(89, 'Barna rum'),
(90, 'Bolognai szósz'),
(91, 'Brandy'),
(92, 'Burgonyakeményítő'),
(93, 'Bodzabogyó'),
(94, 'Bébipulyka'),
(95, 'Birsalmasajt'),
(96, 'Borjúmáj'),
(97, 'Befőtt tartósító'),
(98, 'Barna mártás'),
(99, 'Borjúbríz'),
(100, 'babpüré'),
(101, 'Baileys'),
(102, 'Biryani masala'),
(103, 'Brie sajt'),
(104, 'Búzafű'),
(105, 'Baobab por'),
(106, 'Bagel'),
(107, 'Bejgli'),
(108, 'Báránycsülök'),
(109, 'Barnarizsliszt'),
(110, 'Barna mártás por'),
(111, 'Borslevél'),
(112, 'Bébispenót'),
(113, 'Burgonyachips'),
(114, 'Burrata'),
(115, 'Borbolya'),
(116, 'Bottarga'),
(117, 'Citrom'),
(118, 'Cukkini'),
(119, 'Cukor'),
(120, 'Crème fraîche'),
(121, 'Cékla'),
(122, 'Citromfű'),
(123, 'Curry por'),
(124, 'Cukorborsó'),
(125, 'Chili'),
(126, 'Cointreau'),
(127, 'Cayenne paprika'),
(128, 'Curry levél'),
(129, 'Cikória'),
(130, 'Chorizo'),
(131, 'Cannelloni'),
(132, 'Citrombors'),
(133, 'Curry paszta'),
(134, 'Calvados'),
(135, 'Camembert sajt'),
(136, 'Chayote'),
(137, 'Citromlé'),
(138, 'Cukrozatlan kakaópor'),
(139, 'Citromhéj'),
(140, 'Chiliszósz'),
(141, 'Cérnametélt'),
(142, 'Citromlekvár'),
(143, 'Cheddar sajt'),
(144, 'Chilipehely'),
(145, 'Cottage cheese'),
(146, 'Citrom aroma'),
(147, 'Chiliolaj'),
(148, 'Cukorfondant'),
(149, 'Chilipaszta'),
(150, 'Curacao szirup'),
(151, 'Cukormentes csokoládé'),
(152, 'Campari'),
(153, 'Cukormáz'),
(154, 'Cukormentes dzsem'),
(155, 'Cukormentes lekvár'),
(156, 'Citromsav'),
(157, 'Citruspor'),
(158, 'Cukorgyöngy'),
(159, 'Citrompótló'),
(160, 'Céklalé'),
(161, 'Cukkinivirág'),
(162, 'Chiamag'),
(163, 'Cider'),
(164, 'Cappuccino por'),
(165, 'Cukormentes befőzőcukor'),
(166, 'Cukormentes fagylalt'),
(167, 'Chutney'),
(168, 'Cukorszirup'),
(169, 'Chilis kukorica konzerv'),
(170, 'Cigánymeggy'),
(171, 'Carbonara alap'),
(172, 'Céklapor'),
(173, 'churut (hurut)'),
(174, 'Csokoládé'),
(175, 'Csirke'),
(176, 'Csicseriborsó'),
(177, 'Csalán'),
(178, 'Cseresznye'),
(179, 'Csemegekukorica'),
(180, 'Csirkemáj'),
(181, 'Csuka'),
(182, 'Csírák'),
(183, 'Csillaggyümölcs'),
(184, 'Csipkebogyó'),
(185, 'Csicsóka'),
(186, 'Csiperkegomba'),
(187, 'Csemegeuborka'),
(188, 'Csillagánizs'),
(189, 'Csípős fűszerpaprika'),
(190, 'Csirke alaplé'),
(191, 'Csípős kolbász'),
(192, 'Csirkemell (csontos)'),
(193, 'Csirkecomb'),
(194, 'Csirkeszárny'),
(195, 'Csirke alsócomb'),
(196, 'Csirkemellsonka'),
(197, 'Csirke felsőcomb'),
(198, 'Csirkenyak'),
(199, 'Csirkeszív'),
(200, 'Csokoládés pudingpor'),
(201, 'Csirke fűszersó'),
(202, 'Csirkefarhát'),
(203, 'Csontos sertéskaraj'),
(204, 'Csirkezúza'),
(205, 'Csuszatészta'),
(206, 'Csipkebogyó lekvár'),
(207, 'Csokoládé aroma'),
(208, 'Cseresznyedzsem'),
(209, 'Csicseriborsóliszt'),
(210, 'Csigatészta'),
(211, 'Cseresznyelekvár'),
(212, 'Cseresznyebefőtt'),
(213, 'Cseresznyepaprika'),
(214, 'Cseresznyepaprika krém'),
(215, 'Csokoládédara'),
(216, 'Csokoládéforgács'),
(217, 'Csokoládés puding'),
(218, 'Csokiszósz'),
(219, 'Csontlé'),
(220, 'Csípős paprikakrém'),
(221, 'Csirkemellfilé'),
(222, 'Csöves kukorica'),
(223, 'Csokoládé fagylalt'),
(224, 'Csirkeláb'),
(225, 'Császárkörte aroma'),
(226, 'Császárszalonna'),
(227, 'Csirkeaprólék'),
(228, 'Csokoládés gabonagolyó'),
(229, 'Csicseriborsó (konzerv)'),
(230, 'Csirkebőr'),
(231, 'Dió'),
(232, 'Dashi'),
(233, 'Datolya'),
(234, 'Dupla tejszín'),
(235, 'Darált marhahús'),
(236, 'Darált pulykahús'),
(237, 'Datolyaszilva'),
(238, 'Dijoni mustár'),
(239, 'Darált sertéshús'),
(240, 'Disznózsír'),
(241, 'Dióolaj'),
(242, 'Debreceni kolbász'),
(243, 'Diótej'),
(244, 'Dekorgyöngy'),
(245, 'Diabetikus liszt'),
(246, 'Diákcsemege'),
(247, 'Digestive keksz'),
(248, 'Desszertbor'),
(249, 'Durumliszt'),
(250, 'Disznósajt'),
(251, 'Datolyacukor'),
(252, 'Daramix (szénhidrátcsökkentett)'),
(253, 'Dzsemfix'),
(254, 'Eper'),
(255, 'Ecet'),
(256, 'Egres'),
(257, 'Erdei gyümölcs mix'),
(258, 'Epres pudingpor'),
(259, 'Edami sajt'),
(260, 'Ementáli sajt'),
(261, 'Ecetes gyöngyhagyma'),
(262, 'Ecetes cékla'),
(263, 'Erdei gyümölcslekvár'),
(264, 'Eperlevél tészta'),
(265, 'Erdélyi szalonna'),
(266, 'Ecetes torma'),
(267, 'Eperdzsem'),
(268, 'Eperkonzerv'),
(269, 'Ezersziget öntet'),
(270, 'Eperlé'),
(271, 'Eperlekvár'),
(272, 'Eperszörp'),
(273, 'Epres puding'),
(274, 'Erythritol'),
(275, 'Ecetes almapaprika'),
(276, 'Édesburgonya'),
(277, 'Édeskömény'),
(278, 'Édesköménymag'),
(279, 'Élesztő'),
(280, 'Étkezési keményítő'),
(281, 'Ételízesítő'),
(282, 'Ételfesték'),
(283, 'Éticsiga'),
(284, 'Édesítőszer'),
(285, 'Édes fehérbor'),
(286, 'Édes vörösbor'),
(287, 'Édes rosé'),
(288, 'Étcsokoládé'),
(289, 'Édes-savanyú mártás'),
(290, 'Élesztőpehely'),
(291, 'Édesgyökér'),
(292, 'Fokhagyma'),
(293, 'Földimogyoró'),
(294, 'Fejessaláta'),
(295, 'Finomliszt'),
(296, 'Fehérrépa'),
(297, 'Fahéj'),
(298, 'Fenyőmag'),
(299, 'Fűszerpaprika'),
(300, 'Fekete burgonya'),
(301, 'Fehérborecet'),
(302, 'Feta sajt'),
(303, 'Fehér spárga'),
(304, 'Fejtett bab'),
(305, 'Füge'),
(306, 'Feketegyökér'),
(307, 'Fekete retek'),
(308, 'Feketekömény'),
(309, 'Feketeribizli'),
(310, 'Füstölt szalonna'),
(311, 'Fehérbor'),
(312, 'Fodros kel'),
(313, 'Felesborsó'),
(314, 'Fenyérfű'),
(315, 'Fürjtojás'),
(316, 'Fehér hagyma'),
(317, 'Fekete üröm'),
(318, 'Füstölt hal'),
(319, 'Felvágott'),
(320, 'Fűszersó'),
(321, 'Füstölt pirospaprika'),
(322, 'Fehér csokoládé'),
(323, 'Fromage frais'),
(324, 'Fehér bors'),
(325, 'Feketekávé'),
(326, 'Feketekagyló'),
(327, 'Fehérbab'),
(328, 'Fekete olajbogyó'),
(329, 'Friss élesztő'),
(330, 'Főzőtejszín'),
(331, 'Farfalle'),
(332, 'Fahéjrúd'),
(333, 'Fekete bors'),
(334, 'Finomítatlan nádcukor'),
(335, 'Főtt tojás'),
(336, 'Fehér balzsamecet'),
(337, 'Fehérpecsenye'),
(338, 'Főzőkolbász'),
(339, 'Fokhagymakrém'),
(340, 'Földimogyoró olaj'),
(341, 'Feketeerdő sonka'),
(342, 'Fajita fűszerkeverék'),
(343, 'Fokhagyma szósz'),
(344, 'Feketeribizli szörp'),
(345, 'Fusilli tészta'),
(346, 'Füstölt sajt'),
(347, 'Fagylaltpor'),
(348, 'Fehér mustármag'),
(349, 'Fasírt fűszerkeverék'),
(350, 'Fehér tortabevonó'),
(351, 'Félédes vörösbor'),
(352, 'Fekete tea'),
(353, 'Félédes rosé'),
(354, 'Félszáraz vörösbor'),
(355, 'Félszáraz rosé'),
(356, 'Fehér rum'),
(357, 'Fehér tortadara'),
(358, 'Fehérjepor'),
(359, 'Fejtett lóbab'),
(360, 'Fekete áfonya'),
(361, 'Fekete kardamom'),
(362, 'Feketeribizli lekvár'),
(363, 'Félszáraz fehérbor'),
(364, 'Flekken fűszerkeverék'),
(365, 'Frankfurti virsli'),
(366, 'Füstölt virsli'),
(367, 'Fokhagymapor'),
(368, 'Folyékony édesítőszer'),
(369, 'Forrócsoki por'),
(370, 'Foszfátmentes sütőpor'),
(371, 'Főzőhagyma'),
(372, 'Franciadrazsé'),
(373, 'Franciasaláta alap'),
(374, 'Fügelekvár'),
(375, 'Fügemustár'),
(376, 'Füstölthús kocka'),
(377, 'Fűszervaj'),
(378, 'Folyami rák'),
(379, 'Fogas'),
(380, 'Fácánhús'),
(381, 'Fokhagymabors'),
(382, 'Fafülgomba'),
(383, 'Fagomba'),
(384, 'Fenyőtinoru'),
(385, 'Főtt sonka'),
(386, 'füstölt-főtt tarja'),
(387, 'Feketebabszósz'),
(388, 'Fenyőcsúcs'),
(389, 'Füstölt lapocka'),
(390, 'Füstölt tarja'),
(391, 'Füstölt oldalas'),
(392, 'Füstölt sertéscsülök'),
(393, 'Füstölt lazac'),
(394, 'Füstölt libamell'),
(395, 'Fürj'),
(396, 'Főzőbanán'),
(397, 'Friss tészta'),
(398, 'Fánk'),
(399, 'Fűszerpaprikamag-olaj'),
(400, 'Fekete berkenye'),
(401, 'Feketebab'),
(402, 'Fekete fokhagyma'),
(403, 'Fűszerkeverék'),
(404, 'Gomba'),
(405, 'Grépfrút'),
(406, 'Gránátalma'),
(407, 'Gesztenye'),
(408, 'Gruyére sajt'),
(409, 'Garnéla'),
(410, 'Garam masala'),
(411, 'Görögdinnye'),
(412, 'Gnocchi'),
(413, 'Gomolya sajt'),
(414, 'Graham-liszt'),
(415, 'Ghee'),
(416, 'Gersli'),
(417, 'Gluténmentes lisztkeverék'),
(418, 'Grana Padano'),
(419, 'Görög joghurt'),
(420, 'Gesztenyemassza'),
(421, 'Gépsonka'),
(422, 'Gorgonzola'),
(423, 'Gomolyatúró'),
(424, 'Görög fűszerkeverék'),
(425, 'Görögszéna'),
(426, 'Grand Marnier'),
(427, 'Galambmáj'),
(428, 'Gránátalma szirup'),
(429, 'Görög mazsola'),
(430, 'Görögsaláta fűszerkeverék'),
(431, 'Gumicukor'),
(432, 'Galangal'),
(433, 'Galagonya'),
(434, 'Gluténmentes gríz'),
(435, 'GM babapiskóta'),
(436, 'Gluténmentes sütőpor'),
(437, 'Galambgomba'),
(438, 'Galamb'),
(439, 'Gesztenyeliszt'),
(440, 'Gin'),
(441, 'Gulyáskrém'),
(442, 'Golden szirup'),
(443, 'Gombakonzerv'),
(444, 'Grépfrútlé'),
(445, 'Glutén'),
(446, 'Gesztenyekrém'),
(447, 'Goji bogyó'),
(448, 'Gabonakávé'),
(449, 'Gombásmártás-alap'),
(450, 'Gluténmentes tészta'),
(451, 'Gyömbér'),
(452, 'Gyümölcscukor'),
(453, 'Gyros fűszerkeverék'),
(454, 'Gyöngyhagyma'),
(455, 'Gyömbérpor'),
(456, 'Gyors rizs'),
(457, 'Gyulai kolbász'),
(458, 'Gyufatészta'),
(459, 'Gyömbéres keksz'),
(460, 'Gyümölcslé'),
(461, 'Gyöngybab'),
(462, 'Gyömbér üdítő'),
(463, 'Gyömbérsör'),
(464, 'Gyümölcsjoghurt'),
(465, 'Gyümölcstea'),
(466, 'Gyümölcskonzervlé'),
(467, 'Gyöngytyúk'),
(468, 'Gyümölcskocsonya por'),
(469, 'Gyümölcsízű italpor'),
(470, 'Gyümölcsös dresszing'),
(471, 'Gyoza'),
(472, 'Halványító zeller'),
(473, 'Hajdina'),
(474, 'Hokkaido tök'),
(475, 'Heck'),
(476, 'Háztartási keksz'),
(477, 'Habfixáló'),
(478, 'Halloumi sajt'),
(479, 'Haltej/halikra'),
(480, 'Hal'),
(481, 'Halszósz'),
(482, 'Hajdinaliszt'),
(483, 'Habtejszín'),
(484, 'Hamburger zsemle'),
(485, 'Hot-dog kifli'),
(486, 'Hosszúmetélt'),
(487, 'Habcsók'),
(488, 'Harissa paszta'),
(489, 'Himalája só'),
(490, 'Hegyes erős paprika'),
(491, 'Halgerinc'),
(492, 'Halászlékocka'),
(493, 'Hering (konzerv)'),
(494, 'Homár'),
(495, 'Hal alaplé'),
(496, 'Halolaj'),
(497, 'Hal fűszerkeverék'),
(498, 'Hamburgerhús'),
(499, 'Hasábburgonya'),
(500, 'Hoisin-szósz'),
(501, 'Hulala Cucina főzőkrém'),
(502, 'Halrudacska'),
(503, 'Hollandi mártás'),
(504, 'Hummusz'),
(505, 'Izsóp'),
(506, 'Istengyalulta tök'),
(507, 'Instant élesztő'),
(508, 'Instant kávé'),
(509, 'Instant kakaópor'),
(510, 'Instant pótkávé'),
(511, 'India szószos bab'),
(512, 'Ibolya'),
(513, 'Író'),
(514, 'Ízesített gabonapehely'),
(515, 'Joghurt'),
(516, 'Jalapeño'),
(517, 'Juharszirup'),
(518, 'Juhtúró'),
(519, 'Juhsajt'),
(520, 'Jégcukor'),
(521, 'Jégsaláta'),
(522, 'Jázmin rizs'),
(523, 'Juhbeles virsli'),
(524, 'Joghurtos salátaöntet'),
(525, 'Japánszilva'),
(526, 'Jégkocka'),
(527, 'Juhkefir'),
(528, 'Jégcsapretek'),
(529, 'Juhhús'),
(530, 'Jackfruit'),
(531, 'jégkrém'),
(532, 'Körte'),
(533, 'Kakaó'),
(534, 'Kakukkfű'),
(535, 'Kávé'),
(536, 'Kesudió'),
(537, 'Kapor'),
(538, 'Karfiol'),
(539, 'Koktélrák'),
(540, 'Kuszkusz'),
(541, 'Kecskesajt'),
(542, 'Közönséges tök'),
(543, 'Kapribogyó'),
(544, 'Kacsahús'),
(545, 'Kacsamáj'),
(546, 'Konyak'),
(547, 'Kivi'),
(548, 'Koriander'),
(549, 'Kaviár'),
(550, 'Kucsmagomba'),
(551, 'Kínai kel'),
(552, 'Köménymag'),
(553, 'Köles'),
(554, 'Kagyló'),
(555, 'Kókusz'),
(556, 'Kurkuma'),
(557, 'Karalábé'),
(558, 'Kefir'),
(559, 'Káposzta'),
(560, 'Kelkáposzta'),
(561, 'Kardamom'),
(562, 'Kukoricaliszt'),
(563, 'Kukoricadara'),
(564, 'Kolbász'),
(565, 'Kókuszolaj'),
(566, 'Kifli'),
(567, 'Kelbimbó'),
(568, 'Kumquat'),
(569, 'Krinolin'),
(570, 'Kínai ötfűszer-keverék'),
(571, 'Kárász'),
(572, 'Ketchup'),
(573, 'Kétszersült'),
(574, 'Kenyér'),
(575, 'Keksz'),
(576, 'Kukoricapehely'),
(577, 'Kéksajt'),
(578, 'Kókusztej'),
(579, 'Krémsajt'),
(580, 'Kecskehús'),
(581, 'Kókuszzsír'),
(582, 'Kacsazsír'),
(583, 'Kígyóuborka'),
(584, 'Konzerv paradicsom'),
(585, 'Kacsamell'),
(586, 'Kókuszreszelék'),
(587, 'Kukoricakeményítő'),
(588, 'Kápia paprika'),
(589, 'Kacsa testháj'),
(590, 'Kékszőlő'),
(591, 'Kenyérliszt BL80'),
(592, 'Kekszmorzsa'),
(593, 'Kruton'),
(594, 'Kovászos uborka'),
(595, 'Kandírozott citromhéj'),
(596, 'Kovászosuborka-lé'),
(597, 'Kandírozott narancshéj'),
(598, 'Karamellás pudingpor'),
(599, 'Keserűmandula aroma'),
(600, 'Kenyérszalonna'),
(601, 'Kaukázusi kefir'),
(602, 'Kockacukor'),
(603, 'Kovász'),
(604, 'Krémtúró'),
(605, 'Kandírozott ananász'),
(606, 'Kenőmájas'),
(607, 'Knédli'),
(608, 'Kókuszos puding'),
(609, 'Kókuszos pudingpor'),
(610, 'Krokant'),
(611, 'Kanadai sütőtök'),
(612, 'Kendermag'),
(613, 'Koriandermag'),
(614, 'Kukoricaolaj'),
(615, 'Kökénylekvár'),
(616, 'Kókusztejpor'),
(617, 'Koktélcseresznye'),
(618, 'Körömvirág'),
(619, 'Körözött'),
(620, 'Koffeinmentes kávé'),
(621, 'Kacsacomb'),
(622, 'Kagylóhús'),
(623, 'Kagylótészta'),
(624, 'Kamillavirág'),
(625, 'Kanadai bacon'),
(626, 'Kandírozott citrom'),
(627, 'Kandírozott meggy'),
(628, 'Kandírozott papaja'),
(629, 'Kakas'),
(630, 'Kacsazúza'),
(631, 'Kifliburgonya'),
(632, 'Királyrák'),
(633, 'Karamellás puding'),
(634, 'Karamell öntet'),
(635, 'Kecskejoghurt'),
(636, 'Kínai tészta'),
(637, 'Kelkáposzta levél'),
(638, 'Kentucky fűszerkeverék'),
(639, 'Kínai rizsbor'),
(640, 'Kókuszvíz'),
(641, 'Kolbászhús'),
(642, 'Kökény'),
(643, 'Kolozsvári szalonna'),
(644, 'Kötözött sonka'),
(645, 'Kukoricaszirup'),
(646, 'Kurkumagyökér'),
(647, 'Keszeg'),
(648, 'Káposztalevél'),
(649, 'Kókuszchips'),
(650, 'Kávétejszín'),
(651, 'Kókuszkrém'),
(652, 'Kókuszliszt'),
(653, 'Kockasajt'),
(654, 'Kalács'),
(655, 'Koktélparadicsom'),
(656, 'Körtelé'),
(657, 'Kóla'),
(658, 'Karalábélevél'),
(659, 'Kínai zöldségkeverék'),
(660, 'Kókuszcukor'),
(661, 'Konzerv vagdalthús'),
(662, 'Kínai só'),
(663, 'Körtebefőtt'),
(664, 'Konyak aroma'),
(665, 'Kakaóvaj'),
(666, 'Karob por'),
(667, 'Kacsaaprólék'),
(668, 'Kamut liszt'),
(669, 'Kókusz aroma'),
(670, 'Konjac liszt'),
(671, 'Konzerv bab'),
(672, 'Kenguruhús'),
(673, 'Kakaóbab'),
(674, 'Kecsege'),
(675, 'Kefirgomba'),
(676, 'Kölesliszt'),
(677, 'Kristálygomba'),
(678, 'Konyakmeggy'),
(679, 'Kakaós pudingpor (szénhidrátcsökkentett)'),
(680, 'Kókusznektár szirup'),
(681, 'Komló'),
(682, 'Kankalin'),
(683, 'Kelt tészta'),
(684, 'Kékszőlőmagőrlemény'),
(685, 'Krémfehérsajt'),
(686, 'Kekszkrém'),
(687, 'Kimchi'),
(688, 'Lime'),
(689, 'Lazac'),
(690, 'Lencse'),
(691, 'Libahús'),
(692, 'Lilahagyma'),
(693, 'Lenmag'),
(694, 'Laskagomba'),
(695, 'Leveles tészta'),
(696, 'Levendulavirág'),
(697, 'Lestyán'),
(698, 'Leveskocka'),
(699, 'Lekvár/ dzsem'),
(700, 'Limoncello'),
(701, 'Libamáj'),
(702, 'Lasagne tészta'),
(703, 'Lapzselatin'),
(704, 'Libatepertő'),
(705, 'Libazsír'),
(706, 'Libamell'),
(707, 'Libaháj'),
(708, 'Lecsókolbász'),
(709, 'Lapkasajt'),
(710, 'Lenmagliszt'),
(711, 'Libacomb'),
(712, 'Lemon curd'),
(713, 'Laktózmentes túró'),
(714, 'Lecsó'),
(715, 'Levendula'),
(716, 'Lenmagcsíra'),
(717, 'Levesgyöngy'),
(718, 'Levendulaszirup'),
(719, 'Levescsont'),
(720, 'Löncshús'),
(721, 'Libamájpástétom'),
(722, 'Lenmagolaj'),
(723, 'Libaszív'),
(724, 'Lime héja'),
(725, 'Lime levél'),
(726, 'Lángolt kolbász'),
(727, 'Libanyak bőr'),
(728, 'Limelé'),
(729, 'Likőr'),
(730, 'Lecsópaprika'),
(731, 'Licsi'),
(732, 'Licsi konzerv'),
(733, 'Libaaprólék'),
(734, 'Lenmagpehely'),
(735, 'Lótuszgyökér'),
(736, 'Laktózmentes sajt'),
(737, 'Laktózmentes tej'),
(738, 'Lavash'),
(739, 'Menta'),
(740, 'Méz'),
(741, 'Mangó'),
(742, 'Mandula'),
(743, 'Marhahús'),
(744, 'Mák'),
(745, 'Mozzarella'),
(746, 'Mascarpone'),
(747, 'Mustár'),
(748, 'Marsala'),
(749, 'Makréla'),
(750, 'Mirin'),
(751, 'Meggy'),
(752, 'Miso'),
(753, 'Málna'),
(754, 'Makadámdió'),
(755, 'Medvehagyma'),
(756, 'Margarin'),
(757, 'Majonéz'),
(758, 'Mángold'),
(759, 'Majoranna'),
(760, 'Melaszos nádcukor'),
(761, 'Mazsola'),
(762, 'Mortadella'),
(763, 'Must'),
(764, 'Marcipán'),
(765, 'Mustármag'),
(766, 'Mogyoróvaj'),
(767, 'Madársaláta'),
(768, 'Mangalica hús'),
(769, 'Macesz'),
(770, 'Mézeskalács fűszerkeverék'),
(771, 'Müzli'),
(772, 'Mandarin'),
(773, 'Mincemeat'),
(774, 'Makaróni'),
(775, 'Málnaecet'),
(776, 'Mandulaliszt'),
(777, 'Matcha teapor'),
(778, 'Marharostélyos'),
(779, 'Mangalicasonka'),
(780, 'Marhabélszín'),
(781, 'Marhalapocka'),
(782, 'Marhalábszár'),
(783, 'Marhacomb'),
(784, 'Marhacsont'),
(785, 'Marhafartő'),
(786, 'Mangalica szalonna'),
(787, 'Marha velőscsont'),
(788, 'Mangalica zsír'),
(789, 'Mangalicaszűz'),
(790, 'Mandulaaroma'),
(791, 'Mandulapehely'),
(792, 'Majonézes torma'),
(793, 'Marinara szósz'),
(794, 'Medvehagyma pesto'),
(795, 'Milánói alappor'),
(796, 'Milánói szósz'),
(797, 'Mogyoróolaj'),
(798, 'Mungóbabcsíra'),
(799, 'Mexikói keverék'),
(800, 'Málnalekvár'),
(801, 'Málnadzsem'),
(802, 'Mandulatej'),
(803, 'Marinált feta'),
(804, 'Marinált paprika'),
(805, 'Mahi mahi filé'),
(806, 'Májgombóc'),
(807, 'Májkrém'),
(808, 'Málnaszörp'),
(809, 'Mangalicatarja'),
(810, 'Maracuja'),
(811, 'Marha alaplé'),
(812, 'Marha hátszín'),
(813, 'Marhafarok'),
(814, 'Márna'),
(815, 'Martini Bianco'),
(816, 'Martini Rosso'),
(817, 'Meggybefőtt'),
(818, 'Mentaszirup'),
(819, 'Marhamáj'),
(820, 'Meggylé'),
(821, 'Melegszendvicskrém'),
(822, 'Mexikói alap'),
(823, 'Mézes puszedli'),
(824, 'Mézkaramell'),
(825, 'Mogyorós puding'),
(826, 'Müzli mix'),
(827, 'Magyaros fűszerkeverék'),
(828, 'Madras curry'),
(829, 'Meggyfa levél'),
(830, 'Muflon'),
(831, 'Marhavelő'),
(832, 'Meggylekvár'),
(833, 'Meggydzsem'),
(834, 'Marhafelsál'),
(835, 'Májusi pereszke'),
(836, 'Mezei cickafark'),
(837, 'Májas hurka'),
(838, 'Metélőhagyma'),
(839, 'Marhanyelv'),
(840, 'Mungóbab'),
(841, 'Mojo szósz'),
(842, 'Maláj aszaltszilva mártás'),
(843, 'Marhanyak'),
(844, 'Mangó chutney'),
(845, 'Melasz'),
(846, 'Mézes tortalap'),
(847, 'Mákliszt'),
(848, 'Mandulavaj'),
(849, 'Marmite'),
(850, 'Macskagyökér'),
(851, 'Mexicana szószos bab'),
(852, 'Marinált hering (mustáros)'),
(853, 'Mogyorókrémmel töltött bonbon'),
(854, 'Marhafaggyú'),
(855, 'Manióka'),
(856, 'Mexicói fűszerkeverék'),
(857, 'Narancs'),
(858, 'Növényi tejszín'),
(859, 'Napraforgómag'),
(860, 'Nádcukor'),
(861, 'Napraforgó olaj'),
(862, 'Nektarin'),
(863, 'Növényi tej'),
(864, 'Növényi habtejszín'),
(865, 'Nutella'),
(866, 'Növényi joghurt'),
(867, 'Nashi körte - Japán körte'),
(868, 'Narancslekvár'),
(869, 'Naspolya'),
(870, 'Narancs eszencia'),
(871, 'Narancsvirágvíz'),
(872, 'Narancsdzsem'),
(873, 'Nápolyi'),
(874, 'Narancslé'),
(875, 'Narancsszörp'),
(876, 'Nugátmassza'),
(877, 'Narancsaroma'),
(878, 'Narancshéj'),
(879, 'Narancsvirág aroma'),
(880, 'Négyszínű bors'),
(881, 'Némakacsa'),
(882, 'Némakacsa melle'),
(883, 'Nátrium-benzoát'),
(884, 'Négercsók'),
(885, 'Nori lap'),
(886, 'Növényi tejföl'),
(887, 'Natúr gabonapehely'),
(888, 'Növényi sajt'),
(889, 'NoCarb Noodle'),
(890, 'Nyelvhal'),
(891, 'Nyúlhús'),
(892, 'Nyúlcomb'),
(893, 'Nyúlmáj'),
(894, 'Nyírfacukor'),
(895, 'Nyílgyökér liszt'),
(896, 'Olajbogyó'),
(897, 'Olívaolaj'),
(898, 'Oregánó'),
(899, 'Okra'),
(900, 'Osztrigaszósz'),
(901, 'Ostya'),
(902, 'Osztriga'),
(903, 'Ostyalap'),
(904, 'Olajos hal'),
(905, 'Orecchiette tészta'),
(906, 'Olasz fűszerkeverék'),
(907, 'Orda'),
(908, 'Omlós tészta'),
(909, 'Oreo keksz'),
(910, 'Orgonavirág'),
(911, 'Ottoman'),
(912, 'Orzo'),
(913, 'Oroblanco'),
(914, 'Ördöghal'),
(915, 'Öregtészta'),
(916, 'Őszibarack'),
(917, 'Őzhús'),
(918, 'Őszibaracklekvár'),
(919, 'Őszibarackdzsem'),
(920, 'Őrölt kávé'),
(921, 'Őrölt fűszerkömény'),
(922, 'Őszibarack konzerv'),
(923, 'Őzgerinc'),
(924, 'Őzcomb'),
(925, 'Paradicsom'),
(926, 'Petrezselyem'),
(927, 'Parmezán sajt'),
(928, 'Prosciutto'),
(929, 'Póréhagyma'),
(930, 'Padlizsán'),
(931, 'Ponty'),
(932, 'Pulykahús'),
(933, 'Pesto'),
(934, 'Piros ribizli'),
(935, 'Pancetta'),
(936, 'Pitypang'),
(937, 'Pita'),
(938, 'Paprika'),
(939, 'Pisztácia'),
(940, 'Polip'),
(941, 'Pulykamáj'),
(942, 'Pezsgő'),
(943, 'Pomelo'),
(944, 'Pacal'),
(945, 'Pisztráng'),
(946, 'Papaja'),
(947, 'Pangasius'),
(948, 'Provence-i fűszerkeverék'),
(949, 'Pillecukor'),
(950, 'Pasztinák'),
(951, 'Patisszon'),
(952, 'Puffasztott rizs'),
(953, 'Pudingpor'),
(954, 'Paprikakrém'),
(955, 'Portobello gomba'),
(956, 'Pepperoni'),
(957, 'Paradicsomlé'),
(958, 'Penne'),
(959, 'Paprikás szalámi'),
(960, 'Párizsi'),
(961, 'Pármai sonka'),
(962, 'Piskótalap'),
(963, 'Pizzaszósz'),
(964, 'Pulykamell'),
(965, 'Pulykacomb'),
(966, 'Porcukor'),
(967, 'Pulykafelsőcomb'),
(968, 'Piros kaliforniai paprika'),
(969, 'Pulykamellsonka'),
(970, 'Pálinka'),
(971, 'Pálmazsír'),
(972, 'Paprikás kolbász'),
(973, 'Paradicsom ivólé'),
(974, 'Pecorino sajt'),
(975, 'Piros curry paszta'),
(976, 'Pizza fűszerkeverék'),
(977, 'Pulykafűszerkeverék'),
(978, 'Puttanesca fűszerkeverék'),
(979, 'Pekándió'),
(980, 'Paradicsompaprika'),
(981, 'Parenyica sajt'),
(982, 'Parasztkolbász'),
(983, 'Parázskrumpli'),
(984, 'Pattogatott kukorica'),
(985, 'Pecsenyezsír'),
(986, 'Piskótarolád'),
(987, 'Piskótatallér'),
(988, 'Pizzatészta'),
(989, 'Pontyfej'),
(990, 'Prágai sonka'),
(991, 'Pritaminpaprika'),
(992, 'Pulykazúza'),
(993, 'Pulykahere'),
(994, 'Puncs puding'),
(995, 'Puncs pudingpor'),
(996, 'Puncsaroma'),
(997, 'Puffasztott amarant'),
(998, 'Puncs fűszerkeverék'),
(999, 'Pálmacukor'),
(1000, 'Passzírozott paradicsom'),
(1001, 'Pulykanyak'),
(1002, 'Paradicsomszósz'),
(1003, 'Prosecco - habzóbor'),
(1004, 'Paradicsomos salsa'),
(1005, 'Panko'),
(1006, 'Pastrami'),
(1007, 'Pak-choi'),
(1008, 'Pandanlevél'),
(1009, 'Pektin'),
(1010, 'Paradicsomos babkonzerv'),
(1011, 'Perilla'),
(1012, 'Padlizsánkrém'),
(1013, 'Pisztáciakrém'),
(1014, 'Rozmaring'),
(1015, 'Rizs'),
(1016, 'Ricotta'),
(1017, 'Rukkola'),
(1018, 'Rum'),
(1019, 'Radicchio'),
(1020, 'Rizstészta'),
(1021, 'Rózsavíz'),
(1022, 'Rózsaszirup'),
(1023, 'Rókagomba'),
(1024, 'Rozsliszt'),
(1025, 'Római kömény'),
(1026, 'Ringli'),
(1027, 'Retek'),
(1028, 'Rizsecet'),
(1029, 'Rebarbara'),
(1030, 'Repceolaj'),
(1031, 'Réteslap'),
(1032, 'Rózsabors'),
(1033, 'Római saláta'),
(1034, 'Rizsliszt'),
(1035, 'Rosé'),
(1036, 'Roletti'),
(1037, 'Rahát'),
(1038, 'Rizottó rizs'),
(1039, 'Rétesliszt'),
(1040, 'Rumaroma'),
(1041, 'Rizsborecet'),
(1042, 'Rózsaburgonya'),
(1043, 'Ribizlidzsem'),
(1044, 'Rózsalekvár'),
(1045, 'Raklett sajt'),
(1046, 'Rigatoni tészta'),
(1047, 'Rizstej'),
(1048, 'Ribizliszörp'),
(1049, 'Ringlószilva'),
(1050, 'Rooibos'),
(1051, 'Rozs'),
(1052, 'Rozskenyér'),
(1053, 'Rostos gyümölcslé'),
(1054, 'Rozspehely'),
(1055, 'Rostos almalé'),
(1056, 'Rózsa'),
(1057, 'Rizspehely'),
(1058, 'Rizslap'),
(1059, 'Ropi'),
(1060, 'Rétes fix'),
(1061, 'Ras el hanout'),
(1062, 'Rogan josh fűszerkeverék'),
(1063, 'Raffaello golyó'),
(1064, 'Rákpaszta'),
(1065, 'Reteklevél'),
(1066, 'Rama'),
(1067, 'Rost sütőmix'),
(1068, 'Rozsos kétszersült'),
(1069, 'Rizsdara'),
(1070, 'Rántott sajt'),
(1071, 'Sárgarépa'),
(1072, 'Sütőtök'),
(1073, 'Sajt'),
(1074, 'Savanyú káposzta'),
(1075, 'Sertéshús'),
(1076, 'Spenót'),
(1077, 'Serrano sonka'),
(1078, 'Salottahagyma'),
(1079, 'Só'),
(1080, 'Sárgabarack'),
(1081, 'Sáfrány'),
(1082, 'Sertészsír'),
(1083, 'Shiitake gomba'),
(1084, 'Snidling'),
(1085, 'Stevia'),
(1086, 'Sóska'),
(1087, 'Sütőpor'),
(1088, 'Sonka'),
(1089, 'Sárgadinnye'),
(1090, 'Sör'),
(1091, 'Süllő/ fogas'),
(1092, 'Sonkahagyma'),
(1093, 'Scamorza'),
(1094, 'Sózott citrom'),
(1095, 'Sherry'),
(1096, 'Sűrített tej (cukrozott)'),
(1097, 'Surimi'),
(1098, 'Sertésmáj'),
(1099, 'Sűrített paradicsom'),
(1100, 'Sertésháj'),
(1101, 'Spagetti tészta'),
(1102, 'Sertéscomb'),
(1103, 'Sertésdagadó'),
(1104, 'Sertés rövidkaraj'),
(1105, 'Sertés karajcsont'),
(1106, 'Sertés szűzpecsenye'),
(1107, 'Sertésoldalas'),
(1108, 'Sertéstarja'),
(1109, 'Sertésköröm'),
(1110, 'Sertéscsülök'),
(1111, 'Sertéslapocka'),
(1112, 'Sárgabaracklekvár'),
(1113, 'Sonkatök'),
(1114, 'Sovány tejpor (cukrozott)'),
(1115, 'Sprotni (konzerv)'),
(1116, 'Sonkás tortellini'),
(1117, 'Sovány tej'),
(1118, 'Sovány túró'),
(1119, 'Spekulatius keksz'),
(1120, 'Sóvirág'),
(1121, 'Sárga currykrém'),
(1122, 'Savanyított kerekrépa'),
(1123, 'Salátalevél'),
(1124, 'Sárgabarackdzsem'),
(1125, 'Sótlan pisztácia'),
(1126, 'Salátahagyma'),
(1127, 'Salátakeverék'),
(1128, 'Savó'),
(1129, 'Schär dzsemfix'),
(1130, 'Savanyított gomba'),
(1131, 'Sajtos tortellini'),
(1132, 'Sertésfül'),
(1133, 'Sajtszósz'),
(1134, 'Sertésborda'),
(1135, 'Sangría'),
(1136, 'Sárgaborsóliszt'),
(1137, 'Sertéscsont'),
(1138, 'Schar Mix'),
(1139, 'Som'),
(1140, 'Sertésfarok'),
(1141, 'Sherryecet'),
(1142, 'Sertésorr'),
(1143, 'Sikér'),
(1144, 'Sonkalé'),
(1145, 'Spárgatök'),
(1146, 'Selyemsonka'),
(1147, 'Sertésvese'),
(1148, 'Sertés virsli'),
(1149, 'Sonkás szalámi'),
(1150, 'Spatzle tészta'),
(1151, 'Stevia por'),
(1152, 'Sushi rizs'),
(1153, 'Sügér'),
(1154, 'Sütésálló lekvár'),
(1155, 'Sütnivaló kolbász'),
(1156, 'Sütő rum'),
(1157, 'Sáfrányos szeklice'),
(1158, 'Sertésszív'),
(1159, 'Sertésnyelv'),
(1160, 'Sötét trombitagomba'),
(1161, 'Sertés agyvelő'),
(1162, 'Sertésvelő'),
(1163, 'Sózott törökmogyoró'),
(1164, 'Sárgabarackbefőtt'),
(1165, 'Süldő malac'),
(1166, 'Steviatabletta'),
(1167, 'Sertésvér'),
(1168, 'Sertéstüdő'),
(1169, 'Sertésbőrke'),
(1170, 'Sárga kaliforniai paprika'),
(1171, 'Snickers szelet'),
(1172, 'Sertésfej'),
(1173, 'Sertésháló'),
(1174, 'Sárgabarackmag'),
(1175, 'Savanyúkáposztalé'),
(1176, 'Sózott retek'),
(1177, 'Soba tészta'),
(1178, 'Sült szöcske'),
(1179, 'Sárkánygyümölcs'),
(1180, 'Sombrero mix'),
(1181, 'Sült hagyma'),
(1182, 'Sütőmargarin'),
(1183, 'Skyr'),
(1184, 'Sárgarépalé'),
(1185, 'Sült sáska'),
(1186, 'Selyemhernyóbáb'),
(1187, 'Sült csirkemell'),
(1188, 'Szeder'),
(1189, 'Szegfűszeg'),
(1190, 'Szardella (konzerv)'),
(1191, 'Szárított paradicsom'),
(1192, 'Szerecsendió'),
(1193, 'Szójaszósz'),
(1194, 'Szaké'),
(1195, 'Szilva'),
(1196, 'Szezámsó'),
(1197, 'Szezámmag'),
(1198, 'Szódabikarbóna'),
(1199, 'Szalalkáli'),
(1200, 'Szárnyasbab'),
(1201, 'Szőlő'),
(1202, 'Szőlőmagolaj'),
(1203, 'Szezámolaj'),
(1204, 'Szárított natúr zöldségkeverék'),
(1205, 'Szarvasgomba'),
(1206, 'Szarvashús'),
(1207, 'Szója'),
(1208, 'Szalicil'),
(1209, 'Szójabab'),
(1210, 'Szalámi'),
(1211, 'Szilvalekvár'),
(1212, 'Száraz vörösbor'),
(1213, 'Száraz rosé'),
(1214, 'Szénsavas narancsos üdítőital'),
(1215, 'Szegfűbors'),
(1216, 'Szamóca'),
(1217, 'Szamócadzsem'),
(1218, 'Szardellapaszta'),
(1219, 'Szardínia'),
(1220, 'Szárnyas alaplé'),
(1221, 'Szárnyas fűszerkeverék'),
(1222, 'Szarvacska tészta'),
(1223, 'Szarvasbélszín'),
(1224, 'Szendvicskrém'),
(1225, 'Szerecsendió virág'),
(1226, 'Szezámliszt'),
(1227, 'Szilvabefőtt'),
(1228, 'Színes cukorka'),
(1229, 'Szójajoghurt'),
(1230, 'Szójatej'),
(1231, 'Szőlőcukor'),
(1232, 'Szőlőlé'),
(1233, 'Szőlőlevél'),
(1234, 'Szuronycsiga'),
(1235, 'Szódavíz'),
(1236, 'Szegfűgomba'),
(1237, 'Szarvascomb'),
(1238, 'Szörp'),
(1239, 'Szárított gomba'),
(1240, 'Szárított hibiszkuszvirág'),
(1241, 'Szójaliszt'),
(1242, 'Szójaolaj'),
(1243, 'Szelénes kalciton'),
(1244, 'Szárított rák'),
(1245, 'Szárított hibiszkusz'),
(1246, 'Szárított jázmin'),
(1247, 'Szumák'),
(1248, 'Szentjánoskenyérmag liszt'),
(1249, 'Szarvasgomba paté'),
(1250, 'Szarvasgombás olaj'),
(1251, 'Szárított almakarika'),
(1252, 'Szárított fűszerpaprika'),
(1253, 'Szejtán'),
(1254, 'Százszorszép'),
(1255, 'Szénsavas citromos üdítőital'),
(1256, 'Szárított lisztkukac'),
(1257, 'Szecsuáni bors'),
(1258, 'Tojás'),
(1259, 'Tőzegáfonya'),
(1260, 'Tonhal'),
(1261, 'Tej'),
(1262, 'Tejföl'),
(1263, 'Tehéntúró'),
(1264, 'Tészta'),
(1265, 'Tofu'),
(1266, 'Tárkony'),
(1267, 'Tarhonya'),
(1268, 'Turbolya'),
(1269, 'Tahini'),
(1270, 'Tökmag'),
(1271, 'Tökmagolaj'),
(1272, 'Tönkölybúza'),
(1273, 'Tintahal'),
(1274, 'Tepertő'),
(1275, 'Törpeharcsa'),
(1276, 'Törökmogyoró'),
(1277, 'Torma'),
(1278, 'Tandoori krém'),
(1279, 'Tortazselé'),
(1280, 'Tagin fűszerkeverék'),
(1281, 'Tequila'),
(1282, 'Tojáslikőr'),
(1283, 'Tejpor'),
(1284, 'Tortellini'),
(1285, 'Tortabevonó'),
(1286, 'Tea'),
(1287, 'Tilápia'),
(1288, 'Tabasco szósz'),
(1289, 'Tölcsér'),
(1290, 'Tejcsokoládé'),
(1291, 'Tojássárgája'),
(1292, 'Tojásfehérje'),
(1293, 'Tv-paprika'),
(1294, 'Trappista sajt'),
(1295, 'Tortilla lap'),
(1296, 'Teafilter'),
(1297, 'Teljes kiőrlésű liszt'),
(1298, 'Teavaj'),
(1299, 'Tejszínhab'),
(1300, 'Tejszínhab por'),
(1301, 'Tömlős krémsajt'),
(1302, 'Tintahalkarika'),
(1303, 'Tortilla chips'),
(1304, 'Tápióka'),
(1305, 'Tápiókaliszt'),
(1306, 'Tárkonyecet'),
(1307, 'Tartármártás'),
(1308, 'Tejkaramella'),
(1309, 'Tejszínízű pudingpor'),
(1310, 'Téliszalámi'),
(1311, 'Teljeskiőrlésű tönkölybúza liszt'),
(1312, 'Tonhalkonzerv'),
(1313, 'Tonik'),
(1314, 'Tőkehalfilé'),
(1315, 'Tönkölybúza liszt'),
(1316, 'Triple sec'),
(1317, 'Toast kenyér'),
(1318, 'Tintahalcsáp'),
(1319, 'Thai halszósz'),
(1320, 'Tökmagliszt'),
(1321, 'Törökméz'),
(1322, 'Tengeri spárga'),
(1323, 'Tiszta szesz'),
(1324, 'Trópusi gyümölcskonzerv'),
(1325, 'Tenger gyümölcsei mix'),
(1326, 'Túró Rudi'),
(1327, 'Tejszínes-gombás szósz'),
(1328, 'Thai zöldségkeverék'),
(1329, 'Tojáspótló por'),
(1330, 'Tönkölybúzapehely'),
(1331, 'Tandoori masala'),
(1332, 'Toffifee'),
(1333, 'Tamarind paszta'),
(1334, 'Timsó'),
(1335, 'Tokaszalonna'),
(1336, 'Tigrisrák'),
(1337, 'Tagliatelle'),
(1338, 'Tonkabab'),
(1339, 'Tomatillo (mexikói földicseresznye)'),
(1340, 'Tostada lap'),
(1341, 'Teafű'),
(1342, 'Tokaj Dressing'),
(1343, 'Tokaj Vinaigrette'),
(1344, 'Tejmentes margarin'),
(1345, 'Tintahal tinta'),
(1346, 'Tésztakosárkák'),
(1347, 'Teriyaki szósz'),
(1348, 'Túródesszert'),
(1349, 'Tökmagkrém'),
(1350, 'Tatárbifsztek'),
(1351, 'Tortelloni'),
(1352, 'Tükörglazúrpor'),
(1353, 'Trüffelgolyó'),
(1354, 'Tejoltó enzim'),
(1355, 'Tengeri hínár'),
(1356, 'Tangelo'),
(1357, 'Tücsök'),
(1358, 'Tyúk'),
(1359, 'Tyúkháj'),
(1360, 'Uborka'),
(1361, 'Udon tészta'),
(1362, 'Unicum'),
(1363, 'Újhagyma'),
(1364, 'Újkrumpli'),
(1365, 'Újhagyma zöldje'),
(1366, 'Útifű maghéj'),
(1367, 'Üvegtészta'),
(1368, 'Vargánya gomba'),
(1369, 'Vöröskáposzta'),
(1370, 'Vöröshagyma'),
(1371, 'Vaj'),
(1372, 'Vanília'),
(1373, 'Vajrépa'),
(1374, 'Víz'),
(1375, 'Vaníliás cukor'),
(1376, 'Vitéz szemling'),
(1377, 'Virsli'),
(1378, 'Vörösbor'),
(1379, 'Vaddisznóhús'),
(1380, 'Vadrizs'),
(1381, 'Vaníliaaroma'),
(1382, 'Vörösborecet'),
(1383, 'Vaníliás pudingpor'),
(1384, 'Virágméz'),
(1385, 'Vodka'),
(1386, 'Vöröslencse'),
(1387, 'Vörösbab'),
(1388, 'Vinaigrette'),
(1389, 'Vajkrém'),
(1390, 'Vöröskaviár'),
(1391, 'Vadlazac'),
(1392, 'Vérnarancs'),
(1393, 'Vérnarancs aroma'),
(1394, 'Vörösáfonya'),
(1395, 'Vadkacsamell'),
(1396, 'Vaníliapuding'),
(1397, 'Vaddisznószűz'),
(1398, 'Vaddisznókaraj'),
(1399, 'Vargánya gombapor'),
(1400, 'Véres hurka'),
(1401, 'Vanília kivonat'),
(1402, 'Vajkaramella'),
(1403, 'Vanília fagylalt'),
(1404, 'Vegyes savanyúság'),
(1405, 'Vízitorma'),
(1406, 'Vad fűszerkeverék'),
(1407, 'Vízigesztenye'),
(1408, 'Vajhal'),
(1409, 'Vanillincukor'),
(1410, 'Vízispenót'),
(1411, 'Vajbab'),
(1412, 'Vékonybél (sertés)'),
(1413, 'Vegán burgerpogácsa'),
(1414, 'Veganéz'),
(1415, 'Vegán nuggets'),
(1416, 'Zöldborsó'),
(1417, 'Zöldbab'),
(1418, 'Zeller'),
(1419, 'Zab'),
(1420, 'Zöldkagyló'),
(1421, 'Zúza'),
(1422, 'Zellerlevél'),
(1423, 'Zabpehely'),
(1424, 'Zabtejszín'),
(1425, 'Zabkeksz'),
(1426, 'Zöldbors'),
(1427, 'Zabtej'),
(1428, 'Zöldpaprika'),
(1429, 'Zöldhagyma'),
(1430, 'Zöld metélttészta'),
(1431, 'Zöldparadicsom'),
(1432, 'Zöld mandula'),
(1433, 'Zabliszt'),
(1434, 'Zabkorpa'),
(1435, 'Zöld olajbogyó'),
(1436, 'Zabpehelyliszt'),
(1437, 'Zöld kardamom'),
(1438, 'Zöldség alaplé'),
(1439, 'Zöldspárga'),
(1440, 'Zöldfűszer'),
(1441, 'Zellersó'),
(1442, 'Zöld kaliforniai paprika'),
(1443, 'Zöldségkeverék'),
(1444, 'Zöldborsó-kukorica zöldségkeverék'),
(1445, 'Zöldbab-vajbab keverék'),
(1446, 'Zaatar'),
(1447, 'Zöldbanán liszt'),
(1448, 'Zöldséges golyó'),
(1449, 'Zsálya'),
(1450, 'Zselatin'),
(1451, 'Zsemlemorzsa'),
(1452, 'Zsemle'),
(1453, 'Zselatinfix'),
(1454, 'Zsúrkenyér'),
(1455, 'Zselécukor'),
(1456, 'Zselésítő befőzőszer');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `measurements`
--

CREATE TABLE `measurements` (
  `measurement_id` int(11) NOT NULL,
  `measurement_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `measurements`
--

INSERT INTO `measurements` (`measurement_id`, `measurement_name`) VALUES
(1, 'g'),
(2, 'ml'),
(5, 'db');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pantry`
--

CREATE TABLE `pantry` (
  `pantry_item_id` int(11) NOT NULL,
  `pantry_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `ingredient_quantity` int(11) NOT NULL,
  `measurement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `pantry`
--

INSERT INTO `pantry` (`pantry_item_id`, `pantry_id`, `ingredient_id`, `ingredient_quantity`, `measurement_id`) VALUES
(1, 2, 1, 2000, 1),
(2, 2, 2, 5, 5),
(6, 6, 65, 250, 1),
(28, 6, 857, 1000, 1),
(29, 6, 295, 1000, 1),
(30, 6, 44, 1000, 1),
(31, 6, 740, 1000, 1),
(33, 6, 1, 1500, 1),
(34, 6, 1371, 100, 1),
(35, 6, 2, 1, 5);

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
  `source_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `recipes`
--

INSERT INTO `recipes` (`recipe_id`, `recipe_name`, `recipe_description`, `recipe_time`, `recipe_headcount`, `source_user_id`) VALUES
(2, 'MY TEST RECIPE', 'This is a test recipe used for testing. - \r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 5, 2, 2),
(3, 'Another Test Recipe!', 'This is another test recipe for testing\r\náÁéÉóÓöÖúÚüÜűŰ@@@@????', 15, 1, 2);

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
(6, 'Postman test shopping list with recipe id', 2),
(7, 'Postman test shopping list ingredient list', NULL),
(10, 'Postman test shopping list ingredient list', NULL);

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
(2, '', '', '', 'updated@email.com', 0),
(3, 'test1', '$argon2id$v=19$m=65536,t=3,p=4$r63wxYyuhTzsiCn/eMrYJA$e0t9/tA5QqCTYnTiLs5uhSlnO3PWcB49/Ph/EqZQHss', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', 'test1email@email.com', 0),
(4, 'test2', '$argon2id$v=19$m=65536,t=3,p=4$hfMfFDD3L4JB0yui+Cuhzg$wdszDTveDIPQCZ/4FnzvGdDl3vphD/x9RA9NkmFWSmg', ' This is test1 user\'s description. Hello hello. ABC. Cats Dogs Cats Dogs', 'test2@email.com', 1),
(5, '3test', '$argon2id$v=19$m=65536,t=3,p=4$8uiLJi14tlrHYPoH/qqQfQ$fsMiUiIe9U1kjAMVpi3raQuEDmysIbCopXCdNje9cao', 'This is where i test deactivation', '3test@emailcom', 1),
(6, 'test', '$argon2id$v=19$m=65536,t=3,p=4$1jU97p3bUbP945mcn0yL1A$dA9xyHEvhOI/5J2XHvtIgohPLEfdvM39MGqCZjUM57Y', ' Ez itt a leírásom. Itt tesztelek heló beló....', 'test@test.hu', 0),
(7, 'sanyi', '$argon2i$v=19$m=65536,t=4,p=1$AuIhlb14FAU3hI0s3V1lJQ$nLoIV/1gF8sbqkaHbtK8CI0AnUEzp+qOw42y9d6kJUM', NULL, 'sanyi@email.hu', 0),
(8, 'postman', '$argon2i$v=19$m=65536,t=4,p=1$hG0jM+FXvHyF313JKTzX9w$/Qatx0i03ATW+3D5QJTt5NqbvrrvsHHh5gX6Dn2nR4c', NULL, 'post@man.com', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_dish_category`
--

CREATE TABLE `user_dish_category` (
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user_dish_category`
--

INSERT INTO `user_dish_category` (`user_id`, `category_id`) VALUES
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
(6, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_own_recipes`
--

CREATE TABLE `user_own_recipes` (
  `user_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `con_recipe_category`
--
ALTER TABLE `con_recipe_category`
  ADD PRIMARY KEY (`recipe_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- A tábla indexei `con_recipe_cuisine`
--
ALTER TABLE `con_recipe_cuisine`
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `cuisine_id` (`cuisine_id`) USING BTREE;

--
-- A tábla indexei `con_recipe_dish_type`
--
ALTER TABLE `con_recipe_dish_type`
  ADD PRIMARY KEY (`recipe_id`,`dishtype_id`),
  ADD KEY `dishtype_id` (`dishtype_id`);

--
-- A tábla indexei `con_recipe_ingredients`
--
ALTER TABLE `con_recipe_ingredients`
  ADD PRIMARY KEY (`recipe_id`,`ingredient_id`),
  ADD KEY `measurement_id` (`measurement_id`),
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
-- A tábla indexei `dish_category`
--
ALTER TABLE `dish_category`
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
-- A tábla indexei `measurements`
--
ALTER TABLE `measurements`
  ADD PRIMARY KEY (`measurement_id`);

--
-- A tábla indexei `pantry`
--
ALTER TABLE `pantry`
  ADD PRIMARY KEY (`pantry_item_id`),
  ADD KEY `measurement_id` (`measurement_id`);

--
-- A tábla indexei `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipe_id`),
  ADD KEY `source_user_id` (`source_user_id`);

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
-- A tábla indexei `user_dish_category`
--
ALTER TABLE `user_dish_category`
  ADD PRIMARY KEY (`user_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- A tábla indexei `user_fav_recipes`
--
ALTER TABLE `user_fav_recipes`
  ADD PRIMARY KEY (`user_id`,`recipe_id`);

--
-- A tábla indexei `user_own_recipes`
--
ALTER TABLE `user_own_recipes`
  ADD PRIMARY KEY (`user_id`,`recipe_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `dish_category`
--
ALTER TABLE `dish_category`
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
-- AUTO_INCREMENT a táblához `measurements`
--
ALTER TABLE `measurements`
  MODIFY `measurement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `pantry`
--
ALTER TABLE `pantry`
  MODIFY `pantry_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT a táblához `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `shopping`
--
ALTER TABLE `shopping`
  MODIFY `shopping_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `con_recipe_category`
--
ALTER TABLE `con_recipe_category`
  ADD CONSTRAINT `con_recipe_category_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `dish_category` (`category_id`),
  ADD CONSTRAINT `con_recipe_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `dish_category` (`category_id`),
  ADD CONSTRAINT `con_recipe_category_ibfk_3` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`);

--
-- Megkötések a táblához `con_recipe_cuisine`
--
ALTER TABLE `con_recipe_cuisine`
  ADD CONSTRAINT `con_recipe_cuisine_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`),
  ADD CONSTRAINT `con_recipe_cuisine_ibfk_2` FOREIGN KEY (`cuisine_id`) REFERENCES `dish_cuisine` (`cuisine_id`);

--
-- Megkötések a táblához `con_recipe_dish_type`
--
ALTER TABLE `con_recipe_dish_type`
  ADD CONSTRAINT `con_recipe_dish_type_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`),
  ADD CONSTRAINT `con_recipe_dish_type_ibfk_2` FOREIGN KEY (`dishtype_id`) REFERENCES `dish_type` (`dishtype_id`),
  ADD CONSTRAINT `con_recipe_dish_type_ibfk_3` FOREIGN KEY (`dishtype_id`) REFERENCES `dish_type` (`dishtype_id`),
  ADD CONSTRAINT `con_recipe_dish_type_ibfk_4` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`);

--
-- Megkötések a táblához `con_recipe_ingredients`
--
ALTER TABLE `con_recipe_ingredients`
  ADD CONSTRAINT `con_recipe_ingredients_ibfk_1` FOREIGN KEY (`measurement_id`) REFERENCES `measurements` (`measurement_id`),
  ADD CONSTRAINT `con_recipe_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`);

--
-- Megkötések a táblához `con_shopping_ingredients`
--
ALTER TABLE `con_shopping_ingredients`
  ADD CONSTRAINT `con_shopping_ingredients_ibfk_1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`),
  ADD CONSTRAINT `con_shopping_ingredients_ibfk_2` FOREIGN KEY (`shopping_id`) REFERENCES `shopping` (`shopping_id`);

--
-- Megkötések a táblához `con_user_pantry`
--
ALTER TABLE `con_user_pantry`
  ADD CONSTRAINT `con_user_pantry_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Megkötések a táblához `pantry`
--
ALTER TABLE `pantry`
  ADD CONSTRAINT `pantry_ibfk_1` FOREIGN KEY (`measurement_id`) REFERENCES `measurements` (`measurement_id`);

--
-- Megkötések a táblához `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_3` FOREIGN KEY (`source_user_id`) REFERENCES `users` (`user_id`);

--
-- Megkötések a táblához `shopping`
--
ALTER TABLE `shopping`
  ADD CONSTRAINT `shopping_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`);

--
-- Megkötések a táblához `user_dish_category`
--
ALTER TABLE `user_dish_category`
  ADD CONSTRAINT `user_dish_category_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_dish_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `dish_category` (`category_id`);

--
-- Megkötések a táblához `user_fav_recipes`
--
ALTER TABLE `user_fav_recipes`
  ADD CONSTRAINT `user_fav_recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_fav_recipes_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`),
  ADD CONSTRAINT `user_fav_recipes_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_fav_recipes_ibfk_4` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`);

--
-- Megkötések a táblához `user_own_recipes`
--
ALTER TABLE `user_own_recipes`
  ADD CONSTRAINT `user_own_recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_own_recipes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_own_recipes_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_own_recipes_ibfk_4` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`),
  ADD CONSTRAINT `user_own_recipes_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_own_recipes_ibfk_6` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
