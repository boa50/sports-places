from .connection import execute_query
from .utils import return_select, return_commit
from app.classes import UserWrite, UserUpdate


def get_user(user_provider_id: str):
    sql = f"""
        SELECT user_id, avatars.url as avatar_url, display_name FROM users
        LEFT JOIN avatars ON users.avatar = avatars.description
        WHERE user_provider_id = '{user_provider_id}';
    """

    data, column_names = execute_query(sql)

    return return_select(data, column_names)


def insert_user(user: UserWrite):
    sql = f"""
        INSERT INTO users (user_provider_id, avatar, display_name)
        VALUES ('{user.user_provider_id}', '{user.avatar}', '{user.display_name}')
        RETURNING user_id;
    """

    data, _ = execute_query(sql)

    return return_commit(data, "User inserted with success!")


def update_user(user: UserUpdate):
    sql = f"""
        UPDATE users
        SET avatar = '{user.avatar}', display_name = '{user.display_name}'
        WHERE user_id = '{user.user_id}'
        RETURNING user_id;
    """

    data, _ = execute_query(sql)

    return return_commit(data, "User inserted with success!")
