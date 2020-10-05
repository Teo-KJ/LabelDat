class TasksAndLayoutResponse:
    def __init__(self, project_name=None, layout=None, data=None):
        self.data = data
        self.layout = layout
        self.project_name = project_name

    def to_dict(self):
        return {
            'layout': self.layout if self.layout else dict(),
            'data': self.data if self.data else dict(),
            'projectName': self.project_name if self.project_name else "Project"
        }
