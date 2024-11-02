from http import HTTPStatus

def serialize_image(data):
    ...

possible_key_error = {
    "Error": {"Message": "Incorrect format key"},
    "Example of current key format": {
        "Type: png, jpeg..."
    }
}, HTTPStatus.BAD_REQUEST


__all__ = ['serialize_number', 'possible_key_error']