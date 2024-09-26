import express from 'express';
import bodyParser from 'body-parser';
import urlRoutes from './routes/urlRoutes.js';
const app = express();


app.use(bodyParser.json());


app.use('/', urlRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
