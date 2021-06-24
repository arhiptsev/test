import { Form, FormSpy } from "react-final-form";
import { VacancyFields } from "./VacancyFields";
import Pagination from "@material-ui/lab/Pagination";
import { useRef } from "react";
import { debounce } from "lodash";
import { stringify } from "query-string";
import { useState } from "react";
import { VacanciesList } from "./Vacancies";

const PAGINATION_OFFSET = 10;
const VACANCIES_API_URL = "https://api.hh.ru/vacancies";

const fetchVacancies = debounce((onResult: any, params: any) => {
  const queryParams = stringify(params);
  fetch(`${VACANCIES_API_URL}?${queryParams}`, {
    headers: { "User-Agent": "api-test-agent" },
  })
    .then((res) => res.json())
    .then(onResult);
}, 1000);

const useQueryVacancies = (): [
  any[],
  (params: Record<string, any>, page: number) => void
] => {
  const [vacancies, setVacancies] = useState<any[]>([]);

  const getVacancies = (params: Record<string, any>, page) => {
    fetchVacancies(
      ({ items }) => {
        setVacancies(items);
      },
      { ...params, page }
    );
  };

  return [vacancies, getVacancies];
};

export const VacancyForm = () => {
  const pageRef = useRef(1);
  const searchOptionsRef = useRef<Record<string, any>>({});

  const form = useRef<any>();

  const [vacancies, queryVacancies] = useQueryVacancies();

  const getVacancies = () => {
    queryVacancies(searchOptionsRef.current, pageRef.current);
  };

  const onFormChange = ({ values }) => {
    console.log(values);
    searchOptionsRef.current = values;
    getVacancies();
  };

  const onPaginate = (page: number) => {
    pageRef.current = page;
    getVacancies();
  };

  console.log(vacancies);

  return (
    <>
      <Form ref={form} onSubmit={getVacancies}>
        {({ handleSubmit }) => (
          <>
            <FormSpy subscription={{ values: true }} onChange={onFormChange} />
            <VacancyFields onSubmit={handleSubmit} />
          </>
        )}
      </Form>
      <VacanciesList vacancies={vacancies} />
      <Pagination
        count={PAGINATION_OFFSET}
        color="primary"
        onChange={(e, v) => onPaginate(v)}
      />
    </>
  );
};
