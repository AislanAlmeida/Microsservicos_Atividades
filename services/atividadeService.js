const alunoService = require('./alunoService');
const atividadeDAO = require('../dados/atividadesDAO');
const axios = require('axios');

class Atividade{

    static async obterAtividadePorId(idAtividade){
        let atividades = atividadeDAO.obterAtividades();
        return atividades.find(a => a.id == idAtividade);
    }

    static async criarAtividade(pergunta){
        let alunos = await alunoService.obterAlunos();
        let atividade = {};
        atividade.id = Date.now();
        atividade.pergunta = pergunta;
        atividade.alunosPresentes = alunos;
        
        let atividadeSalva = atividadeDAO.salvarAtividade(atividade)
        return atividadeSalva;
    }

    static async entregarAtividade(idAtividade,idAluno,resposta){
        let atividade = await this.obterAtividadePorId(idAtividade);
        atividade.aluno = await alunoService.obterAlunoPorId(idAluno);
        atividade.resposta = resposta;
        delete atividade.alunosPresentes;
        
        let atividadeSalva = atividadeDAO.salvarAtividadeEntregue(atividade);
        return atividadeSalva;
    }

    static async obterDesempenho(idAluno){
        return null;
    }
    static async obterListaDesempenho(){
        return null;
    }

    static async obterAtividadesEntregues(){
        let atividades = await atividadeDAO.obterAtividadesEntregues();
        return atividades;
    }

    static async corrigirAtividade(idAtividade, idAluno, isCorrect){

        console.log(' ===> Corrigindo atividade');

        let atividades = await this.obterAtividadesEntregues();
        let atividadeFiltrada = atividades.find(a => a.id == idAtividade && a.aluno.id == idAluno);
        if(atividadeFiltrada){
            atividadeFiltrada.correta = isCorrect;
            let atividadeModificada = await atividadeDAO.corrigirAtividadeEntregue(atividadeFiltrada);
            console.log({metodo:'corrigir Atividade',atividade:atividadeModificada});
        }
        return atividadeFiltrada;
    }
}
module.exports = Atividade;