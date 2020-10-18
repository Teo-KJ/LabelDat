import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.scss";
import ContributionsTable from "./ContributionsTable";
import Loading from "../../shared/Loading";
import { Typography, Divider, Empty } from "antd";

const Dashboard = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get("/api/projects");

      if (res.status === 200) {
        setProjects(
          res.data.data.contributedProjects.map((project) => ({
            ...project,
            itemDataType:
              project.itemDataType === "IMAGE"
                ? "Image"
                : project.itemDataType === "AUDIO"
                ? "Audio"
                : "",
            inputType:
              project.layout.type === "checkbox"
                ? "Checkbox"
                : project.layout.type === "radio"
                ? "Radio"
                : "",
            key: project.id,
            dateCreated: new Date(project.created_at).toDateString(),
          }))
        );
      }
    };

    fetchProjects();
  }, []);

  if (!projects) return <Loading />;

  if (!projects.length)
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={<span>There are no available projects to label.</span>}
      ></Empty>
    );

  return (
    <div className="dashboard-container">
      <Divider orientation="left">
        <Typography.Title>Dashboard</Typography.Title>
      </Divider>

      <div className="projects-table">
        <ContributionsTable contributedProjects={projects} />
      </div>
    </div>
  );
};

export default Dashboard;
