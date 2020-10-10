class UserProjectsResults:
    def __init__(self, projects: [], contributed_projects: []):
        self.projects = projects
        self.contributed_projects = contributed_projects

    def to_response(self, user_id):
        return {
            "projects": [pj.to_created_project_response() for pj in self.projects],
            "contributedProjects": [pj.to_contributed_project_response(user_id) for pj in self.contributed_projects]
        }
