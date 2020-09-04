CREATE TYPE measurment_type AS ENUM (
    /*switch from singular to plural based on quantity*/
    'units',
    'pounds',
    'cups',
    'gallons',
    'ounces',
    'fluid-ounces'
);

ALTER TABLE epantry
    ADD COLUMN 
        quantity_type measurment_type;
