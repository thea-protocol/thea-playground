import React, { useState } from "react";

import Controls from "./Controls";
import Donut from "./Donut";
import values from "./initial-values";

import "./Donut.css"

// https://codesandbox.io/s/yw3zyr0q2j?file=/src/palette.css:100-132

export default class DonutView extends React.Component {
  state = { values };

  onChange = values => this.setState({ values });

  render() {
    const { values } = this.state;

    return (
      <div className="donut-view">
        {/* <Controls onChange={this.onChange} values={values} /> */}
        <Donut series={values} />
      </div>
    );
  }
}


import React from 'react'

function DonutView() {
  return (
    <Donut series={values} />
    )
}

export default index