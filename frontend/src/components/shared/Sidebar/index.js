import React from "react";
import "./styles.scss";
import { Layout, Menu } from "antd";
import {
  MenuOutlined,
  AppstoreOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";

const { Sider } = Layout;

class Sidebar extends React.Component {
  static contextType = AuthContext;

  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  renderMenuItems = () => {
    const { user } = this.context;

    if (!user) return null;

    if (!Object.keys(user).length) {
      return (
        <Menu className="sidebar-textstyle" defaultSelectedKeys={["1"]}>
          {React.createElement(MenuOutlined, {
            className: "trigger",
            onClick: this.toggle,
          })}
          <Menu.Item
            key="1"
            icon={<LoginOutlined style={{ fontSize: "20px" }} />}
          >
            <Link to="/signin">Sign In</Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UserAddOutlined style={{ fontSize: "20px" }} />}
          >
            <Link to="/signup">Sign Up</Link>
          </Menu.Item>
        </Menu>
      );
    }

    return (
      <Menu className="sidebar-textstyle" defaultSelectedKeys={["1"]}>
        {React.createElement(MenuOutlined, {
          className: "trigger",
          onClick: this.toggle,
        })}
        <Menu.Item
          key="1"
          icon={<AppstoreOutlined style={{ fontSize: "20px" }} />}
        >
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined style={{ fontSize: "20px" }} />}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<LogoutOutlined style={{ fontSize: "20px" }} />}
        >
          Sign Out
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    return (
      <Sider
        style={{ background: "#00B7E0", height: "100vh" }}
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        {this.renderMenuItems()}
      </Sider>
    );
  }
}

export default Sidebar;
