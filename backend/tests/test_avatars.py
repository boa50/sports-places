from fastapi.testclient import TestClient
from .utils import build_mock_execute_query

from app.main import app

client = TestClient(app)


def build_avatar_object(description: str, url: str):
    return {"description": description, "url": url}


mock_execute_query = build_mock_execute_query("avatars")


def test_get_available_avatars(mocker):
    data = [("r", "url1"), ("g", "url2")]
    column_names = ["description", "url"]
    mock_execute_query(mocker, data=data, column_names=column_names)

    response = client.get("/avatars")
    assert response.status_code == 200
    assert response.json() == [
        build_avatar_object("r", "url1"),
        build_avatar_object("g", "url2"),
    ]


def test_get_single_avatar_url(mocker):
    data = [("urlRandom",)]
    column_names = ["url"]
    mock_execute_query(mocker, data=data, column_names=column_names)

    response = client.get("/avatarUrl?avatar_description=test")
    assert response.status_code == 200
    assert response.json() == [{"url": "urlRandom"}]


def test_get_no_avatar_url(mocker):
    data = []
    column_names = ["url"]
    mock_execute_query(mocker, data=data, column_names=column_names)

    response = client.get("/avatarUrl?avatar_description=someThatDoesntExist")
    assert response.status_code == 200
    assert response.json() == []
