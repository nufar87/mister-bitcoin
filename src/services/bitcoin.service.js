import { httpService } from './http.service';
import axios from 'axios';

export const bitcoinService = {
  getRate,
  getChartA,
};

var rate;
var chartA;
function getRate() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(rate), 100);
  });
}
function getChartA() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(chartA), 100);
  });
}

function askForRate() {
  const XHR = new XMLHttpRequest();
  const URL = `https://blockchain.info/tobtc?currency=USD&value=1`;

  XHR.onreadystatechange = () => {
    if (XHR.readyState === XMLHttpRequest.DONE && XHR.status === 200) {
      let res = JSON.parse(XHR.responseText);
      // console.log('res:', res)
      _setRate(res);
      return res;
    }
  };

  XHR.open('GET', URL);
  XHR.send();
}
function askForChartA() {
  const XHR = new XMLHttpRequest();
  const URL = `https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`;

  XHR.onreadystatechange = () => {
    if (XHR.readyState === XMLHttpRequest.DONE && XHR.status === 200) {
      let res = JSON.parse(XHR.responseText);
      // console.log('res:', res)
      _setChartA(res);
      return res;
    }
  };

  XHR.open('GET', URL);
  XHR.send();
}

function _setRate(res) {
  rate = res;
}
function _setChartA(res) {
  chartA = res;
}

(() => {
  askForRate();
  askForChartA();
})();
