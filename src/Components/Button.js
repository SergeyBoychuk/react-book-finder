import React from 'react';
import ButtonBootStrap from 'react-bootstrap/lib/Button';

const Button = (props) => {
  return (
    <ButtonBootStrap onClick={props.fetchBooks} bsStyle="success" bsSize="large">{props.text}</ButtonBootStrap>
  )
}

export default Button;