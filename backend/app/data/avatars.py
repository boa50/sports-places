import pandas as pd
from app.queries import avatars as qu


def get_avatars() -> pd.DataFrame:
    data, column_names = qu.get_avatars()

    df = pd.DataFrame(data, columns=column_names)

    return df


def get_avatar(avatar_description: str) -> pd.DataFrame:
    data, column_names = qu.get_avatar(avatar_description=avatar_description)

    df = pd.DataFrame(data, columns=column_names)

    return df
