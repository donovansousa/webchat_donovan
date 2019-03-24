
import React from 'react';

class Footer extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            msg:'Criado por Donovan Sousa. @2019 - Todos os direitos reservados.'
        }
    }

    render() {
        
        const {state} = this;

        return (
            <div>
                <p className='text-center'><span>{state.msg}</span></p>
            </div>
        )
    }
}

export default Footer;