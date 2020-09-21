import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Button, Layout, Menu} from 'antd';
import { MenuOutlined, AppstoreOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import Table from './projecttable'

const { Sider, Content } = Layout;

class Dashboard extends React.Component {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  // toggle = () => {
  //   this.setState({
  //     showText: !this.state.showText,
  //     collapsed: !this.state.collapsed
  //   }, () => {
  //     console.log(this.state.showText);
  //   });
  // };

  render() {
    return (
      <Layout>
        <Sider style={{ background: "#00B7E0" }} trigger={null} collapsible collapsed={this.state.collapsed}>
          <Menu className="sidebar-textstyle" >

            {React.createElement(MenuOutlined, {
              className: 'trigger',
              onClick: this.toggle
            }
            )}

            <Menu.Item icon={<AppstoreOutlined style={{ fontSize: '20px' }} />}>
              Dashboard
            </Menu.Item>
            <Menu.Item icon={<UserOutlined style={{ fontSize: '20px' }} />}>
              Profile
            </Menu.Item >
            <Menu.Item icon={<SettingOutlined style={{ fontSize: '20px' }} />}>
              Manage Account
            </Menu.Item>
            <Menu.Item icon={<LogoutOutlined style={{ fontSize: '20px' }} />}>
              Sign Out
            </Menu.Item>
          </Menu>

        </Sider>
        <Content className="content-layout">
          <h2 className="header-style"> Your Contributions </h2>

          {/* <Button className="button-style" type="primary" >
            Label Files
          </Button> */}
          <Table>

          </Table>
        </Content>
      </Layout>
    );
  }
}

ReactDOM.render(<Dashboard />, document.getElementById('container'));