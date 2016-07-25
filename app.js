require('isomorphic-fetch');

const ReactDOMServer = require('react-dom/server'),
    React = require('react'),
    express = require('express'),
    app = express();

app.use('/dist', express.static('dist'));

app.get('/data/:name', (request, response) => {
    response.send({ name: request.params.name });
});

app.get('/view', (request, response) => {
    const component = require('./view/component'),
        hbs = require('handlebars'),
        template = hbs.compile(require('fs').readFileSync(`${__dirname}/view/default.hbs`, 'utf-8')),
        renderedComponent = ReactDOMServer.renderToString(
            React.createElement(component, {})
        );

    response.send(
        template({ renderedComponent })
    );

});

app.listen(8080);
