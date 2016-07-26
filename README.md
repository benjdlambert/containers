# Containers

#### Welcome to benjdlambert/containers!

This repository is about some learnings about React Containers..

It helps to take code that looks like this:

```js
import React from 'react';
import ReactDOM from 'react-dom';
export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {};

        fetch('/data')
            .then((response) => response.json())
            .then((response) => this.setState({ data: response}))
            .then(() => {
                // go set up websockets
                // set up stores
                // npm install the world
                // alert to client
            })
    }
    render() {
        return <h1>{this.state.data.response}</h1>
    }
}
```

into something like this:

```js
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

```

#### Usage

```
npm install && node_modules/grunt/bin/grunt build && node app.js
```

```
http://localhost:8080/view
```
```
http://localhost:8080/data/time
```


### Raise a PR! Help me out!
##### makecontainersgreatagain
