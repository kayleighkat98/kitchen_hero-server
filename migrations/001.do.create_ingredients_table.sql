CREATE TABLE ingredients(
    ingredient_id SERIAL PRIMARY KEY NOT NULL,
    ingredient TEXT NOT NULL,
    add_date DATE NOT NULL DEFAULT CURRENT_DATE,
    quantity DECIMAL NOT NULL
);

