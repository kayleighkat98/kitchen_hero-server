CREATE TABLE ingredients(
    ingredient_id SERIAL PRIMARY KEY NOT NULL,
    "user_id" INTEGER REFERENCES "user"(id)ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    add_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expiration_date DATE,
    quantity DECIMAL NOT NULL

);

