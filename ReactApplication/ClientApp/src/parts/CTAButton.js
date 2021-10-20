import React, { Children, Component } from 'react'
import './CTAButton.css';

export default class CTAButton extends Component {
    render() {
        return (
            <button className={"mt-4 btn call-to-action"}>
                {this.props.children}
            </button>
        )
    }
}
