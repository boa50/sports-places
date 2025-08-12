import pandas as pd
import numpy as np
import queries.queries as qu
import utils
from classes import ReviewWrite, PlaceWrite


def get_places():
    data, column_names = qu.get_places_data()

    df = pd.DataFrame(data, columns=column_names)

    return df


def get_reviews(place_id: str):
    data, column_names = qu.get_reviews_data(place_id=place_id)

    df = pd.DataFrame(data, columns=column_names)

    if df.shape[0] > 0:

        def fill_route_link_trusted(row):
            if row["route_link"] is not None:
                return utils.check_trusted_url(row["route_link"])["trusted"]
            else:
                return np.nan

        df["route_link_trusted"] = df.apply(
            lambda row: fill_route_link_trusted(row), axis=1
        )

    return df


def create_review(review: ReviewWrite):
    is_new_place = False

    if review.place_id == -1:
        is_new_place = True
        newPlace = PlaceWrite(**{"lat": review.lat, "lng": review.lng})
        place_id = qu.insert_place(newPlace)

        if isinstance(place_id, list):
            review.place_id = place_id[0][0]

    review_data = qu.insert_review_data(review)

    if isinstance(review_data, list):
        return {"place_id": review.place_id, "is_new_place": is_new_place}
    else:
        return -1
