import pandas as pd
import queries.queries as qu
from classes import ReviewWrite, PlaceWrite


def get_places():
    data, column_names = qu.get_places_data()

    df = pd.DataFrame(data, columns=column_names)

    return df


def get_reviews(place_id: str):
    data, column_names = qu.get_reviews_data(place_id=place_id)

    df = pd.DataFrame(data, columns=column_names)

    return df


def create_review(review: ReviewWrite):
    if review.place_id == -1:
        newPlace = PlaceWrite(**{"lat": review.lat, "lng": review.lng})
        place_id = qu.insert_place(newPlace)

        if isinstance(place_id, list):
            review.place_id = place_id[0][0]

    review_data = qu.insert_review_data(review)

    if isinstance(review_data, list):
        return review.place_id
    else:
        return -1
