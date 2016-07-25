import React from 'react';
import ReactDOM from 'react-dom';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = { name: 'none' };
        this.fetchData = this.fetchData.bind(this);

        this.fetchData();
    }
    fetchData() {
        fetch('/data/ben')
            .then((response) => response.json())
            .then((response) => this.setState({ name: response.name }));
    }
    render() {
        return <h1>Im a test component {this.state.name}</h1>
    }
}
