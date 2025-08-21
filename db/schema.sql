CREATE TABLE IF NOT EXISTS users  (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_provider_id VARCHAR(40) NOT NULL,
    avatar VARCHAR(10),
    display_name VARCHAR(25)
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
	experience_date DATE DEFAULT CURRENT_DATE,
	route_link VARCHAR(250),
    rating INT,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (place_id) REFERENCES places (place_id) ON DELETE CASCADE
);