// const amqp = require('amqplib/callback_api');
const amqp = require('amqplib');


let USER = 'microservice';
let PASSWORD = 'avaliacao';
let SERVER = 'localhost'; //IP MINHA MÁQUINA LOCAL RODANDO RABBITMQ
let QUEUE = 'conclusao-atividade'; // NOME DA QUEUE UTILIZADA PELO SERVIÇO
let URL = `amqp://${USER}:${PASSWORD}@${SERVER}:5672`;

class MQService{
    static connect(){
        return amqp.connect(URL).then(conn => conn.createChannel());
    }
    static createQueue(channel,queue){
        return new Promise((res,rej) =>{
            try{
                channel.assertQueue(queue,{durable:true});
                res(channel);
            }
            catch(err){rej(err)}
        });
    }

    static sendToQueue(queue,message){
        this.connect()
        .then(channel => this.createQueue(channel,queue))
        .then(channel => channel.sendToQueue(queue,Buffer.from(JSON.stringify(message))))
        .catch(err => console.log(err));
    }
    static consume(queue,callback){
        this.connect()
        .then(channel => this.createQueue(channel,queue))
        .then(channel => channel.consume(queue,callback,{noAck:false}))
        .catch(err => console.log(err));
    }

    // static enviarMsg(msg){
    //     amqp.connect(URL, (error0, connection)=> {
    //         if(error0){
    //             console.log('Erro ao conectar ao RabbitMQ',error0);
    //         }
    //         connection.createChannel((error1,channel) =>{
    //             if(error1){
    //                 console.log('Erro ao criar canal');
    //             }
    //             try {
    //                 channel.assertQueue(QUEUE,{durable:true});
    //                 channel.sendToQueue(QUEUE,Buffer.from(msg));        
    //                 console.log({retorno:'Mensagem enviada com sucesso!!',mensagem: msg});
    //             } catch (error) {
    //                 console.error(error);
    //             }

    //         })
    //     });
    // }
    // static obterMensagens(){
    //     let mensagem = {};
    //     amqp.connect(URL, (error0, connection)=> {
    //         if(error0){
    //             console.log('Erro ao conectar ao RabbitMQ',error0);
    //         }
    //         connection.createChannel((error1,channel) =>{
    //             if(error1){
    //                 console.log('Erro ao criar canal');
    //             }
    //             console.log('[x] Waiting for messages');
    //             channel.consume(QUEUE,(msg) =>{
    //                 console.log('[x] Received %s',msg.content.toString());
    //                 return msg.content.toJSON();
    //             },{noAck:true})
    //         })
    //     });
    //     console.log('mensagem',mensagem);
    // }
}


module.exports = MQService;