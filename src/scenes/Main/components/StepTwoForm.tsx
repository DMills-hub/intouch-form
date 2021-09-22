import AutoForm from "components/AutoForm";
import { AutoFormFieldDefinition } from "definitions";
import React from "react";
import { emailRegex, isValidRegex } from "util/regex";
import { isType } from "util/type";
import { onValidate } from "../util/validation";
import { FormProps } from "./StepOneForm";

const StepTwoForm = (props: FormProps) => {
  const { onSubmit, defaultValues } = props;

  const fieldDefinitions: AutoFormFieldDefinition[] = [
    {
      name: "email",
      label: "Email",
      type: "input",
      validate: (value) =>
        onValidate(value, "Email", (value) => {
          if (isType(value, "string")) {
            return isValidRegex(value, emailRegex)
              ? undefined
              : "Please enter a valid email.";
          }
        }),
    },
    {
      name: "dateOfBirth",
      label: "Date Of Birth",
      type: "date",
      validate: (value) =>
        onValidate(value, "Date Of Birth", (value) => {
          const today = new Date();
          const birthDate = value as Date;

          // get full year
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDifference = today.getMonth() - birthDate.getMonth();
          if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
          ) {
            // take one off age if monthdifference is less than 0
            // or is monthDifference is 0 and todaysDate is less
            // then birthDate
            age--;
          }
          return age >= 18 ? undefined : "18+ only.";
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

export default StepTwoForm;
