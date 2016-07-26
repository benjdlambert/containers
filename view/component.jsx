import React from 'react';
import ReactDOM from 'react-dom';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = { time: 'lols' };
        this.fetchData = this.fetchData.bind(this);

        this.fetchData();
    }
    fetchData() {
        fetch('/data/time')
            .then((response) => response.json())
            .then((response) => this.setState({ time: response.time }));
    }
    render() {
        return <h1>The current time in EPOCH is: {this.state.time}</h1>
    }
}
