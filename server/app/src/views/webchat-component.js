
import React from 'react';
import context from '../services/context';
import '../assets/css/webchat.scss';
import obj from '../services/loading';
import {SOCKETIP as SOCKETIP} from '../services/server-access-configuration';

import openSocket from 'socket.io-client';
import { get } from 'https';
var $ = require('jquery');

export default class WebChat extends React.Component {

    static contextType = context;

    static defaultProps = { }

    constructor(props) {

        super(props);
    
        this.state = { 
            message:'',
            messages:[],
            to:'todos',
            usersconnected:[],
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.socket = openSocket(SOCKETIP);
        this.message = React.createRef();
        this.to = React.createRef();
    }


    componentDidMount() {

         (function(self,obj) {

            if(!self.context.username) {
                window.location.href = "#/";
                alert('Por favor, logue novamente para continuar!');
                return false;
            }

            self.socket.on('user_connected',function(data) {
                obj.closeLoading();
                self.socket.emit('register_username_and_valid_if_the_user_is_already_connected',self.context.username);                          
            });

            self.socket.on('user_is_not_connected_so_go_to_welcome_message',() =>   {

                let username = self.context.username;
                let date = new Date();
                let result_date = date.getDate() + 
                                        "/" +
                                         (date.getMonth() + 1) + 
                                         "/" + 
                                         date.getFullYear() + 
                                         " " + 
                                         date.getHours() + 
                                         ":" + 
                                         date.getMinutes() + 
                                         ":" + 
                                         date.getSeconds();

                var send = {
                    from:username,
                    message:'',
                    first:true,
                    date:result_date,
                    to:'todos'
                };

                self.socket.emit('send_message',JSON.stringify(send),'todos');

            });

            self.socket.on('receive_message',(data) => {

                var result = JSON.parse(data);
                self.setState({messages:[]});
                self.setState({messages:result});
    
            });

            self.socket.on('get_usersconnected',(data) => {

                var result = JSON.parse(data);
                result.push('todos');
                self.setState({usersconnected:[]});
                self.setState({usersconnected:result});

                // console.warn(self.state.usersconnected);
            });

            self.socket.on('user_already_logged',() => {
                alert('O usuário já está logado!\nEntre com outro usuário para continuar ou desconecte sua conta para continuar!');
                window.location.href = "#/";
            });

         })(this,obj);   
    }

    handleChange(event) {
        const target = event.target,
              name = target.name,
              value = target.value;

        this.setState({[name]:value});
    }

    sendMessage() {

        if (!this.state.message) {
            return;
        }

        let date = new Date();
        let result_date = date.getDate() + 
                                "/" +
                                 (date.getMonth() + 1) + 
                                 "/" + 
                                 date.getFullYear() + 
                                 " " + 
                                 date.getHours() + 
                                 ":" + 
                                 date.getMinutes() + 
                                 ":" + 
                                 date.getSeconds();

        let index = this.to.current.selectedIndex;
        let to_ = this.to.current.children[index].textContent;


        let send = {
            from:this.context.username,
            message:this.state.message,
            to:to_,
            date:  result_date
        };

        this.socket.emit('send_message',JSON.stringify(send));

        this.setState({message:''});
        this.message.current.focus();
    }

    onKeyDown_Message(event) {

        (function(self,event) {

            if (event.ctrlKey && event.keyCode == 13) {
            
                self.sendMessage();
            }

        })(this,event);
    }

    componentDidCatch() {
        $("footer").removeClass("footer-fixed");
    }

    render() {

        const {state} = this;

        return (
            <div>

                { /* Div com as mensagens */  }
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 container'>
                        <div className='container-messages--style'>
                       
                                <div>

                                    {state.messages.map((m, key) => {
                                            
                                        {
                                            if (m.from === this.context.username && m.to !== 'todos')
                                                return(<div key={key}><p><span style={{color:'red'}}>Você</span> <b style={{color:'indigo'}}>disse em privado para {m.to}</b> : <span style={{color:'orange'}}>{m.message} - <span style={{color:'red'}}>{m.date}</span></span></p></div>)
                                            if (m.from !== this.context.username && m.to === this.context.username)
                                                return(<div key={key}><p><span style={{color:'red'}}>{m.from}</span> <b style={{color:'indigo'}}>disse em privado para você</b> : <span style={{color:'orange'}}>{m.message} - <span style={{color:'red'}}>{m.date}</span></span></p></div>)  
                                            else if(m.first)
                                               return(<div key={key}><p><b style={{color:'black'}}>Servidor</b> disse: <b style={{color:'orange'}}>{m.from}</b> entrou na sala! - <span style={{color:'red'}}>{m.date}</span></p></div>)
                                            else if(m.disconnected && m.from) 
                                               return(<div key={key}><p><b style={{color:'black'}}>Servidor</b> disse: <b style={{color:'orange'}}>{m.from}</b> saiu da sala! - <span style={{color:'red'}}>{m.date}</span></p></div>)
                                            else if (m.from && (m.to === 'todos' || m.to === this.context.username) )
                                               return(<div key={key}><p><span style={{color:'red'}}>Você</span> disse para <span style={{color:'indigo'}}>{m.to}</span>: <span style={{color:'orange'}}>{m.message} - <span style={{color:'red'}}>{m.date}</span></span></p></div>)
                                        }   

                                        })}
                                    <br />
                                </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 container'>
                      <span>Bem vindo: <b style={{color:'Red'}}>{this.context.username}</b></span>
                    </div>
                </div>
                    <br />
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 container'>
                      <span>
                            Enviar mensagem para: 
                            <select ref={this.to} onChange={this.handleChange} name='to' className='form-control'>

                                    {
                                        state.usersconnected.map((res,key) => {

                                                if(res !== this.context.username)
                                                  return (<option value={key}>{res}</option> )   
                                        })
                                    }

                            </select> 
                        </span>
                    </div>
                </div>
                <br />
                <div className='row'>
                   <div className='col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 container'>
                       <textarea value={state.message} ref={this.message} onKeyDown={this.onKeyDown_Message.bind(this)} onChange={this.handleChange} name='message' autoFocus='autoFocus' maxLength='1000' cols='10' rows='10' className='form-control' placeHolder='Publique alguma coisa - Ctrl + Enter para enviar'></textarea>
                    </div>
                </div>              
                <br />
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 container'>
                      <button onClick={this.sendMessage} className='btn btn-primary'>Enviar</button>
                    </div>
                </div>  

            </div>
        )
    }
}