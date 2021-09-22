import React from "react";

export type AutoFormFieldDefinitionType = "input" | "date";

export interface AutoFormFieldDefinition {
  /** Name of field */
  name: string;
  /** Label of field */
  label: string;
  /** Type of field */
  type: AutoFormFieldDefinitionType;
  /**
   * @param value value of field to then validate
   *
   * @returns boolean which determines whether or not the field is vaild
   */
  validate?: (value: any) => string | undefined;
}

export type Position = "left" | "right" | "center";
