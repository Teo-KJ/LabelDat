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
          <div className="trigger" onClick={this.toggle}>
            <MenuOutlined />
          </div>

          <Menu.Item
            key="1"
            icon={<LoginOutlined style={{ fontSize: "20px" }} />}
          >
            <span className="link">
              <Link to="/signin" className="link">
                Sign In
              </Link>
            </span>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UserAddOutlined style={{ fontSize: "20px" }} />}
          >
            <span className="link">
              <Link to="/signup" className="link">
                Sign Up
              </Link>
            </span>
          </Menu.Item>
        </Menu>
      );
    }

    return (
      <Menu className="sidebar-textstyle" defaultSelectedKeys={["1"]}>
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
        <Menu.Item key="2" icon={<UserOutlined style={{ fontSize: "20px" }} />}>
          <span className="link">
            <Link to="/profile">Profile</Link>
          </span>
        </Menu.Item>
        <Menu.Item
          key="3"
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
