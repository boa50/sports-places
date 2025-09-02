import pytest
from fastapi.testclient import TestClient
from .utils import build_mock_execute_query
from app.classes import PlaceWrite

from app.main import app

client = TestClient(app)


mock_execute_query = build_mock_execute_query("reviews")


def build_review_object(
    user_display_name: str,
    user_avatar_description: str,
    experience_date: int,
    rating: int,
    route_link: str | None,
    route_link_trusted: bool | None,
):
    return {
        "user_display_name": user_display_name,
        "user_avatar_description": user_avatar_description,
        "experience_date": experience_date,
        "rating": rating,
        "route_link": route_link,
        "route_link_trusted": route_link_trusted,
    }


@pytest.fixture
def mock_trusted_domains(monkeypatch):
    monkeypatch.setenv(
        "TRUSTED_EXTERNAL_DOMAINS", "http://www.valid.com http://www.valid2.com"
    )


def test_check_trusted_url(mock_trusted_domains):
    response = client.get("/checkLink?url=http://www.valid2.com/akujsdh")
    assert response.status_code == 200
    assert response.json() == {"trusted": True}


def test_check_untrusted_url(mock_trusted_domains):
    response = client.get("/checkLink?url=http://www.invalid.com/fasd")
    assert response.status_code == 200
    assert response.json() == {"trusted": False}


def test_get_reviews_from_place_request_error():
    response = client.get("/reviews")
    assert response.status_code == 422


def test_get_reviews_from_place_one_review(mocker, mock_trusted_domains):
    mock_execute_query(
        mocker=mocker,
        data=[
            ("UserDisplayNameRandom", "userAvatarRandom", 1756339200000, 3, None),
        ],
        column_names=[
            "user_display_name",
            "user_avatar_description",
            "experience_date",
            "rating",
            "route_link",
        ],
    )

    response = client.get("/reviews?place_id=1")
    assert response.status_code == 200
    assert response.json() == [
        build_review_object(
            user_display_name="UserDisplayNameRandom",
            user_avatar_description="userAvatarRandom",
            experience_date=1756339200000,
            rating=3,
            route_link=None,
            route_link_trusted=None,
        )
    ]


def test_get_reviews_from_place_many_reviews(mocker, mock_trusted_domains):
    mock_execute_query(
        mocker=mocker,
        data=[
            ("UserDisplayNameRandom", "userAvatarRandom", 1756339200000, 3, None),
            ("UserDisplayNameRandom2", "userAvatarRandom2", 1756339200001, 1, None),
        ],
        column_names=[
            "user_display_name",
            "user_avatar_description",
            "experience_date",
            "rating",
            "route_link",
        ],
    )

    response = client.get("/reviews?place_id=1")
    assert response.status_code == 200
    assert response.json() == [
        build_review_object(
            user_display_name="UserDisplayNameRandom",
            user_avatar_description="userAvatarRandom",
            experience_date=1756339200000,
            rating=3,
            route_link=None,
            route_link_trusted=None,
        ),
        build_review_object(
            user_display_name="UserDisplayNameRandom2",
            user_avatar_description="userAvatarRandom2",
            experience_date=1756339200001,
            rating=1,
            route_link=None,
            route_link_trusted=None,
        ),
    ]


def test_get_reviews_from_place_with_trusted_link(mocker, mock_trusted_domains):
    mock_execute_query(
        mocker=mocker,
        data=[
            (
                "UserDisplayNameRandom",
                "userAvatarRandom",
                1756339200000,
                3,
                "http://www.valid.com/akjsdh",
            ),
        ],
        column_names=[
            "user_display_name",
            "user_avatar_description",
            "experience_date",
            "rating",
            "route_link",
        ],
    )

    response = client.get("/reviews?place_id=1")
    assert response.status_code == 200
    assert response.json() == [
        build_review_object(
            user_display_name="UserDisplayNameRandom",
            user_avatar_description="userAvatarRandom",
            experience_date=1756339200000,
            rating=3,
            route_link="http://www.valid.com/akjsdh",
            route_link_trusted=True,
        )
    ]


def test_get_no_reviews_from_place(mocker):
    mock_execute_query(
        mocker=mocker,
        data=[],
        column_names=[
            "user_display_name",
            "user_avatar_description",
            "experience_date",
            "rating",
            "route_link",
        ],
    )

    response = client.get("/reviews?place_id=-1")
    assert response.status_code == 200
    assert response.json() == []


def test_create_review_new_place(mocker):
    new_place_id = 25
    lat = 0.12386123
    lng = 20.917263981

    mock_execute_query(mocker=mocker, data=[(17,)], column_names=["review_id"])

    mock_insert_place = mocker.patch("app.queries.places.insert_place")
    mock_insert_place.return_value = [[new_place_id]]

    response = client.post(
        "/review",
        headers={"Content-Type": "application/json"},
        json={
            "user_id": 123,
            "place_id": -1,
            "lat": lat,
            "lng": lng,
            "experience_date": "1756339200000",
            "rating": 2,
            "route_link": None,
        },
    )

    mock_insert_place.assert_called_once_with(PlaceWrite(**{"lat": lat, "lng": lng}))
    assert response.status_code == 200
    assert response.json() == {
        "is_new_place": True,
        "place_id": new_place_id,
    }


def test_create_review_existing_place(mocker):
    place_id = 250

    mock_execute_query(mocker=mocker, data=[(17,)], column_names=["review_id"])
    mock_insert_place = mocker.patch("app.queries.places.insert_place")

    response = client.post(
        "/review",
        headers={"Content-Type": "application/json"},
        json={
            "user_id": 123,
            "place_id": place_id,
            "lat": 20.1823765189,
            "lng": -15.19237619,
            "experience_date": "1756339200000",
            "rating": 5,
            "route_link": "http://www.test.com",
        },
    )

    mock_insert_place.assert_not_called()
    assert response.status_code == 200
    assert response.json() == {
        "is_new_place": False,
        "place_id": place_id,
    }


def test_create_review_invalid_input(mocker):
    mock_execute_query(mocker=mocker, data=[], column_names=["review_id"])

    response = client.post(
        "/review",
        headers={"Content-Type": "application/json"},
        json={
            "user_id": "some text",
            "place_id": 10,
            "lat": 20.1823765189,
            "lng": -15.19237619,
            "experience_date": "1756339200000",
            "rating": 5,
            "route_link": "http://www.test.com",
        },
    )

    assert response.status_code == 422
