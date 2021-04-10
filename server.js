const express = require('express');
const app = express();
const atividadeService = require('./services/atividadeService');

app.use(express.json());
app.use(express.urlencoded({limit:'10mb',extended:false}));

const routerAtividades = require('./routes/r_atividades');

app.use('/atividades',routerAtividades);

atividadeService.obterAtividadesEntregues();

app.listen(3000,() => console.log('Server Microsserviços Atividades - ATIVO ==> porta 3000'));