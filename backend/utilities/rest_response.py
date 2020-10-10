class RestResponse:

    def __init__(self, data=None):
        self.data = data

    def to_dict(self):
        data = self.data if self.data else dict()
        rv = {'data': data}
        return rv
