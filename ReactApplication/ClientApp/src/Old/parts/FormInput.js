import React from 'react'

export const FormInput = (props) => {

    return (<>
       <label className={"form-label"}>{props.children}</label>
        <input className={"form-control"} onChange={props.funksjon}/>
    </>)
}
