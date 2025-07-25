from queries.connection import execute_query

# Just for tests
import random


def create_random_float():
    min_val = -50.0
    max_val = 50.0
    return min_val + (max_val - min_val) * random.random()


def get_reviews_data():
    sql = "SELECT * FROM Reviews;"

    data, column_names = execute_query(sql)

    if data != -1:
        return data, column_names
    else:
        return list(), list()


def insert_review_data():
    userid = 0
    lat = create_random_float()
    long = create_random_float()
    txt = "Some text " + str(create_random_float())

    sql = f"""
        INSERT INTO Reviews
        VALUES ({userid}, {lat}, {long}, '{txt}')
    """

    data, _ = execute_query(sql)

    if data != -1:
        print("Review inserted with success!")
        return 0
    else:
        return -1
