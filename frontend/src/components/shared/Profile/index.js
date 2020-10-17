import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import "./styles.scss";
import { Table, Divider, Typography, Row, Col, Card, List } from "antd";
import { AuthContext } from "../../../context/auth-context";
import Loading from "../Loading";

const columns = [
  {
    title: "Rank",
    dataIndex: "rank",
  },
  {
    title: "Username",
    dataIndex: "username",
  },
  {
    title: "Number of Tasks Labelled",
    dataIndex: "labelledTasksCount",
  },
];

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      const res = await axios.get(`/api/users/leaderboard`);
      if (res.status === 200) {
        setProfileInfo({
          user: [
            { label: "Name", value: user.name },
            { label: "Username", value: user.username },
            { label: "Email", value: user.email },
            {
              label: "User Type",
              value:
                user.userType === "PROJECT_OWNER"
                  ? "Project Owner"
                  : "Labeller",
            },
            { label: "Sign Up Date", value: user.created_at },
          ],
          leaderboard: res.data.data
            .map((someUser) => ({
              username: someUser.username,
              labelledTasksCount: someUser.NumOfTasks,
            }))
            .sort((a, b) => b.labelledTasksCount - a.labelledTasksCount)
            .map((someUser, i) => {
              if (someUser.username === user.username) {
                return {
                  username: <b>{someUser.username}</b>,
                  labelledTasksCount: <b>{someUser.labelledTasksCount}</b>,
                  rank: <b>{i + 1}</b>,
                  key: i,
                };
              }

              return {
                username: someUser.username,
                labelledTasksCount: someUser.labelledTasksCount,
                rank: i + 1,
                key: i,
              };
            }),
        });
      }
    };
    fetchProfileInfo();
  }, [user.created_at, user.email, user.name, user.userType, user.username]);

  if (!profileInfo) return <Loading />;

  return (
    <div className="profile-container">
      <Divider orientation="left">
        <Typography.Title>Profile Page</Typography.Title>
      </Divider>

      <Row gutter={8} justify="space-around">
        <Col span={12}>
          <Card title={<b>User Info</b>} bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={profileInfo.user}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<b>{item.label}</b>}
                    description={item.value}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title={<b>Leaderboard</b>} bordered={false}>
            <Table
              size="small"
              columns={columns}
              dataSource={profileInfo.leaderboard}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
