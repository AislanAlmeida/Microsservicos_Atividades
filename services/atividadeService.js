const alunoService = require('./alunoService');
const atividadeDAO = require('../dados/atividadesDAO');
const MQService = require('../services/MQService');
const axios = require('axios');

class Atividade{

    static async obterAtividades(){
        let atividades = await atividadeDAO.obterAtividades();
        return atividades;
    }

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

        //FUNCIONALIDADE QUE ENVIA AS ATIVIDADES ENTREGUES PARA O RABBITMQ
        // let atividadeSalva = MQService.enviarMsg(JSON.stringify(atividade));
        MQService.sendToQueue('conclusao-atividade',atividade);

        return 'Atividade Entregue';
    }

    static async obterDesempenho(idAluno){
        return null;
    }
    static async obterListaDesempenho(){
        return null;
    }

    static async obterAtividadesEntregues(){

        // console.log('Entrei no static');
        // let mensagens = [];
        // let teste = MQService.consume('conclusao-atividade', message =>{
        //     console.log('Mensagem -- ');
        //     console.log(message.content.toString());
        //     mensagens.push(message.content.toString());
        //     console.log(mensagens);
        // })
        // return mensagens;
        console.log('Iniciando Consummer -- Rabbit MQ');
        
        return new Promise((res,rej) =>{
            MQService.consume('conclusao-atividade',async (message) =>{
                let msg = {};
                msg.status = 'Mensagem obtida';
                msg.msg = JSON.parse(message.content.toString());
                console.log(msg);
                res();
                return message.content.toString();
            })
        })
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