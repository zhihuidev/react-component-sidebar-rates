import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {

  constructor() {
    super();
    this.state = {
        rates:[],
    }
    this.getRates = this.getRates.bind(this)
  }

  getRates () {
    return fetch("https://v30y88uub3.execute-api.ap-southeast-2.amazonaws.com/beta/nzdratelist")
      .then(
        (res) => res.json()
      )
      .then(
        (resJson) => {console.log(resJson);this.setState({rates:resJson})}
      )
      .catch((err) => {console.log(err)})
  }

  componentDidMount () {
    setInterval(() => {this.getRates()}, 3000);
  }
 
  render () {
    const rates = this.state.rates
    return (
      <div>
        {
          rates.map(rate => {
            return (
              <div>Rate: {rate}</div>
            )
          })
        }
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);