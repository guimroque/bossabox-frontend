import React from 'react';
import  { useState, useEffect } from "react";
// import { Container } from './styles';

function DialogAdd(props) {
    const state = props.open
    const [open, setOpen] = useState(state)
    function handleCloseRemove(){
        setOpen(false)
    }
    console.log(props)

  return (
        <div/>         
    );
}

export default DialogAdd;