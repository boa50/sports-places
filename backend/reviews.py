import pandas as pd
import queries.queries as qu


def get_reviews():
    data, column_names = qu.get_reviews_data()

    df = pd.DataFrame(data, columns=column_names)

    df = df.drop(columns=["userid"])

    return df
