class RestResponse:

    def __init__(self, status_code=None, data=None):
        self.status_code = status_code
        self.data = data

    def to_dict(self):
        data = self.data if self.data else dict()
        rv = {'status_code': self.status_code, 'data': data}
        return rv
