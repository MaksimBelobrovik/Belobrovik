-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hashtags`
--

DROP TABLE IF EXISTS `hashtags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hashtags` (
  `USER_ID` int(11) NOT NULL,
  `POST_ID` int(11) NOT NULL,
  `HASHTAG` varchar(16) NOT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtags`
--

LOCK TABLES `hashtags` WRITE;
/*!40000 ALTER TABLE `hashtags` DISABLE KEYS */;
INSERT INTO `hashtags` VALUES (1,1,'#nice'),(2,1,'#awesome'),(3,1,'#cool'),(4,2,'#love'),(5,2,'#strange'),(6,2,'#new'),(7,6,'#life'),(8,6,'#never'),(9,5,'#start'),(10,5,'#best');
/*!40000 ALTER TABLE `hashtags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hashtags_has_user`
--

DROP TABLE IF EXISTS `hashtags_has_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hashtags_has_user` (
  `HASHTAGS_USER_ID` int(11) NOT NULL,
  `USER_USER_ID` int(11) NOT NULL,
  PRIMARY KEY (`HASHTAGS_USER_ID`,`USER_USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtags_has_user`
--

LOCK TABLES `hashtags_has_user` WRITE;
/*!40000 ALTER TABLE `hashtags_has_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `hashtags_has_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `likes` (
  `USER_ID` int(11) NOT NULL,
  `POST_ID` int(11) NOT NULL,
  `USER_USER_ID` int(11) NOT NULL,
  `PHOTO_POST_POST_ID` int(11) NOT NULL,
  `PHOTO_POST_USER_USER_ID` int(11) NOT NULL,
  PRIMARY KEY (`USER_ID`,`USER_USER_ID`,`PHOTO_POST_POST_ID`,`PHOTO_POST_USER_USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,7,1,7,7),(2,2,2,2,2),(3,3,3,3,3),(4,4,4,4,4),(5,6,5,6,6),(5,7,5,7,7),(6,4,6,4,4),(7,3,7,3,3),(8,2,8,2,2),(9,1,9,1,9);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo_post`
--

DROP TABLE IF EXISTS `photo_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `photo_post` (
  `POST_ID` int(11) NOT NULL,
  `DESCRIPTION` text NOT NULL,
  `CREATION_DATE` date NOT NULL,
  `PHOTO_LINK` varchar(45) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `USER_USER_ID` int(11) NOT NULL,
  PRIMARY KEY (`POST_ID`,`USER_USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_post`
--

LOCK TABLES `photo_post` WRITE;
/*!40000 ALTER TABLE `photo_post` DISABLE KEYS */;
INSERT INTO `photo_post` VALUES (1,'Best description','2019-09-07','some link',2,2),(2,'Best description 2','2019-10-12','some link',2,2),(3,'Best description 3','2019-11-12','some link',2,2),(4,'Best description 4','2019-01-05','some link',3,3),(5,'Best description 4','2019-05-01','some link',4,4),(6,'Best description 5','2019-09-12','some link',5,5),(7,'Best description 6','2019-10-12','some link',7,7),(8,'Best description 7','2019-05-05','some link',7,7),(9,'Best description 8','2019-11-12','some link',4,4),(10,'Best description 9','2019-10-12','some link',3,3);
/*!40000 ALTER TABLE `photo_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo_post_has_likes`
--

DROP TABLE IF EXISTS `photo_post_has_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `photo_post_has_likes` (
  `PHOTO_POST_POST_ID` timestamp NOT NULL,
  `PHOTO_POST_USER_USER_ID` int(11) NOT NULL,
  `LIKES_USER_ID` int(11) NOT NULL,
  `LIKES_USER_USER_ID` int(11) NOT NULL,
  PRIMARY KEY (`PHOTO_POST_POST_ID`,`PHOTO_POST_USER_USER_ID`,`LIKES_USER_ID`,`LIKES_USER_USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_post_has_likes`
--

LOCK TABLES `photo_post_has_likes` WRITE;
/*!40000 ALTER TABLE `photo_post_has_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `photo_post_has_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `USER_ID` varchar(16) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1','ABC'),('10','Oldman'),('2','Inan Ivanov'),('3','Alex'),('4','Joe Black'),('5','Panda'),('6','Jonny'),('7','Robin'),('8','Jeff'),('9','Mike');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-26 17:36:34
