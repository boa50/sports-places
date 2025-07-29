from queries.connection import execute_query
from classes import Review


def get_reviews_data():
    sql = """
        SELECT user_id, lat, lng, rating FROM reviews
        INNER JOIN users USING (user_id)
        INNER JOIN places USING (place_id);
    """

    data, column_names = execute_query(sql)

    if data != -1:
        return data, column_names
    else:
        return list(), list()


def insert_review_data(review: Review):
    sql = f"""
        INSERT INTO Reviews
        VALUES ({review.userId}, {review.lat}, {review.long}, '{review.txt}')
    """

    data, _ = execute_query(sql)

    if data != -1:
        print("Review inserted with success!")
        return 0
    else:
        return -1
