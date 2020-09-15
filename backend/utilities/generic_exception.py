class GenericErrorResponse:

    def __init__(self, message):
        self.message = message

    def to_response(self):
        return {
            "message": self.message,
        }
