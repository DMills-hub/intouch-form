export const isValueEmptyMessage = (value: any, fieldName: string) => {
  if (!value) return `Please enter a ${fieldName}`;
  return "";
};

export const onValidate = (
  value: any,
  fieldName: string,
  callback?: (value: any) => string | undefined
) => {
  const isEmptyMessage = isValueEmptyMessage(value, fieldName);
  if (isEmptyMessage) return isEmptyMessage;
  return callback ? callback(value) : undefined;
};
