import pandas as pd
import queries.queries as qu


def get_reviews():
    data = qu.get_reviews_data()

    df = pd.DataFrame(data, columns=["lat", "long", "text"])

    return df
