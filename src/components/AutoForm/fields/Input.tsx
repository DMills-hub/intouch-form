import { AutoFormFieldDefinition } from "definitions";
import React from "react";
import styled from "styled-components";
import FieldContainer from "../styled-components/FieldContainer";
import Label from "../styled-components/Label";

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  :focus {
    outline-color: lightblue;
  }
`;

const Input = (props: AutoFormFieldDefinition) => {
  return (
    <FieldContainer>
      <Label>{props.label}</Label>
      <StyledInput
        onChange={(e) => props.onChange(e.target.value, props.label)}
      />
    </FieldContainer>
  );
};

export default Input;
