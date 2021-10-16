import React, { Component, setState } from 'react';
import { Link } from 'react-router-dom';
import './ManageTrip.css';

export default class ManageTrip extends Component {

    constructor(props){
        super(props)

        this.state = {
            divType: ''
        }
    }

    toggleDiv = (value) => {
        if(this.state.divType === value){
            this.setState({
                divType : ''
            })}else{
            this.setState({
                divType : value
        })}
    }

    render() {
        return (
            <>
            <div className={'d-flex flex-row justify-content-between'}>
               <button onClick={() => {this.toggleDiv('toggle1')}} className={'col-lg-2 btn call-to-action'}>Oslo - Kiel</button>
               <button onClick={() => {this.toggleDiv('toggle2')}} className={'col-lg-2 btn call-to-action'}>Sandefjord - Strømstad</button>
               <button onClick={() => {this.toggleDiv('toggle3')}} className={'col-lg-2 btn call-to-action'}>Larvik - Hirtshals</button>
            </div>
            <div>
                {
                    this.state.divType==='' && <></>
                }
                {
                    this.state.divType === 'toggle1' && 
                    <div className={"mt-5 overflow-auto table-height"}>
                        <h1>Oslo - Kiel</h1>
                        <table className={"table mt-3"}>
                            <thead className={"table-light"}>
                                <tr>
                                </tr>
                                <tr>
                                    <th>Id</th>
                                    <th>Departure Time</th>
                                    <th>Child Ticket</th>
                                    <th>Adult Ticket</th>
                                    <th>Standard Suite</th>
                                    <th>Premium Suite</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className={"table-bordered "}>
                                <tr>
                                    <td>1</td>
                                    <td>19.09.2021 - 19:00</td>
                                    <td>Kr 150,-</td>
                                    <td>Kr 250,-</td>
                                    <td>Kr 300,-</td>
                                    <td>Kr 500,-</td>
                                    <td><Link className={'btn btn-success'}>Edit</Link></td>
                                    <td><button type="button" className={'btn btn-danger'}>Delete</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div> 
                }
                                {
                    this.state.divType === 'toggle2' && <h1>You have Toggled 2</h1> 
                }
                                {
                    this.state.divType === 'toggle3' && <h1>You have Toggled 3</h1> 
                }
            </div>
            </>
        )
    }
}
