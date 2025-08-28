from .connection import execute_query
from .utils import return_select


def get_avatars():
    sql = """
        SELECT description, url FROM avatars;
    """

    data, column_names = execute_query(sql)

    return return_select(data, column_names)


def get_avatar(avatar_description: str):
    sql = f"""
        SELECT url FROM avatars
        WHERE description = '{avatar_description}';
    """

    data, column_names = execute_query(sql)

    return return_select(data, column_names)
