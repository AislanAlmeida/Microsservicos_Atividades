const fs = require('fs');

//FUNÇÕES DESTINADAS A PERSISTENCIA DE DADOS//
class AtividadeDAO{
    static salvarAtividade(atividade){

        const previous = this.obterAtividades();
        if(previous){
            previous.push(atividade);
            let dadosAtualizados = JSON.stringify(previous);
            try {
                fs.writeFileSync('./dados/atividades.json',dadosAtualizados,'utf8');
                console.log('Atividade salva com sucesso');
                return atividade;
            } catch (error) {
                console.error(`Erro ao escrever o arquivo: ${error}`);
                return null;
            }

        }
        else{
            let data = [];
            data.push(atividade);
            data = JSON.stringify(data);

            try {
                fs.writeFileSync('./dados/atividades.json',data,'utf8');
                console.log('Atividade salva com sucesso');
                return atividade;
            } catch (error) {
                console.error(`Erro ao escrever o arquivo: ${error}`);
                return null;
            }
        }
    }

    static obterAtividades(){
        try {
            const data = fs.readFileSync('./dados/atividades.json', 'utf8');
            const atividades = JSON.parse(data);
            return atividades;
        } catch (error) {
            console.log(`Erro ao ler o arquivo: ${error}`);
            return null;
        }
    }

    static salvarAtividadeEntregue(atividade){
        const previous = this.obterAtividadesEntregues();
        if(previous){
            previous.push(atividade);
            let dadosAtualizados = JSON.stringify(previous);
            try {
                fs.writeFileSync('./dados/entregues.json',dadosAtualizados,'utf8');
                console.log('Atividade salva com sucesso');
                return atividade;
            } catch (error) {
                console.error(`Erro ao escrever o arquivo: ${error}`);
                return null;
            }

        }
        else{
            let data = [];
            data.push(atividade);
            data = JSON.stringify(data);

            try {
                fs.writeFileSync('./dados/entregues.json',data,'utf8');
                console.log('Atividade Entregue salva com sucesso');
                return atividade;
            } catch (error) {
                console.error(`Erro ao escrever o arquivo: ${error}`);
                return null;
            }
        }
    }

    static obterAtividadesEntregues(){
        try {
            const data = fs.readFileSync('./dados/entregues.json', 'utf8');
            const atividades = JSON.parse(data);
            return atividades;
        } catch (error) {
            console.log(`Erro ao ler o arquivo: ${error}`);
            return null;
        }
    }

    static corrigirAtividadeEntregue(atividade){
        let atividades = this.obterAtividadesEntregues();
        let atividadesFiltradas = atividades;
        let atividadesModificadas = [];
        atividadesFiltradas.forEach(a => {
            if(a.id == atividade.id && a.aluno.id == atividade.aluno.id){
                a = atividade;
                atividadesModificadas.push(a);
            }else{
                atividadesModificadas.push(a);
            }
        });

        let data = JSON.stringify(atividadesModificadas);

        try {
            fs.writeFileSync('./dados/entregues.json',data,'utf8');
            console.log('Atividade Corrigida com sucesso');
            return atividade;
        } catch (error) {
            console.error(`Erro ao escrever o arquivo: ${error}`);
            return null;
        }


    }
}
module.exports = AtividadeDAO;