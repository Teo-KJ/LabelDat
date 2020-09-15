import React, { useState, useEffect } from 'react';

import './styles.scss'

export default function (props) {
  return(
    <div className="description">
      <h2><strong>{props.title}</strong></h2>
      <p>{props.description}</p>
    </div>
  )
}