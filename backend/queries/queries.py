from queries.connection import execute_query
from queries.utils import return_select, return_commit
from classes import ReviewWrite, PlaceWrite


def get_places_data():
    sql = """
        SELECT * FROM places;
    """

    data, column_names = execute_query(sql)

    return return_select(data, column_names)


def get_reviews_data(place_id: str):
    sql = f"""
        SELECT user_id, experience_date, rating, route_link FROM reviews
        WHERE place_id = {place_id}
        ORDER BY experience_date DESC;
    """

    data, column_names = execute_query(sql)

    return return_select(data, column_names)


def insert_review_data(review: ReviewWrite):
    sql = f"""
        INSERT INTO reviews (user_id, place_id, experience_date, rating)
        VALUES ({review.user_id}, {review.place_id}, '{review.experience_date}', {review.rating})
        RETURNING review_id;
    """

    data, _ = execute_query(sql)

    return return_commit(data, "Review inserted with success!")


def insert_place(place: PlaceWrite):
    sql = f"""
        INSERT INTO places (lat, lng)
        VALUES ({place.lat}, {place.lng})
        RETURNING place_id;
    """

    data, _ = execute_query(sql)

    return return_commit(data, "Place inserted with success!")
