import React from 'react'
import {Button} from '@material-ui/core'

//the input component for a new item or editing an existing one
function InputItems({handleChange, task, handleSubmit, edit}) {
    return (
        <form onSubmit = {handleSubmit} className = "form">
           <input type="text" className = "input" onChange = {handleChange} value = {task}/>
           <br/><br/>
           <Button variant = {edit ? "contained" : "outlined" } color = {edit ? "secondary" : "primary" } className = "submit-btn" type = "submit"> { edit ? "edit" : "add"}</Button>
        </form>
    )
}

export default InputItems
