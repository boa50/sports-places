-- USERS
INSERT INTO users(user_provider_id, avatar, display_name)
VALUES ('kajsdghkjas', 'default', 'Name 1');

INSERT INTO users(user_provider_id, avatar, display_name)
VALUES ('kajsdghkjax', 'default', 'Name 2');

-- PLACES
INSERT INTO places(lat, lng)
VALUES (51.505, -0.09);

INSERT INTO places(lat, lng)
VALUES (-15.7515776, -47.8937088);

INSERT INTO places(lat, lng)
VALUES (18.103154190383496, 30.289366938803536);

-- REVIEWS
INSERT INTO reviews(user_id, place_id, rating, experience_date, route_link)
VALUES (1, 1, 3, '2024-08-21', 'https://www.google.com');

INSERT INTO reviews(user_id, place_id, rating, experience_date, route_link)
VALUES (1, 2, 4, '2024-12-21', 'https://www.mapmyrun.com/routes/askdjh');

INSERT INTO reviews(user_id, place_id, rating, experience_date)
VALUES (1, 2, 2, '2023-01-01');

INSERT INTO reviews(user_id, place_id, rating, experience_date, route_link)
VALUES (1, 3, 5, '2024-12-21', 'https://connect.garmin.com/1789236');

-- AVATARS
INSERT INTO avatars(description, url)
VALUES ('red', 'https://i.ibb.co/C5prjF4G/red.webp');

INSERT INTO avatars(description, url)
VALUES ('green', 'https://i.ibb.co/WWDgDSSh/green.webp');

INSERT INTO avatars(description, url)
VALUES ('blue', 'https://i.ibb.co/VWy8KXTN/blue.webp');