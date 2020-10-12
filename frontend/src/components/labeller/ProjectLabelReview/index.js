import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Divider, Typography } from "antd";
import "./styles.scss";
import Loading from "../../shared/Loading";

const ProjectLabelReview = (props) => {
  const [projectReviewData, setProjectReviewData] = useState(null);

  useEffect(() => {
    const fetchProjectReviewData = async () => {
      const res = await axios.get(
        `/api/projects/${props.match.params.projectId}`
      );

      setProjectReviewData({
        projectName: res.data.data.projectName,
        itemDataType: res.data.data.itemDataType,
        inputType: res.data.data.layout.type,
        tasksLabelled: res.data.data.tasksLabelled
          .map((task) => ({
            dateLabelled: task.labels[0].created_at,
            itemData: task.itemData,
            picked: task.labels[0].label_data.picked,
          }))
          .sort(
            (a, b) =>
              new Date(b.dateLabelled).getTime() -
              new Date(a.dateLabelled).getTime()
          ),
      });
    };

    fetchProjectReviewData();
  }, [props.match.params.projectId]);

  if (!projectReviewData) return <Loading />;

  return (
    <div className="review-container">
      <Divider orientation="left">
        <Typography.Title>
          Label Review for {projectReviewData.projectName}
        </Typography.Title>
      </Divider>

      <div className="review-list">
        <List
          itemLayout="vertical"
          size="small"
          pagination={{
            pageSize: 3,
          }}
          dataSource={projectReviewData.tasksLabelled}
          renderItem={(item) => (
            <List.Item key={item.title}>
              {projectReviewData.itemDataType === "IMAGE" ? (
                <img
                  className="review-data"
                  width={272}
                  alt=""
                  src={item.itemData}
                />
              ) : projectReviewData.itemDataType === "AUDIO" ? (
                <div className="review-data audio-preview">
                  <audio controls="disabled" src={item.itemData}></audio>
                </div>
              ) : null}
              <List.Item.Meta
                className="review-content"
                title={
                  <span>
                    {processTitle(
                      projectReviewData.inputType,
                      projectReviewData.itemDataType,
                      item.picked
                    )}
                  </span>
                }
                description={item.dateLabelled}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

const processTitle = (inputType, itemDataType, picked) => {
  let str;
  if (inputType === "checkbox") {
    str = `You have picked ${picked[0]}`;
    if (picked.length > 1) {
      for (let i = 1; i < picked.length - 1; i++) {
        str += `, ${picked[i]}`;
      }
      str += ` and ${picked[picked.length - 1]}`;
    }
  } else if (inputType === "radio") {
    str = `You picked ${picked}`;
  }

  str += ` for this ${
    itemDataType === "IMAGE" ? "image" : itemDataType === "AUDIO" ? "audio" : ""
  }.`;
  return str;
};

export default ProjectLabelReview;
