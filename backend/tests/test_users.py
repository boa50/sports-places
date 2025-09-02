from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def build_user_object(user_id: int, avatar_url: str, display_name: str):
    return {"user_id": user_id, "avatar_url": avatar_url, "display_name": display_name}


def mock_execute_query(mocker, data: list, column_names: list):
    mock_execute_query = mocker.patch("app.queries.users.execute_query")
    mock_execute_query.return_value = data, column_names


def test_get_user(mocker):
    data = [(1, "avatartUrl", "Some displayName")]
    column_names = ["user_id", "avatar_url", "display_name"]
    mock_execute_query(mocker, data=data, column_names=column_names)

    response = client.get("/users?user_provider_id=valid_user_provider")
    assert response.status_code == 200
    assert response.json() == [build_user_object(1, "avatartUrl", "Some displayName")]


def test_get_invalid_user(mocker):
    data = []
    column_names = ["user_id", "avatar_url", "display_name"]
    mock_execute_query(mocker, data=data, column_names=column_names)

    response = client.get("/users?user_provider_id=invalid_user_provider")
    assert response.status_code == 200
    assert response.json() == []


def test_insert_user_invalid_request(mocker):
    data = []
    column_names = ["user_id"]
    mock_execute_query(mocker, data=data, column_names=column_names)

    response = client.post(
        "/user",
        headers={"Content-Type": "application/json"},
        json={
            "user_provider_id": "someProviderID",
            "avatar": "TheTypeOfAvatar",
        },
    )
    assert response.status_code == 422


def test_insert_user(mocker):
    data = [(123,)]
    column_names = ["user_id"]
    mock_execute_query(mocker, data=data, column_names=column_names)

    response = client.post(
        "/user",
        headers={"Content-Type": "application/json"},
        json={
            "user_provider_id": "someUserProviderId",
            "avatar": "TheTypeOfAvatar",
            "display_name": "Nice Display Name",
        },
    )
    assert response.status_code == 200
    assert response.json() == [[123]]


def test_update_user_invalid_request(mocker):
    data = [(15,)]
    column_names = ["user_id"]
    mock_execute_query(mocker, data=data, column_names=column_names)

    response = client.post(
        "/userUpdate",
        headers={"Content-Type": "application/json"},
        json={
            "user_id": "text",
            "avatar": "TheTypeOfAvatar",
            "display_name": "Nice Display Name",
        },
    )
    assert response.status_code == 422


def test_update_user(mocker):
    data = [(15,)]
    column_names = ["user_id"]
    mock_execute_query(mocker, data=data, column_names=column_names)

    response = client.post(
        "/userUpdate",
        headers={"Content-Type": "application/json"},
        json={
            "user_id": 15,
            "avatar": "TheTypeOfAvatar",
            "display_name": "Nice Display Name",
        },
    )
    assert response.status_code == 200
    assert response.json() == [[15]]
