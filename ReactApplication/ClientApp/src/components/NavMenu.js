import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import logo from '../images/ship.svg'

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

  render () {
    return (
        <nav className={"navbar navbar-expand-md navbar-dark justify-content-center p-0"}>
        <a className={"navbar-brand"} href="index.html">
            <img src={logo} alt="ship logo" width="40px"
                 style={{marginLeft: '20px'}}/>
        </a>
        <button className={"navbar-toggler"} type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="true"
                aria-label="Toggle-navigation">
            <div className={"icon"}></div>
            <div className={"icon"}></div>
            <div className={"icon"}></div>
        </button>
        <div className={"collapse navbar-collapse"}>
            <ul className={"navbar-nav col-lg-8"}>
                <li className={"nav-item"}>
                    <Link className={"nav-link"} to="#">From Norway</Link>
                </li>
                <li className={"nav-item"}>
                    <Link className={"nav-link"} to="#">To Norway</Link>
                </li>
            </ul>
            <ul className={"navbar-nav col-lg-4 justify-content-end"}>
                <li className={"nav-item"}>
                    <Link className={"nav-link"} to="#">Sign in</Link>
                </li>
                <li className={"nav-item"}>
                    <Link className={"nav-link"} to="#">Manage trips</Link>
                </li>
            </ul>
        </div>
    </nav>

    );
  }
}
