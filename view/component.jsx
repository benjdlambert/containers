import React from 'react';
import ReactDOM from 'react-dom';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = { name: '@benjdlambert' };
        this.fetchData = this.fetchData.bind(this);

        this.fetchData();
    }
    fetchData() {
        fetch('/data/random_name')
            .then((response) => response.json())
            .then((response) => this.setState({ name: response.name }));
    }
    render() {
        return <h1>Shout if you are: {this.state.name}</h1>
    }
}
