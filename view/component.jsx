import React from 'react';
import ReactDOM from 'react-dom';
import Container from './container';

class MyTimeComponent extends React.Component {
    render() {
        return <h1>The current time is: {this.props.data.timeEndpoint.time}</h1>
    }
}

export default Container(
    MyTimeComponent,
    {
        data(props) {
            return {
                timeEndpoint: 'http://localhost:8080/data/time'
            }
        }
    }
)
