import React from "react";
import { AutoFormFieldDefinition } from "definitions";
import style from "styled-components";
import Input from "./fields/Input";

interface AutoFormProps {
  fieldDefinitions: AutoFormFieldDefinition[];
  onSubmit: () => void;
  minWidth?: string | number;
}

const FormContainer = style.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const StyledForm = style.form<{ minWidth?: string | number }>`
    ${(props) =>
      props.minWidth
        ? `min-width: ${
            typeof props.minWidth === "number"
              ? `${props.minWidth}px`
              : props.minWidth
          }`
        : ""}
`;

const AutoForm = (props: AutoFormProps) => {
  return (
    <FormContainer>
      <StyledForm minWidth={props.minWidth} onSubmit={props.onSubmit}>
        {props.fieldDefinitions.map((fieldDefinition) =>
          getField(fieldDefinition)
        )}
      </StyledForm>
    </FormContainer>
  );
};

const getField = (fieldDefinition: AutoFormFieldDefinition) => {
  const props = { key: fieldDefinition.label, ...fieldDefinition };
  switch (fieldDefinition.type) {
    case "input":
      return <Input {...props} />;
    case "date":
      return <div>date</div>;
    default:
      return <div>please pass a valid field type</div>;
  }
};

export default AutoForm;
