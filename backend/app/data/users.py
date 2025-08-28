import pandas as pd
from app.queries import users as qu
from app.classes import UserWrite, UserUpdate


def get_user(user_provider_id: str) -> pd.DataFrame:
    data, column_names = qu.get_user(user_provider_id)

    df = pd.DataFrame(data, columns=column_names)

    return df


def create_user(user: UserWrite):
    user_id = qu.insert_user(user)

    return user_id


def update_user(user: UserUpdate):
    user_id = qu.update_user(user)

    return user_id
