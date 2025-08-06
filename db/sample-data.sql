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
INSERT INTO reviews(user_id, place_id, rating)
VALUES (1, 1, 3);

INSERT INTO reviews(user_id, place_id, rating)
VALUES (1, 2, 4);

INSERT INTO reviews(user_id, place_id, rating)
VALUES (1, 2, 2);

INSERT INTO reviews(user_id, place_id, rating)
VALUES (1, 3, 5);