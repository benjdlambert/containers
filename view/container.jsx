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

            this.populateData();
        }
        populateData() {
            Object.keys(this.state.dataRequirements)
                .forEach((key) => {
                    let URL = this.state.dataRequirements[key];
                    this.state.data[key] = ContainerData[URL];
                });
        }
        render() {
            return <ReactClass {...this.state} />
        }
    }
}
