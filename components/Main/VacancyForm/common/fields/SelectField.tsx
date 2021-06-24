import { useField } from "react-final-form";
import {
  TextField as MaterialTextField,
  TextFieldProps as MaterialTextFieldProps,
  Select,
  SelectProps as MaterialSelectProps,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

type SelectProps = MaterialSelectProps & { name: string };

export const SelectField = ({ name, children, ...restProps }: SelectProps) => {
  const { input, meta } = useField(name);

  return (
    <Select {...input} {...meta} {...restProps}>
      {children}
    </Select>
  );
};
