const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({limit:'10mb',extended:false}));

const routerAtividades = require('./routes/r_atividades');

app.use('/atividades',routerAtividades);

app.listen(3000,() => console.log('Server 1 Rodando porta 3000'));