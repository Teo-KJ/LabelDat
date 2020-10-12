class AnalyticsResponse:
    def __init__(self, project_name=None, num_tasks=None, overall_percentage=None, label_progress=None):
        self.project_name = project_name
        self.num_tasks = num_tasks
        self.overall_percentage = overall_percentage
        self.label_progress = label_progress

    def to_dict(self):
        return {
            "projectName": self.project_name if self.project_name else "Project",
            "numTasks": self.num_tasks,
            "overallPercentage": self.overall_percentage,
            "labelProgress": self.label_progress if self.label_progress else list()
        }