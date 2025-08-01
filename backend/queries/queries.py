from queries.connection import execute_query
from queries.utils import return_select, return_commit
from classes import Review


def get_places_data():
    sql = """
        SELECT * FROM places;
    """

    data, column_names = execute_query(sql)

    return return_select(data, column_names)


def get_reviews_data(place_id: str):
    sql = f"""
        SELECT user_id, rating rating FROM reviews
        WHERE place_id = {place_id};
    """

    data, column_names = execute_query(sql)

    return return_select(data, column_names)


def insert_review_data(review: Review):
    sql = f"""
        INSERT INTO Reviews
        VALUES ({review.userId}, {review.lat}, {review.long}, '{review.txt}')
    """

    data, _ = execute_query(sql)

    return return_commit(data, "Review inserted with success!")
