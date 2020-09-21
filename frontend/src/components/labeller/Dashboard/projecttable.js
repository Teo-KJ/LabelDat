import React from 'react';
import './index.css';
import { Button } from 'antd';

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [
                { projectname: 'lolxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', amtcomplete: 40, label: true, review: true},
                { projectname: 'ddd', amtcomplete: 40, label: true, review: false},
                { projectname: 'ssss', amtcomplete: 40, label: false, review: true},
                { projectname: 'qqq', amtcomplete: 80, label: true, review: true}
            ]
        }
    }

    renderTableHeader() {
        return (
       <tr>
           <td className = "tableheader-style1">Project</td>
           <td className = "tableheader-style2">Amount Completed</td>
           <td className = "tableheader-style3">Actions</td>
       </tr>)
    }

    renderTableData() {
        return this.state.projects.map((project) => {
            const {projectname, amtcomplete, label, review} = project 
            return (
                <tr key={projectname}>
                    <td className = "tablecontent-style1">{projectname}</td>
                    <td className = "tablecontent-style2">{amtcomplete + "%"}</td>
                    {this.renderButtons(label, review)}
                </tr>
            )
        })
    }

    renderButtons(label, review) {
        let labelbutton;
        let reviewbutton;
         if (label) {
           labelbutton = <Button className="button-style"> Label </Button>;
         } else {
           labelbutton = <Button className="button-style" disabled = "true"> Label </Button>;
         }
         if(review) {
            reviewbutton = <Button className="button-style"> Review </Button>;
         }
         else {
            reviewbutton = <Button className="button-style" disabled = "true"> Review </Button>;
         }
        return (
            <td className = "tablecontent-style3">
                <td>{labelbutton}</td>
                <td style = {{paddingLeft: '10px'}}>{reviewbutton}</td>
            </td>
        )
    }



    render() {
        return (
            <div>
                <table id='projects'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        <tr>{this.renderTableData()}</tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table 