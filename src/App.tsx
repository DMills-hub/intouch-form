import React, { useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AutoForm from "components/AutoForm";
import { AutoFormFieldDefinition } from "definitions";

function App() {
  const [form, setForm] = useState<{ [key: string]: any }>({});

  const onChange = useCallback(
    (value: any, label: string) => {
      setForm((prevState) => ({ ...prevState, [label]: value }));
    },
    [setForm]
  );

  const fieldDefinitions: AutoFormFieldDefinition[] = [
    { label: "Name", onChange, type: "input", validate: (value) => true },
  ];

  return (
    <AutoForm
      minWidth={300}
      onSubmit={() => {}}
      fieldDefinitions={fieldDefinitions}
    />
  );
}

export default App;
