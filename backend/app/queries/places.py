from .connection import execute_query
from .utils import return_select, return_commit
from app.classes import PlaceWrite


def get_places():
    sql = """
        SELECT * FROM places;
    """

    data, column_names = execute_query(sql)

    return return_select(data, column_names)


def insert_place(place: PlaceWrite):
    sql = f"""
        INSERT INTO places (lat, lng)
        VALUES ({place.lat}, {place.lng})
        RETURNING place_id;
    """

    data, _ = execute_query(sql)

    return return_commit(data, "Place inserted with success!")
