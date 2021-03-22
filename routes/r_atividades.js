const express = require('express');
const router = express.Router();
const atividadeService = require('../services/atividadeService');

router.post('/criar', async(req,res) =>{
    let pergunta = req.body.pergunta;
    let perguntaAdicionada = await atividadeService.criarAtividade(pergunta);
    if(perguntaAdicionada){
        res.status(201).json(perguntaAdicionada);
    }else{
        res.status(500).json({mensagem:'Erro ao adicionar atividade'})
    }
})

router.post('/entregar',async(req,res) =>{
    let idAtividade = req.body.idAtividade;
    let resposta = req.body.resposta;
    let idAluno = req.body.idAluno;
    if(!idAluno || !resposta || !idAtividade){
        res.status(400).json({mensagem:'Faltam informações importantes'});
    }
    else{
        let entrega = await atividadeService.entregarAtividade(idAtividade,idAluno,resposta);

        res.status(200).json(entrega);
    }
})

router.post('/corrigir',async(req,res)=>{
    let idAtividade = req.body.idAtividade;
    let idAluno = req.body.idAluno;
    let correto = req.body.correto;
    if(!idAtividade || !idAluno || !correto){
        res.status(400).json({mensagem:'Faltam informações importantes'});
    }else{
        let atividade = await atividadeService.corrigirAtividade(idAtividade,idAluno,correto);
        res.status(200).json(atividade);
    }
})

module.exports = router;