import pandas as pd
from app.queries import places as qu


def get_places() -> pd.DataFrame:
    data, column_names = qu.get_places()

    df = pd.DataFrame(data, columns=column_names)

    return df
