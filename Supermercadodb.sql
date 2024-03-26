CREATE DATABASE  IF NOT EXISTS `supermercadodb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `supermercadodb`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: supermercadodb
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `userID` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `idNumber` int NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES ('1001','JD1001','John Doe',1),('1002','SS1002','Sarah Smith',2),('1003','MJ1003','Mike Jones',3),('1004','EB&98765','Emily Brown',4),('1005','DW*23456','David Wilson',5),('1006','LJ!76543','Lisa Jackson',6),('1007','KM^45678','Kevin Martinez',7),('1008','AC@98765','Amy Campbell',8),('1009','PR#56789','Peter Rodriguez',9),('1010','ML%32109','Michelle Lee',10);
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `numeroDePedido` int NOT NULL AUTO_INCREMENT,
  `productID` int DEFAULT NULL,
  `supplier` varchar(100) DEFAULT NULL,
  `quantityOrdered` int DEFAULT NULL,
  `userID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`numeroDePedido`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,1001,'Fresh Produce Co.',1,'1001'),(2,1003,'Fresh Produce Co.',1,'1001'),(3,1001,'Fresh Produce Co.',1,'1001'),(4,1001,'Fresh Produce Co.',1,'1001'),(5,1001,'Fresh Produce Co.',1,'1001'),(6,1015,'Farm to Table Grocers',1,'1001');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productID` int NOT NULL,
  `productName` varchar(50) NOT NULL,
  `supplier` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL,
  `stock` int NOT NULL,
  `description` varchar(300) NOT NULL,
  PRIMARY KEY (`productID`),
  KEY `supplier` (`supplier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1001,'Granny Smith Apples','Fresh Produce Co.','Fruits',100,'Fresh and crisp Granny Smith apples, perfect for snacking or baking.'),(1002,'Romaine Lettuce','Fresh Produce Co.','Vegetables',80,'Crisp and refreshing Romaine lettuce, great for salads and sandwiches.'),(1003,'Valencia Oranges','Fresh Produce Co.','Fruits',120,'Juicy and sweet Valencia oranges, ideal for fresh juice or snacking.'),(1004,'Red Bell Peppers','Fresh Produce Co.','Vegetables',70,'Vibrant and crunchy red bell peppers, perfect for adding color and flavor to your dishes.'),(1005,'Seedless Watermelon','Fresh Produce Co.','Fruits',90,'Sweet and refreshing seedless watermelon, great for picnics and summer gatherings.'),(1006,'Organic Avocado','Organic Farms Ltd.','Fruits',60,'Creamy and nutritious organic avocados, perfect for making guacamole or adding to salads.'),(1007,'Organic Cherry Tomatoes','Organic Farms Ltd.','Vegetables',50,'Sweet and flavorful organic cherry tomatoes, great for snacking or adding to pasta dishes.'),(1008,'Organic Spinach','Organic Farms Ltd.','Vegetables',40,'Nutrient-rich organic spinach, ideal for salads, smoothies, or sautéing.'),(1009,'Organic Strawberries','Organic Farms Ltd.','Fruits',70,'Plump and juicy organic strawberries, perfect for enjoying fresh or adding to desserts.'),(1010,'Organic Kale','Organic Farms Ltd.','Vegetables',30,'Nutrient-packed organic kale, great for salads, soups, or making kale chips.'),(1011,'Grass-fed Beef','Farm to Table Grocers','Meat',50,'Tender and flavorful grass-fed beef, perfect for grilling or roasting.'),(1012,'Free-range Chicken Eggs','Farm to Table Grocers','Dairy & Eggs',100,'Fresh and nutritious free-range chicken eggs, great for breakfast or baking.'),(1013,'Organic Quinoa','Farm to Table Grocers','Grains',80,'Nutty and versatile organic quinoa, perfect for salads, pilafs, or as a side dish.'),(1014,'Raw Honey','Farm to Table Grocers','Pantry Staples',60,'Pure and natural raw honey, ideal for sweetening beverages or drizzling over yogurt.'),(1015,'Extra Virgin Olive Oil','Farm to Table Grocers','Pantry Staples',90,'Premium quality extra virgin olive oil, perfect for cooking, dressing salads, or dipping bread.');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `supplier` varchar(50) NOT NULL,
  `supplierID` int NOT NULL,
  PRIMARY KEY (`supplier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES ('Farm to Table Grocers',1003),('Fresh Produce Co.',1001),('Organic Farms Ltd.',1002);
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'supermercadodb'
--

--
-- Dumping routines for database 'supermercadodb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-25 19:51:11
