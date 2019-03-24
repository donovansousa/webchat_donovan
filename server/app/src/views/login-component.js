
import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/imgs/logo.png';
import store from '../store/store';
import UserAction from '../actions/user-action';
import '../assets/css/footer.scss';
import '../assets/css/body.scss';
var $ = require('jquery');

class LoginComponent extends React.Component {

    static defaultProps = {
        title:'Painel de Acesso'
    }

    constructor(props) {
        super(props);

        this.state = {
            username:'',
            password:'',
        };

        this.handleChange = this.handleChange.bind(this);
        this.send = this.send.bind(this);
        this.username = React.createRef();
        this.validation = React.createRef();
    }

    componentDidMount() {
        $("footer").addClass("footer-fixed");
    }

    handleChange(event) {

        const target = event.target,
             name = target.name,
             value = target.value;

        this.setState({[name]:value});
    }

    send() {
        // call reducer by actions and set in store
        UserAction.LOGIN.username = this.state.username;
        UserAction.LOGIN.password = this.state.password;
        store.dispatch(UserAction.LOGIN);

        console.warn(store.getState().UserReducer.username + ' - ' + store.getState().UserReducer.password);
    }

    render() {

        const {state} = this;

        return (
            <div>
                <img src={logo} className='container img-responsive' style={{position:'relative',width:'350px',height:'auto', left:'50%',marginLeft:'-175px'}}></img>

                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6 col-xl-6 col-lg-6 container'>
                      <br />
                      <h3 style={{textAlign:'center'}}>{this.props.title}</h3>
                      <br />        
                    </div>
                </div>

                <div className='row'>
                 <div className='col-12 col-sm-12 col-md-6 col-xl-6 col-lg-6 container'>
                        <p className='text-center'>Preencha corretamente todos os campos abaixo:</p>       
                    </div>
                </div>   
                                      
                <div className='row'>
                     <div className='col-12 col-sm-12 col-md-6 col-xl-6 col-lg-6 container'>
                        <span>Usuário:</span>
                        <input ref={this.username} name='username' 
                                onChange={this.handleChange}
                                type='text' 
                                className='form-control' 
                                maxLength='25' 
                                placeholder='Informe o nome de usuário' 
                                autoFocus='autoFocus' />      
                    </div>
                </div>                 

                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6 col-xl-6 col-lg-6 container'>
                        <br />
                        <span>Senha:</span>
                        <input name='password'  
                                onChange={this.handleChange} 
                                type='password' 
                                className='form-control' 
                                maxLength='16' 
                                placeholder='Informe a senha de usuário' />   
                    </div>
                  
                </div>  

                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6 col-xl-6 col-lg-6 container'>
                        <br />
                        <button disabled={!this.state.username || !this.state.password} onClick={this.send} className='btn btn-primary'>Acessar</button> 
                        <span style={{marginLeft:'10%'}}>Não tem uma conta? <Link to='/register'>clique aqui</Link></span>  
                        <br /> 
                        <label ref={this.validation}></label>
                    </div>
                </div> 
            </div>
        )
    }
};

export default LoginComponent;