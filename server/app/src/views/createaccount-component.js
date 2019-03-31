
import React from 'react';
import store from '../store/store';
import USER from '../actions/user-action';
import logo from '../assets/imgs/logo.png';
import '../assets/css/footer.scss';
import '../assets/css/body.scss';
import '../assets/css/exitPage.scss';
import obj from '../services/loading';

export default class CreateAccount extends React.Component {

    constructor(props){
        
        super(props);

        this.state = {
            username:'',
            password:'',
            mail:''
        };

        this.createAccount = this.createAccount.bind(this);
        this.username = React.createRef();

        this.handleChange =this.handleChange.bind(this);
        this.goToLoginPage = this.goToLoginPage.bind(this);
        this.clearFields = this.clearFields.bind(this);
    }

    handleChange(event) {

        const target = event.target,
              name = target.name,
              value = target.value;

        this.setState({[name]:value});
    }

    createAccount() {

        USER.CREATE_USER.User = {
            username:this.state.username,
            password: this.state.password,
            mail: this.state.mail,
            callback: function (statusCode,message_result) {
                
                obj.closeLoading();

                if (statusCode === 201) {
                    alert('Conta criada com sucesso!');
                    window.location.href = '#/';
                }
                else if (!statusCode || statusCode === 0) {
                    alert('Serviço não encontrado!\nEntre em contato com a administração.');
                }
                else {
                    alert(message_result);
                }
            }
        };

        obj.showLoading();
        store.dispatch(USER.CREATE_USER);
    }

    goToLoginPage() {
        window.location.href = "#/";
    }
    
    clearFields() {
        this.setState({username:'',password:'',mail:''});
        this.username.current.focus();
    }

    render() {
        const {state} = this;

        return(
            <div>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 container'>
                            <span onClick={this.goToLoginPage} className='close closePage'>x</span>

                            <img alt='logo' src={logo} className='container img-responsive' style={{position:'relative',width:'350px',height:'auto', left:'50%',marginLeft:'-175px'}}></img>
                            <br />
                            <h3 className='text-center'>Crie sua conta</h3>
                        </div>
                    </div>

                    <br />
                    <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 container'>
                            <p className='text-center'>Preencha corretamente todos os campos abaixo:</p>
                        </div>
                    </div>               

                    <div className='row'>
                        <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 container'>
                            <span>Usuário:</span>
                            <input onChange={this.handleChange} placeholder='Informe o nome de usuário' autoFocus='autoFocus' ref={this.username} type='text' className='form-control' maxLength='25' name='username' value={state.username} />
                        </div>
                    </div>

                    <br />

                    <div className='row'>
                        <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 container'>
                            <span>Senha:</span>
                            <input onChange={this.handleChange} placeholder='Informe a senha de usuário' type='password' className='form-control' maxLength='16' name='password' value={state.password} />
                        </div>
                    </div>

                    <br />

                    <div className='row'>
                        <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 container'>
                            <span>E-mail:</span>
                            <input onChange={this.handleChange} placeholder='Informe o e-mail de usuário' type='mail' className='form-control' maxLength='100' name='mail' value={state.mail} />
                        </div>
                    </div>                

                    <br />
        
                    <div className='row'>
                        <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 container'>
                            <button className='btn btn-primary' onClick={this.createAccount} disabled={!state.mail || !state.password || !state.username}>Enviar</button>
                            <button className='btn btn-danger' onClick={this.clearFields} style={{marginLeft:'1%'}}>Limpar</button>
                        </div>
                    </div>  
            </div>
        )
    }
}