from models.item_data_type import ItemDataType


class TasksAndLayoutResponse:
    def __init__(self, project_name=None, layout=None, item_data_type=None, data=None):
        self.data = data
        self.layout = layout
        self.project_name = project_name
        self.item_data_type = item_data_type

    def to_dict(self):
        return {
            'layout': self.layout if self.layout else dict(),
            'data': self.data if self.data else dict(),
            'projectName': self.project_name if self.project_name else "Project",
            'itemDataType': self.item_data_type if self.item_data_type else ItemDataType.IMAGE
        }
