import * as React from "react";
import { Label, Input, InputProps, Text, Flex } from "@theme-ui/components";
import { useField } from "formik";

interface Props extends InputProps {
  label: string;
  name: string;
}

const FieldInput = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);
  return (
    <Flex>
      <Label
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {label}
        <Input {...field} {...props} />
        {meta.touched && meta.error ? (
          <Text sx={{ color: "red" }}>{meta.error}</Text>
        ) : null}
      </Label>
    </Flex>
  );
};

export default FieldInput;
