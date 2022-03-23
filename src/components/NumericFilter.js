import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import useInput from '../hooks/useInput';

function NumericFilter() {
  // const [filter, setFilter] = useState;
  const { applyNumericFilter } = useContext(StarWarsContext);
  const options = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const relationalOptions = [
    'maior que',
    'igual a',
    'menor que',
  ];
  const [column, columnInput] = useInput({
    type: 'select', list: options, testid: 'column-filter', initial: 'population' });
  const [comparison, comparisonInput] = useInput({
    type: 'select',
    list: relationalOptions,
    testid: 'comparison-filter',
    initial: 'maior que' });
  const [value, valueInput] = useInput({
    type: 'number', list: null, testid: 'value-filter', initial: 0 });

  // handleButton = () => {
  //   applyNumericFilter('add', {
  //     column,
  //     comparison,
  //     value,
  //   });
  // };

  return (
    <form>
      Pesquise pelo nome
      { '' }
      { columnInput }
      { comparisonInput }
      { valueInput }
      <button
        type="button"
        onClick={ () => applyNumericFilter('add', {
          column,
          comparison,
          value,
        }) }
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </form>
  );
}

export default NumericFilter;
