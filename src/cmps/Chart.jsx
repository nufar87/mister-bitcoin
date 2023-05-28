import React, { Component } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
} from 'recharts';

export class Chart extends Component {
  render() {
    const data = this.props.chart.values.map((val, idx) => ({
      date: 'Hour - '+idx,
      value: val.y,
    }));

    return (
      <div>
        <LineChart width={600} height={300} data={data}>
          <Line type='monotone' dataKey='value' stroke='#8721ff' />
          {/* <CartesianGrid stroke='#ccc' /> */}
          <CartesianGrid stroke='#ccc'  />
          <XAxis dataKey='date' />
          <Tooltip />
        </LineChart>
      </div>
    );
  }
}