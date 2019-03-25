
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Link} from 'react-router-dom';
import store from './store/store';
import LoginComponent from './views/login-component';
import CreateAccount from './views/createaccount-component';
import WebChat from './views/webchat-component';
import Footer from './views/footer-component';
import userContext from './services/context';

class Index extends React.Component {

     constructor(props) {
         super(props);

         this.state = {
             username:'',
         }
     }

     render() {
         return (
             <div className='container'>

                <userContext.Provider value={this.state}>
                      <br />
                        <HashRouter>
                            <div>
                                <Route path='/' component={LoginComponent} exact />
                                <Route path='/register' component={CreateAccount} exact />
                                <Route path='/webchat' component={WebChat} exact />
                            </div>
                        </HashRouter>

                        <br />
                        <footer>
                            <Footer />
                        </footer>
                    </userContext.Provider>

             </div>
         )
     }
};

ReactDOM.render(<Index />,document.getElementById("root"));