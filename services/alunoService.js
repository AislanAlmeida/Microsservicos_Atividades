const axios = require('axios');
class Aluno{
    static async obterAlunos(){
        let alunos = await axios.get('http://10.3.152.132:3000/alunos').then(resp =>{
            console.log({mensagem:'Consultando Serviço Alunos',retorno:resp.data});
            return resp.data;
        }).catch(err =>{
            console.log({mensagem:'Erro ao consultar Serviço Alunos',Erro:err});
            return null;
        })
        return alunos;
    }
    static async obterAlunoPorId(idAluno){
        let aluno = await axios.get(`http://10.3.152.132:3000/alunos/${idAluno}`).then(resp =>{
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