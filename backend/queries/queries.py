import pandas as pd
from dotenv import load_dotenv
from connection import execute_query


load_dotenv()


def get_reviews_data():
    sql = "SELECT * FROM Reviews;"

    data, column_names = execute_query(sql)

    df = pd.DataFrame(data, columns=column_names)

    return df


print(get_reviews_data())
