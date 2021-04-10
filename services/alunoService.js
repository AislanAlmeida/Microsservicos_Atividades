const axios = require('axios');
//PREENCHA AQUI O IP:PORTA DA MAQUINA QUE HOSPEDA O SERVIÇO DE ALUNOS
const IP_MICROSSERVICO_ALUNOS = "localhost:3001";

class Aluno{
    static async obterAlunos(){
        let alunos = await axios.get(`http://${IP_MICROSSERVICO_ALUNOS}/alunos`).then(resp =>{
            console.log({mensagem:'Consultando Serviço Alunos',retorno:resp.data});
            return resp.data;
        }).catch(err =>{
            console.log({mensagem:'Erro ao consultar Serviço Alunos',Erro:err});
            return null;
        })
        return alunos;
    }
    static async obterAlunoPorId(idAluno){
        let aluno = await axios.get(`http://${IP_MICROSSERVICO_ALUNOS}/alunos/${idAluno}`).then(resp =>{
            console.log({mensagem:'Consultando Serviço Alunos',retorno:resp.data});
            return resp.data;
        }).catch(err =>{
            console.log({mensagem:'Erro ao consultar Serviço Alunos',Erro:err});
            return null;
        })
        return aluno;
    }
}

module.exports = Aluno;