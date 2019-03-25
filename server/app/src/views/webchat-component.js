
import React from 'react';
import context from '../services/context';
import '../assets/css/webchat.scss';
import obj from '../services/loading';
import {SOCKETIP as SOCKETIP} from '../services/server-access-configuration';

import openSocket from 'socket.io-client';
var $ = require('jquery');

export default class WebChat extends React.Component {

    static contextType = context;

    static defaultProps = { }

    constructor(props) {

        super(props);
    
        this.state = { 
            message:'',
            messages:[{from:'Fulano',message:'Oiiii, tudo bem?'}],
            to:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.receiveMessages = this.receiveMessages.bind(this);

        const socket = openSocket(SOCKETIP);

        socket.on('welcome',function(data) {
            console.warn(data);
        });

    }

    componentDidMount() {
        obj.closeLoading();
    }

    handleChange(event) {
        const target = event.target,
              name = target.name,
              value = target.value;
    }

    sendMessage() {

    }

    receiveMessages() {
        
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
                         {
                            state.messages.map((res,index) => {
                                return (<div key={index}>
                                          <p><span style={{color:'red'}}>{res.from}</span> disse: <span style={{color:'orange'}}>{res.message}</span></p>
                                          <br />
                                         </div>)
                            })
                        }
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
                            <select name='to' className='form-control'>
                                <option value='0'>Todos</option>                            
                            </select> 
                        </span>
                    </div>
                </div>
                <br />
                <div className='row'>
                   <div className='col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 container'>
                       <textarea name='message' autoFocus='autoFocus' maxLength='1000' cols='10' rows='10' className='form-control' placeHolder='Publique alguma coisa - Ctrl + Enter para enviar'></textarea>
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