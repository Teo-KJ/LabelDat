class AnalyticsResponse:
    def __init__(self, project_name=None, overall_percentage=None, label_progress=None):
        self.project_name = project_name
        self.overall_percentage = overall_percentage
        self.label_progress = label_progress

    def to_dict(self):
        return {
            "projectName": self.project_name if self.project_name else "Project",
            "overallPercentage": self.overall_percentage,
            "labelProgress": self.label_progress if self.label_progress else list()
        }