import pandas as pd
import queries.queries as qu
from classes import Review


def get_reviews():
    data, column_names = qu.get_reviews_data()

    df = pd.DataFrame(data, columns=column_names)

    df = df.drop(columns=["userid"])

    return df


def create_review(review: Review):
    print(review)
    # return qu.insert_review_data(review)

    return 0
