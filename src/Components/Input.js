import React from 'react';

const Input = (props) => {
  return (
    <input type="text" onChange={props.changedText}/>
  )
}

export default Input;