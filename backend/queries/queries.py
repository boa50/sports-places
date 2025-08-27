from queries.connection import execute_query
from queries.utils import return_select, return_commit
from classes import ReviewWrite, PlaceWrite, UserWrite


def get_places():
    sql = """
        SELECT * FROM places;
    """

    data, column_names = execute_query(sql)

    return return_select(data, column_names)


def insert_place(place: PlaceWrite):
    sql = f"""
        INSERT INTO places (lat, lng)
        VALUES ({place.lat}, {place.lng})
        RETURNING place_id;
    """

    data, _ = execute_query(sql)

    return return_commit(data, "Place inserted with success!")


def get_reviews(place_id: str):
    sql = f"""
        SELECT users.display_name as user_display_name, users.avatar as user_avatar_description, 
            experience_date, rating, route_link 
        FROM reviews
        LEFT JOIN users ON reviews.user_id = users.user_id
        WHERE place_id = {place_id}
        ORDER BY experience_date DESC;
    """

    data, column_names = execute_query(sql)

    return return_select(data, column_names)


def insert_review(review: ReviewWrite):
    sql = f"""
        INSERT INTO reviews (
            user_id, 
            place_id, 
            experience_date, 
            rating
            {", route_link" if review.route_link is not None else ""}
        )
        VALUES (
            {review.user_id}, 
            {review.place_id}, 
            '{review.experience_date}', 
            {review.rating} 
            {f", '{review.route_link}'" if review.route_link is not None else ""}
        )
        RETURNING review_id;
    """

    data, _ = execute_query(sql)

    return return_commit(data, "Review inserted with success!")


def get_user(user_provider_id: str):
    sql = f"""
        SELECT user_id, avatars.url as avatar_url, display_name FROM users
        LEFT JOIN avatars ON users.avatar = avatars.description
        WHERE user_provider_id = '{user_provider_id}';
    """

    data, column_names = execute_query(sql)

    return return_select(data, column_names)


def insert_user(user: UserWrite):
    sql = f"""
        INSERT INTO users (user_provider_id, avatar, display_name)
        VALUES ('{user.user_provider_id}', '{user.avatar}', '{user.display_name}')
        RETURNING user_id;
    """

    data, _ = execute_query(sql)

    return return_commit(data, "User inserted with success!")


def get_avatars():
    sql = """
        SELECT description, url FROM avatars;
    """

    data, column_names = execute_query(sql)

    return return_select(data, column_names)


def get_avatar(avatar_description: str):
    sql = f"""
        SELECT url FROM avatars
        WHERE description = '{avatar_description}';
    """

    data, column_names = execute_query(sql)

    return return_select(data, column_names)
