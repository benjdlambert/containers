require('isomorphic-fetch');


global.ServerState = {};
ServerState['http://localhost:8080/data/time'] = {
    time: Date.now()
};

const ReactDOMServer = require('react-dom/server'),
    React = require('react'),
    express = require('express'),
    app = express();

app.use('/dist', express.static('dist'));

app.get('/data/time', (request, response) => {
    response.send({ time: Date.now() });
});

app.get('/view', (request, response) => {
    const component = require('./view/component'),
        hbs = require('handlebars'),
        template = hbs.compile(require('fs').readFileSync(`${__dirname}/view/default.hbs`, 'utf-8')),
        renderedComponent = ReactDOMServer.renderToString(
            React.createElement(component, {})
        );

    response.send(
        template({ renderedComponent, ServerState: JSON.stringify(ServerState) })
    );

});

app.listen(8080);
