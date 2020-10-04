import React from 'react';
import './index.css';
import ReactToolTip from 'react-tooltip'
import { Button } from 'antd';
//actual one with axios get

class Project extends React.Component {
    constructor() {
        super()
        this.state = {
            projects: [
                {
                    projectid: '',
                    projectname: '',
                    datecreated: '',
                    amtcompleted: '',
                    taskscount: '',
                    label: '',
                    review: ''
                },
            ],
        }
    }

    componentDidMount() {
        axios
            .get('/projects')
            .then(({ data }) => {
                this.setState({
                    projectid: data.projectid,
                    projectname: data.projectName,
                    datacreated: data.dateCreated,
                    amtcompleted: ((data.percentageLabelled / 100) * taskscount).toFixed(0),
                    taskscount: data.tasksCount,
                    label: this.setBoolean(data.percentageLabelled),
                    review: this.setBoolean(data.percentageLabelled),
                });
            })
    }

    renderTableHeader() {
        return (
            <tr>
                <td className="tableheader-style1">Project</td>
                <td className="tableheader-style2">Amount Completed</td>
                <td className="tableheader-style3">Actions</td>
            </tr>)
    }

    renderTableData() {
        return this.state.projects.map((project) => {
            const { projectname, datecreated, amtcomplete, taskscount, label, review } = project
            return (
                <tr key={projectname}>
                    <td className="tablecontent-style1" data-for='custom-color' data-tip={"Date Created: " + datecreated}>
                        <ReactToolTip className="hover-style" id='custom-color' place='right' border
                            textColor='#fff' backgroundColor='#00B7E0' borderColor='#00B7E0' />{projectname}</td>
                    <td className="tablecontent-style2" data-for='custom-color' data-tip={((amtcomplete / 100) * taskscount).toFixed(0)
                        + "/" + taskscount + " Tasks Done"}>
                        {amtcomplete + "%"}</td>
                    {this.renderButtons(label, review)}
                </tr>
            )
        })
    }

    //redirect() { return (<Redirect push to={{pathname: '/projects/:projectId/tasks?count=5',}} /> )}

    dropdown() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        return (
            <Menu className="dropdown-style" >
                <Menu.Item key="5" onClick={() => { this.setState({ redirect: "/projects/:projectId/tasks?count=5" }); }}>
                    <a>5 tasks</a></Menu.Item>
                <Menu.Item key="10" onClick={() => { this.setState({ redirect: "/projects/:projectId/tasks?count=10" }); }}>
                    <a>10 tasks</a></Menu.Item>
                <Menu.Item key="20" onClick={() => { this.setState({ redirect: "/projects/:projectId/tasks?count=20" }); }}>
                    <a>20 tasks</a></Menu.Item>
            </Menu>
        )
    }

    renderButtons(label, review) {
        let labelbutton;
        let reviewbutton;
        if (label) {
            labelbutton = <Dropdown overlay={this.dropdown()}>
                <Button className="button-style"> Label </Button>
            </Dropdown>

        } else {
            labelbutton = <Button className="button-style" disabled="true"> Label </Button>;
        }
        if (review) {
            reviewbutton = <Button className="button-style"> Review </Button>;
        }
        else {
            reviewbutton = <Button className="button-style" disabled="true"> Review </Button>;
        }
        return (
            <td className="tablecontent-style3">
                <td>{labelbutton}</td>
                <td style={{ paddingLeft: '10px' }}>{reviewbutton}</td>
            </td>
        )
    }

    render() {
        return (
            <div>
                <table id='projects'>
                    <tbody>
                        <tr>{this.renderTableHeader()}
                        </tr>
                        <tr>{this.renderTableData()}</tr>
                    </tbody>
                </table>
            </div>
        )
    }

    setBoolean(props) {
        if (props == 0) {
            return false;
        }
        else if (props == 0) {
            return false;
        }
        else {
            return true;
        }
    }
}

export default Project