def return_select(data: list | int | None, column_names: list | None):
    if isinstance(data, list):
        return data, column_names
    else:
        return list(), list()


def return_commit(data: list | int | None, message: str | None):
    if data != -1:
        if message is not None:
            print(message)
        return 0
    else:
        return -1
