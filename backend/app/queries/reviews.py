from .connection import execute_query
from .utils import return_select, return_commit
from app.classes import ReviewWrite


def get_reviews(place_id: str):
    sql = f"""
        SELECT users.display_name as user_display_name, users.avatar as user_avatar_description, 
            experience_date, rating, route_link 
        FROM reviews
        LEFT JOIN users ON reviews.user_id = users.user_id
        WHERE place_id = {place_id}
        ORDER BY experience_date DESC;
    """

    data, column_names = execute_query(sql)

    return return_select(data, column_names)


def insert_review(review: ReviewWrite):
    sql = f"""
        INSERT INTO reviews (
            user_id, 
            place_id, 
            experience_date, 
            rating
            {", route_link" if review.route_link is not None else ""}
        )
        VALUES (
            {review.user_id}, 
            {review.place_id}, 
            '{review.experience_date}', 
            {review.rating} 
            {f", '{review.route_link}'" if review.route_link is not None else ""}
        )
        RETURNING review_id;
    """

    data, _ = execute_query(sql)

    return return_commit(data, "Review inserted with success!")
