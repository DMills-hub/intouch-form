import { AutoFormFieldDefinition } from "definitions";
import React from "react";
import FieldContainer from "../styled-components/FieldContainer";
import Label from "../styled-components/Label";
import StyledInput from "../../styled-components/Input";

export interface FieldProps extends AutoFormFieldDefinition {
  onChange: (name: string, value: any) => void;
  name: string;
  value: any;
}

const Input = (props: FieldProps) => {
  const { label, onChange, name, value } = props;

  return (
    <FieldContainer>
      <Label>{label}</Label>
      <StyledInput
        value={value ?? ""}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </FieldContainer>
  );
};

export default Input;
