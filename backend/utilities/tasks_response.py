class TasksAndLayoutResponse:
    def __init__(self, layout=None, data=None):
        self.data = data
        self.layout = layout

    def to_dict(self):
        return {
            'layout': self.layout if self.layout else dict(),
            'data': self.data if self.data else dict()
        }
