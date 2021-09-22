import React, { useCallback, useEffect, useState } from "react";
import { FieldProps } from "./Input";
import { Dropdown } from "semantic-ui-react";
import FieldContainer from "../styled-components/FieldContainer";
import Label from "../styled-components/Label";
import Input from "../../styled-components/Input";
import styled from "styled-components";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DatePickerContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledDropdown = styled(Dropdown)`
  margin: 5px !important;
`;

const FlexContainer = styled.div<{ margin?: string }>`
  flex: 1;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  display: flex;
  justify-content: center;
`;

interface DatePickerState {
  month?: number;
  day?: number;
  year?: number;
}

const DatePicker = (props: FieldProps) => {
  const { label, onChange, name, value } = props;
  const [datePicker, setDatePicker] = useState<DatePickerState>();
  const inputWidth = 55;

  useEffect(() => {
    if (value && typeof value.getMonth === "function" && !datePicker) {
      const date = value as Date;
      const month = date.getMonth();
      const day = date.getDay();
      const year = date.getFullYear();
      setDatePicker({ month, day, year });
    }
  }, [value, datePicker, setDatePicker]);

  const onChangeDatePicker = useCallback(
    (
      key: keyof DatePickerState,
      value: number | undefined,
      isValidValue?: boolean
    ) => {
      const isUndefined = value === undefined;
      const isNotANumber = value ? isNaN(value) : true;
      const isValid = isValidValue === undefined ? true : isValidValue;
      if (!isValid) return;
      if (isNotANumber && !isUndefined) return;
      setDatePicker((prevState) => {
        const newState = { ...prevState, [key]: value };
        if (newState.day && newState.month && newState.year) {
          onChange(name, new Date(newState.year, newState.month, newState.day));
        }
        return newState;
      });
    },
    [onChange, name, setDatePicker]
  );

  const month = datePicker?.month ? months[datePicker.month] : undefined;

  return (
    <FieldContainer>
      <Label>{label}</Label>
      <DatePickerContainer>
        <FlexContainer margin="0px 5px 0px 0px">
          <StyledDropdown
            selection
            fluid
            options={months.map((month) => ({
              key: month,
              text: month,
              value: month,
            }))}
            clearable
            placeholder="Month"
            onChange={(_: any, { value }: { value: string }) => {
              const month = months.findIndex((month) => month === value);
              onChangeDatePicker("month", month);
            }}
            value={month}
          />
        </FlexContainer>
        <FlexContainer>
          <Input
            onChange={(e) =>
              onChangeDatePicker(
                "day",
                e.target.value === "" ? undefined : Number(e.target.value),
                e.target.value.length <= 2 && Number(e.target.value) <= 31
              )
            }
            value={datePicker?.day ?? ""}
            placeholder="Day"
            width={inputWidth}
          />
        </FlexContainer>
        <FlexContainer>
          <Input
            onChange={(e) =>
              onChangeDatePicker(
                "year",
                e.target.value === "" ? undefined : Number(e.target.value),
                e.target.value.length <= 4 &&
                  Number(e.target.value) <= new Date().getFullYear()
              )
            }
            value={datePicker?.year ?? ""}
            placeholder="Year"
            width={inputWidth}
          />
        </FlexContainer>
      </DatePickerContainer>
    </FieldContainer>
  );
};

export default DatePicker;
