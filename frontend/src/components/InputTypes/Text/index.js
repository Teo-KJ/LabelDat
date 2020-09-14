import React, { useState, useEffect } from 'react';

import { Input } from 'antd';

import './styles.scss'

export default function (props) {
  return(
    <Input placeholder={props.placeholder} />
  )
}