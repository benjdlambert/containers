require('isomorphic-fetch');

const ReactDOMServer = require('react-dom/server'),
    React = require('react'),
    express = require('express'),
    list = require('fs').readFileSync(__dirname + '/names.list', 'utf-8').split('\n'),
    app = express();

global.ServerState = {};

app.use('/dist', express.static('dist'));


app.get('/data/random_name', (request, response) => {
    name = list[Math.floor(Math.random()*list.length)];
    response.send({ name });
});

app.get('/view', (request, response) => {
    const component = require('./view/component'),
        hbs = require('handlebars'),
        template = hbs.compile(require('fs').readFileSync(`${__dirname}/view/default.hbs`, 'utf-8')),
        renderedComponent = ReactDOMServer.renderToString(
            React.createElement(component, {})
        );

    response.send(
        template({ renderedComponent, serverState: JSON.stringify(ServerState) })
    );

});

app.listen(8080);
