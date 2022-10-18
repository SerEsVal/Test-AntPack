import express, { json } from 'express';
import morgan from 'morgan';

import { PlaceHolderUser } from './h.function'

//Importing routes
import user from './routes/r.users';

const app = express();

//MIDDELWARES
app.use(morgan('dev'));
app.use(json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET', 'POST');
    res.header('Allow', 'GET', 'POST');
    next();
});

//ROUTES
app.use('/api/users', user);
// FUNCION PARA CONSUMIR LA API https://jsonplaceholder.typicode.com/users AL INICIAR EL PROGRAMA
PlaceHolderUser();

export default app;