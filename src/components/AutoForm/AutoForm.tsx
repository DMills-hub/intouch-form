import React, { useCallback, useEffect } from "react";
import { AutoFormFieldDefinition, Position } from "definitions";
import styled from "styled-components";
import Input from "./fields/Input";
import DatePicker from "./fields/DatePicker";
import Header from "./styled-components/Header";
import Button from "../styled-components/Button";
import { FieldValues, useForm } from "react-hook-form";
import { Message } from "semantic-ui-react";

interface AutoFormProps {
  fieldDefinitions: AutoFormFieldDefinition[];
  onSubmit: (values: FieldValues) => void;
  width?: string | number;
  header?: string;
  submitButtonText?: string | React.ReactElement;
  buttonPosition?: Position;
  cancelButtonText?: string;
  cancelButtonCallback?: () => void;
  defaultValues?: { [key: string]: any };
}

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
  flex-direction: column;
  margin: 0px 10px 0px 10px;
`;

const StyledForm = styled.form<{ width?: string | number }>`
  display: flex;
  width: ${(props) =>
    props.width
      ? typeof props.width === "number"
        ? `${props.width}px`
        : props.width
      : "width: 100%"};
  margin: 15px;
  flex-direction: column;

  @media (max-width: 425px) {
    width: 100%;
  }
`;

const ButtonContainer = styled.div<{ position?: Position }>`
  display: flex;
  ${(props) =>
    props.position === "left" || !props.position
      ? ""
      : `justify-content: ${
          props.position === "center" ? "center" : "flex-end"
        };`}
`;

const AutoForm = (props: AutoFormProps) => {
  const { onSubmit, fieldDefinitions, defaultValues } = props;
  const { register, formState, handleSubmit, clearErrors, setValue, watch } =
    useForm({
      defaultValues,
    });

  const watchAllFields = watch();

  useEffect(() => {
    fieldDefinitions.forEach((fieldDefinition) => {
      register(fieldDefinition.name, {
        validate: fieldDefinition.validate,
      });
    });
  }, [register, fieldDefinitions]);

  const onSubmitForm = useCallback(
    (values: FieldValues) => {
      onSubmit(values);
    },
    [onSubmit]
  );

  const onChange = useCallback(
    (name: string, value: any) => {
      setValue(name, value);
    },
    [setValue]
  );

  const errorList = Object.keys(formState.errors).map(
    (key) => formState.errors[key]?.message
  ) as string[];

  return (
    <FormContainer>
      {props.header && <Header>{props.header}</Header>}
      <StyledForm width={props.width} onSubmit={handleSubmit(onSubmitForm)}>
        {fieldDefinitions.map((fieldDefinition) => {
          const value = watchAllFields[fieldDefinition.name];
          return getField(fieldDefinition, onChange, value);
        })}
        {errorList.length > 0 && (
          <Message
            onDismiss={() => clearErrors()}
            error
            header="Submission Failed"
            list={errorList}
          />
        )}
        <ButtonContainer position={props.buttonPosition}>
          <Button width="30%" type="submit" bg="orange" color="white">
            {props.submitButtonText ?? "Submit"}
          </Button>
          {props.cancelButtonCallback && (
            <Button
              width="30%"
              onClick={props.cancelButtonCallback}
              bg="red"
              color="white"
              type="button"
            >
              {props.cancelButtonText ?? ""}
            </Button>
          )}
        </ButtonContainer>
      </StyledForm>
    </FormContainer>
  );
};

const getField = (
  fieldDefinition: AutoFormFieldDefinition,
  onChange: (name: string, value: any) => void,
  value: any
) => {
  const props = {
    key: fieldDefinition.label,
    ...fieldDefinition,
    onChange,
    value,
  };
  switch (fieldDefinition.type) {
    case "input":
      return <Input {...props} />;
    case "date":
      return <DatePicker {...props} />;
    default:
      return <div>please pass a valid field type</div>;
  }
};

export default AutoForm;
