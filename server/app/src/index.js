
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Link} from 'react-router-dom';
import store from './store/store';
import LoginComponent from './views/login-component';
import CreateAccount from './views/createaccount-component';
import WebChat from './views/createaccount-component';
import Footer from './views/footer-component';

class Index extends React.Component {

     constructor(props) {
         super(props);
     }

     render() {
         return (
             <div className='container'>
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
             </div>
         )
     }
};

ReactDOM.render(<Index />,document.getElementById("root"));