import React, { Component } from 'react';
import { Chart } from '../cmps/Chart';
import { bitcoinService } from '../services/bitcoin.service';

export class Statistics extends Component {
  state = {
    chartA: null,
  };

  componentDidMount() {
    this.loadChart();
  }

  loadChart = async () => {
    try {
      const chartA = await bitcoinService.getChartA();
      this.setState({ chartA });
    } catch (err) {
      console.log('err:', err);
    }
  };
  render() {
   const { chartA } = this.state;
   if (!chartA) return <div className='loader'>loading...</div>;

   return (
   <div> 
      <h2> Bitcoin to Dollar rate</h2>
      {chartA && <Chart chart={chartA} />}
    </div>
   )
  }

}
