
import React from 'react';

export default class WebChat extends React.Component {

    static defaultProps = {

    }

    constructor(props){
        super(props);
    
        this.setState = {

        };
    }

    componentDidCatch() {
        $("footer").removeClass("footer-fixed");
    }

    render() {

        const {state} = this;

        return (
            <div>
            
            
            </div>
        )
    }
}