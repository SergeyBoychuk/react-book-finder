import React from 'react';
import ButtonBootStrap from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid'

const Button = (props) => {
  return (
    <div>
      <ButtonBootStrap onClick={props.fetchBooks} bsStyle="success" bsSize="large">{props.text}</ButtonBootStrap>
      <Grid />
    </div>


  )
}

export default Button;