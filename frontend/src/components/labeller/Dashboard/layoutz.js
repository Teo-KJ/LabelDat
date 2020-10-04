import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu } from "antd";
import {
  MenuOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Table from "./ProjectTable";
import { Redirect } from "react-router-dom";

const { Sider, Content } = Layout;

class Layoutz extends React.Component {
  state = {
    collapsed: true,
    redirect: null,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
   
    return (
      <Layout>
        <Sider
          style={{ background: "#00B7E0" }}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <Menu className="sidebar-textstyle" defaultSelectedKeys={["1"]}>
            {React.createElement(MenuOutlined, {
              className: "trigger",
              onClick: this.toggle,
            })}

            <Menu.Item
              key="1"
              icon={<AppstoreOutlined style={{ fontSize: "20px" }} />}
              onClick={() => {
                this.setState({ redirect: "/labellerdashboard" });
              }}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<UserOutlined style={{ fontSize: "20px" }} />}
              onClick={() => {
                this.setState({ redirect: "/profile" });
              }}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<SettingOutlined style={{ fontSize: "20px" }} />}
            >
              Manage Account
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<LogoutOutlined style={{ fontSize: "20px" }} />}
            >
              Sign Out
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className="content-layout">
          <h2 className="header-style"> Your Contributions </h2>
          <Table></Table>
        </Content>
      </Layout>
    );
  }
}

export default Layoutz;
