-- USERS
INSERT INTO users(user_data)
VALUES (0);

INSERT INTO users(user_data)
VALUES (1);

-- PLACES
INSERT INTO places(lat, lng)
VALUES (51.505, -0.09);

INSERT INTO places(lat, lng)
VALUES (-15.7515776, -47.8937088);

INSERT INTO places(lat, lng)
VALUES (18.103154190383496, 30.289366938803536);

-- REVIEWS
INSERT INTO reviews(user_id, place_id, rating, experience_date)
VALUES (1, 1, 3, '2024-08-21');

INSERT INTO reviews(user_id, place_id, rating, experience_date)
VALUES (1, 2, 4, '2024-12-21');

INSERT INTO reviews(user_id, place_id, rating, experience_date)
VALUES (1, 2, 2, '2023-01-01');

INSERT INTO reviews(user_id, place_id, rating, experience_date)
VALUES (1, 3, 5, '2024-12-21');