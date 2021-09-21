export type AutoFormFieldDefinitionType = "input" | "date";

export interface AutoFormFieldDefinition {
  /** Label of field */
  label: string;
  /** Type of field */
  type: AutoFormFieldDefinitionType;
  /**
   * @param value value that is passed from field when changed
   * @param label label of field
   */
  onChange: (value: any, label: string) => void;
  /**
   * @param value value of field to then validate
   *
   * @returns boolean which determines whether or not the field is vaild
   */
  validate?: (value: any) => boolean;
}
