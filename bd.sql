-- Crear base de datos
CREATE DATABASE IF NOT EXISTS espaciocreativo;

-- Crear usuario si no existe
CREATE USER IF NOT EXISTS 'arcadia'@'localhost' IDENTIFIED BY 'password';

-- Conceder privilegios al usuario sobre la base de datos
GRANT ALL PRIVILEGES ON espaciocreativo.* TO 'arcadia'@'localhost';

-- Aplicar cambios
FLUSH PRIVILEGES;

-- Usar la base de datos
USE espaciocreativo;


CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    contrasena VARCHAR(200),
    rol TINYINT NOT NULL
);


CREATE TABLE IF NOT EXISTS obras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NULL,
    materiales TEXT NULL,
    medidas_largo FLOAT NULL,
    medidas_ancho FLOAT NULL,
    medidas_alto FLOAT NULL,
    imagen_principal VARCHAR(255) NOT NULL,
    categoria TINYINT NOT NULL
);


CREATE TABLE IF NOT EXISTS imagenes_obras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    obra_id INT NOT NULL,
    imagen_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (obra_id) REFERENCES obras(id) ON DELETE CASCADE
);

