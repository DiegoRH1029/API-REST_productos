CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    description TEXT NOT NULL,
    brand VARCHAR(255) NULL,
    img TEXT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO products (name, price, stock, description, brand, img) 
VALUES ('Laptop Dell Inspiron', 15500.50, 10, 'Laptop ideal para programación web', 'Dell', 'https://ejemplo.com/img.jpg');