import pandas as pd
import numpy as np
from app.queries import reviews as qu, places as places_qu
import app.data.utils as utils
from app.classes import ReviewWrite, PlaceWrite


def get_reviews(place_id: str) -> pd.DataFrame:
    data, column_names = qu.get_reviews(place_id=place_id)

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
        place_id = places_qu.insert_place(newPlace)

        if isinstance(place_id, list):
            review.place_id = place_id[0][0]

    review_data = qu.insert_review(review)

    if isinstance(review_data, list):
        return {"place_id": review.place_id, "is_new_place": is_new_place}
    else:
        return -1
