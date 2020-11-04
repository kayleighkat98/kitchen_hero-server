CREATE TABLE ingredients(
    ingredient_id SERIAL PRIMARY KEY NOT NULL,
    "user_id" INTEGER REFERENCES "user"(id)ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    expiration_date TEXT,
    quantity DECIMAL NOT NULL
);

