CREATE TABLE IF NOT EXISTS users  (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_data INT
);

CREATE TABLE IF NOT EXISTS places  (
    place_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lat FLOAT,
    lng FLOAT
);

CREATE TABLE IF NOT EXISTS reviews  (
    review_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL,
    place_id INT NOT NULL,
    rating INT,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (place_id) REFERENCES places (place_id) ON DELETE CASCADE
);