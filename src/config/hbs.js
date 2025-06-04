import handlebars from "express-handlebars";

function hbsConfig(app) {
    // Set up Handlebars view engine
    app.engine('hbs', handlebars({
        extname: '.hbs',
        defaultLayout: 'main',
        layoutsDir: 'src/views/layouts/',
        partialsDir: 'src/views/partials/'
    }));
    
    app.set('view engine', 'hbs');
    app.set('views', 'src/views');
}

export default hbsConfig;