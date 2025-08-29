from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def mock_execute_query(mocker, data: list, column_names: list):
    mock_execute_query = mocker.patch("app.queries.places.execute_query")
    mock_execute_query.return_value = data, column_names


def test_get_zero_places(mocker):
    mock_execute_query(mocker, data=[], column_names=[])

    response = client.get("/places")
    assert response.status_code == 200
    assert response.json() == []


def test_get_one_place(mocker):
    mock_execute_query(
        mocker, data=[(10, 10, 1)], column_names=["lat", "lng", "place_id"]
    )

    response = client.get("/places")
    assert response.status_code == 200
    assert response.json() == [{"lat": 10, "lng": 10, "place_id": 1}]


def test_get_many_places(mocker):
    mock_execute_query(
        mocker, data=[(10, 10, 1), (20, 15, 2)], column_names=["lat", "lng", "place_id"]
    )

    response = client.get("/places")
    assert response.status_code == 200
    assert response.json() == [
        {"lat": 10, "lng": 10, "place_id": 1},
        {"lat": 20, "lng": 15, "place_id": 2},
    ]
