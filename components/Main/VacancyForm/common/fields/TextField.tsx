import { useField } from "react-final-form";
import {
  TextField as MaterialTextField,
  TextFieldProps as MaterialTextFieldProps,
} from "@material-ui/core";

type TextFieldProps = MaterialTextFieldProps & { name: string };

export const TextField = ({ name, ...restProps }: TextFieldProps) => {
  const { input, meta } = useField(name);

  return <MaterialTextField  {...input} {...meta} {...restProps} />;
};
