CREATE TYPE measurment_type AS ENUM (
    /*switch from singular to plural based on quantity*/
    'pounds',
    'cups',
    'gallons',
    'liters',
    'ounces'

);

ALTER TABLE ingredients
    ADD COLUMN 
        quantity_type measurment_type;
