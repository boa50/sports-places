from queries.connection import execute_query


def get_reviews_data():
    sql = "SELECT * FROM Reviews;"

    data, column_names = execute_query(sql)

    return data, column_names
