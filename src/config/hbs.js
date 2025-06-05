import { engine } from "express-handlebars";

function hbsConfig(app) {
    app.engine('hbs', engine({
        extname: '.hbs',
        defaultLayout: 'main',
        layoutsDir: 'src/views/layouts/',
        partialsDir: 'src/views/partials/',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,    
            allowProtoMethodsByDefault: true
        },
        helpers: {
            showRating(rating) {
                const stars = Math.round(Number(rating));
                return '★'.repeat(stars) + '☆'.repeat(10 - stars);
            }
        },
    }));

    app.set('view engine', 'hbs');
    app.set('views', 'src/views');
}

export default hbsConfig;
