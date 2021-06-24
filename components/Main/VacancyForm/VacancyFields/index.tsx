import { TextField, SelectField } from "../common/fields";
import { FormStyled } from "./styled";
import { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { useEffect } from "react";

export const VacancyFields = ({ onSubmit }) => {
  // const { values } = useFormState();
  // console.log(values);

  const [specializations, setSpecializations] = useState<any[]>([]);
  
  useEffect(() => {
    fetch("https://api.hh.ru/specializations", {
      headers: { "User-Agent": "api-test-agent" },
    })
      .then((res) => res.json())
      .then(setSpecializations);
  }, []);

  // const formState = useFormState();
  // console. (formState);

  return (
    <FormStyled onSubmit={onSubmit}>
      <TextField name="text" placeholder="Имя вакансии" />
      <SelectField name="specialization" placeholder="Специальность">
        {specializations.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </SelectField>
      <TextField name="vacancyName3" placeholder="Имя вакансии3" />
    </FormStyled>
  );
};
