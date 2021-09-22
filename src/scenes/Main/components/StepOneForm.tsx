import AutoForm from "components/AutoForm";
import { AutoFormFieldDefinition } from "definitions";
import React from "react";
import { FieldValues } from "react-hook-form";
import { isValidRegex, nameRegex, phoneNumberRegex } from "util/regex";
import { isType } from "util/type";
import { onValidate } from "../util/validation";

export interface FormProps {
  onSubmit: (values: FieldValues) => void;
  defaultValues: { [key: string]: any };
}

const StepOneForm = (props: FormProps) => {
  const { onSubmit, defaultValues } = props;

  const fieldDefinitions: AutoFormFieldDefinition[] = [
    {
      name: "name",
      label: "Name",
      type: "input",
      validate: (value) =>
        onValidate(value, "Name", (value) => {
          if (isType(value, "string")) {
            return isValidRegex(value, nameRegex)
              ? undefined
              : "Please enter a valid name.";
          }
        }),
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "input",
      validate: (value) =>
        onValidate(value, "Phone Number", (value) => {
          if (isType(value, "string")) {
            return isValidRegex(value, phoneNumberRegex)
              ? undefined
              : "Please enter a valid phone number.";
          }
        }),
    },
  ];

  return (
    <AutoForm
      width={400}
      onSubmit={onSubmit}
      fieldDefinitions={fieldDefinitions}
      submitButtonText="Next"
      buttonPosition="center"
      defaultValues={defaultValues}
    />
  );
};

export default StepOneForm;
