import React from 'react';

export default function(ReactClass, dataRequirements) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                data: {},
                dataRequirements: dataRequirements.data(props)
            }

            this.populateData = this.populateData.bind(this);
        }
        componentWillMount() {
            this.populateData();
        }
        componentDidMount() {
            this.pollForChanges();
        }
        makeRequestAndSetState(URL) {
            return fetch(URL)
                .then((response) => response.json())
                .then((response) => ServerState[URL] = response);
        }
        populateData() {
            Object.keys(this.state.dataRequirements)
                .forEach((key) => {
                    let URL = this.state.dataRequirements[key];
                    if (!ServerState[URL]) {
                        this.makeRequestAndSetState(URL)
                            .then(() => this.populateData());
                    } else {
                        this.state.data[key] = ServerState[URL];
                    }
                });
        }
        pollForChanges() {
            Object.keys(this.state.dataRequirements)
                .forEach((key) => {
                    let URL = this.state.dataRequirements[key];
                    setInterval(() => {
                        this.makeRequestAndSetState(URL)
                            .then(() => this.populateData())
                            .then(() => this.forceUpdate());
                    }, 1000)
                });
        }
        render() {
            return <ReactClass {...this.state} />
        }
    }
}
