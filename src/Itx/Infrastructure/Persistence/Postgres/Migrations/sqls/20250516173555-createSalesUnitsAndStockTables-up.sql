CREATE TABLE itx.sales_units (
	product_id INTEGER NOT NULL,
	units INTEGER NOT NULL,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (product_id) REFERENCES itx.product(id)
);

INSERT INTO itx.sales_units (product_id, units) VALUES
	(1, 100),
	(2, 50),
	(3, 80),
	(4, 3),
	(5, 650),
	(6, 20);

CREATE TABLE itx.stock (
	product_id INTEGER NOT NULL,
	size VARCHAR(50) NOT NULL,
	stock INTEGER NOT NULL,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (product_id) REFERENCES itx.product(id)
);

INSERT INTO itx.stock (product_id, size, stock) VALUES
	(1, 'S', 4),
	(1, 'M', 9),
	(1, 'L', 0),
	(2, 'S', 35),
	(2, 'M', 9),
	(2, 'L', 9),
	(3, 'S', 20),
	(3, 'M', 2),
	(3, 'L', 20),
	(4, 'S', 25),
	(4, 'M', 30),
	(4, 'L', 10),
	(5, 'S', 0),
	(5, 'M', 1),
	(5, 'L', 0),
	(6, 'S', 9),
	(6, 'M', 2),
	(6, 'L', 5);
