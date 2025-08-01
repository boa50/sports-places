import pandas as pd
import queries.queries as qu
from classes import Review


def get_places():
    data, column_names = qu.get_places_data()

    df = pd.DataFrame(data, columns=column_names)

    return df


def get_reviews(place_id: str):
    data, column_names = qu.get_reviews_data(place_id=place_id)

    df = pd.DataFrame(data, columns=column_names)

    return df


def create_review(review: Review):
    print(review)
    # return qu.insert_review_data(review)

    return 0
