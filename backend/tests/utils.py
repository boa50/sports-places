def build_mock_execute_query(queries_path: str):
    execute_query_path = f"app.queries.{queries_path}.execute_query"

    def mock_execute_query(mocker, data: list, column_names: list):
        mock_execute_query = mocker.patch(execute_query_path)
        mock_execute_query.return_value = data, column_names

    return mock_execute_query
