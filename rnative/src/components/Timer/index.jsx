import React, {Component} from 'react'
import {Text} from 'react-native'


export default class Timer extends Component {


  componentDidMount() {
    this.init(this.props)
  }
  componentWillReceiveProps(props) {
    this.clearInterval()
    this.init(props)
  }
  componentWillUnmount() {
    this.clearInterval()
  }

  updateValue (date) {
    if (!date) {
      if (this.fixedAt) {
        date = this.fixedAt
      }else {
        date = new Date();
      }
    }

    var value = date.getTime() - this.startedAt.getTime();
    this.value = value < 0 ? 0 : (value > this.max ? this.max : value);
    if (this.value >= this.max) {
      clearInterval(this.updateInterval)
    }

    this.remain = this.max - this.value;
    if ((this.value / this.max) < 0.66) {
      this.color = 'green';
    } else {
      this.color = 'red';
    }

    this.setState({
      color: this.color,
      value: this.value,
    });
  }

  clearInterval(){
    if(this.updateInterval){
      clearInterval(this.updateInterval);
    }
  }
  init(props){
    var currentDate = new Date();

    if (!this.updateIntervalValue) {
      this.updateIntervalValue = this.props.type == 'circle' ? 100 : 1000
    }

    this.active = props.active;
    this.max = props.max;
    this.value = props.value;

    //remain = прошло , надо переименовать
    this.remain = props.remain;

    if (props.finishedAt) {
      this.finishedAt = new Date(props.finishedAt);
    }

    if (props.startedAt) {
      this.startedAt = new Date(props.startedAt);
    }

    if (props.fixedAt) {
      this.fixedAt = new Date(props.fixedAt);
    }

    if (this.max == null && this.finishedAt && this.startedAt) {
      this.max = this.finishedAt.getTime() - this.startedAt.getTime();
    }

    if (this.value == null && this.remain && this.max) {
      this.value = this.max - this.remain;
    }

    if (this.fixedAt == null && !this.active) {
      this.fixedAt = currentDate;
    }

    if (this.startedAt == null/* && this.value*/) {
      this.startedAt = new Date();

      //преобразовать эту фигню в миллисекунды
      this.startedAt.setTime(currentDate.getTime() - this.value);  // вычесть из нее валюь
    }

    if (this.active) {
      this.updateInterval = setInterval(function () {
        this.updateValue();
      }.bind(this), this.updateIntervalValue || 1000);
    }

    this.updateValue();
  }


  render() {


      let number = Math.round(this.remain / 1000);

      let min = Math.floor(number / 60)
      number = number - min * 60
      if (number < 10) {
        number = '0' + number
      }
      return <Text>{min}:{number}</Text>


  }
}
