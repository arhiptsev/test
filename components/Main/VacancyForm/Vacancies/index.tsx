type VacanciesProps = { vacancies: any[] };

export const VacanciesList = ({ vacancies }: VacanciesProps) => {
  return (
    <ul>
      {vacancies.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};
