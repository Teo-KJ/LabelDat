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
  PlusCircleOutlined,
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

    let path = window.location.pathname;

    if (!Object.keys(user).length) {
      return (
        <Menu
          className="sidebar-textstyle"
          defaultSelectedKeys={[
            path === "/signup" ? "1" : path === "/signin" ? "2" : null,
          ]}
        >
          <div className="trigger" onClick={this.toggle}>
            <MenuOutlined />
          </div>

          <Menu.Item
            key="1"
            icon={<UserAddOutlined style={{ fontSize: "20px" }} />}
          >
            <span className="link">
              <Link to="/signup" className="link">
                Sign Up
              </Link>
            </span>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<LoginOutlined style={{ fontSize: "20px" }} />}
          >
            <span className="link">
              <Link id="signin-item" to="/signin" className="link">
                Sign In
              </Link>
            </span>
          </Menu.Item>
        </Menu>
      );
    }

    return (
      <Menu
        className="sidebar-textstyle"
        defaultSelectedKeys={[
          path === "/"
            ? "1"
            : path === "/create-project"
            ? "2"
            : path === "/profile"
            ? "3"
            : null,
        ]}
      >
        <div className="trigger" onClick={this.toggle}>
          <MenuOutlined />
        </div>
        <Menu.Item
          key="1"
          icon={<AppstoreOutlined style={{ fontSize: "20px" }} />}
        >
          <span className="link">
            <Link to="/">Dashboard</Link>
          </span>
        </Menu.Item>
        {user.userType === "PROJECT_OWNER" ? (
          <Menu.Item
            key="2"
            icon={<PlusCircleOutlined style={{ fontSize: "20px" }} />}
          >
            <span className="link">
              <Link to="/create-project">Create Project</Link>
            </span>
          </Menu.Item>
        ) : null}
        <Menu.Item key="3" icon={<UserOutlined style={{ fontSize: "20px" }} />}>
          <span className="link">
            <Link to="/profile">Profile</Link>
          </span>
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<LogoutOutlined style={{ fontSize: "20px" }} />}
          onClick={() => this.context.signOut()}
        >
          <span className="link">Sign Out</span>
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    return (
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        {this.renderMenuItems()}
      </Sider>
    );
  }
}

export default Sidebar;
