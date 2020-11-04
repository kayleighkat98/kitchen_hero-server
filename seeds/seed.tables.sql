BEGIN;
TRUNCATE 
    ingredients, 
    "user";
INSERT INTO "user" ("id", "username", "name", "password")
    VALUES
    (
        1,
        'kay',
        'kayleigh',
        -- password = "pass"
        '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
    );
INSERT INTO ingredients (ingredient_id, "user_id", name, expiration_date, quantity, quantity_type )
    VALUES  
        ( 1, 1, 'Apples', null , 20, 'pounds' ),
        ( 2, 1, 'Soda','2000-11-05', 2, 'liters' ),
        ( 3, 1, 'Grapes','2030-10-07', 10, 'ounces' );
COMMIT;