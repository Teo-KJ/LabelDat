import React, { useState, useEffect } from 'react';
import './styles.scss'

import { Select } from 'antd';
import { SettingOutlined } from '@ant-design/icons'

const { Option } = Select;

export default function (props) {

  const [opt, selectOpt] = useState("");

  function onChange(value) {
    props.selectType(value);
  }

  return (
    <div className="dropdown-container">
    {
      props.dropdown ? 
      <React.Fragment>
        <Select
          className="dropdown"
          showSearch
          placeholder={props.text}
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          value={props.value}
        >
          {props.list.map((_, i) => {
            return <Option key={i} value={_}>{_}</Option>
          })}
        </Select>
        <div 
          className={ `icon ${props.settingIsOpen ? " rotated-icon" : ""}` }
          onClick={()=>props.toggle(!props.settingIsOpen)}
        >
          <SettingOutlined 
            style={{color: "#b6b6b6"}} 
          />
        </div>
      </React.Fragment>
      :
      <React.Fragment>
      <div className="dropdown not-dropdown">Description</div> 
      <div 
        className={ `icon ${props.settingIsOpen ? " rotated-icon" : ""}` }
        onClick={()=>props.toggle(!props.settingIsOpen)}
      >
        <SettingOutlined 
          style={{color: "#b6b6b6"}} 
        />
      </div>
      </React.Fragment>
    }    
    </div>
  )  
}