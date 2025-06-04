import { engine } from "express-handlebars";

function hbsConfig(app) {
    app.engine('hbs', engine({
        extname: '.hbs',
        defaultLayout: 'main',
        layoutsDir: 'src/views/layouts/',
        partialsDir: 'src/views/partials/'
    }));

    app.set('view engine', 'hbs');
    app.set('views', 'src/views');
}

export default hbsConfig;
