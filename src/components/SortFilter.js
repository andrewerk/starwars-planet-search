import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import useInput from '../hooks/useInput';

function SortFilter() {
  const { orderPlanets } = useContext(StarWarsContext);
  const [sort, setSort] = useState('ASC');
  const options = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [column, columnInput] = useInput({
    type: 'select', list: options, testid: 'column-sort', initial: 'population' });

  return (
    <form>
      Ordernar por
      { '' }
      { columnInput }
      <label
        htmlFor="ASC"
      >
        Ascendente
        <input
          type="radio"
          id="ASC"
          name="sort"
          value="ASC"
          checked={ sort === 'ASC' }
          data-testid="column-sort-input-asc"
          onChange={ () => setSort('ASC') }
        />
      </label>
      <label
        htmlFor="DESC"
      >
        Descendente
        <input
          type="radio"
          id="DESC"
          name="sort"
          value="DESC"
          checked={ sort === 'DESC' }
          data-testid="column-sort-input-desc"
          onChange={ () => setSort('DESC') }
        />
      </label>
      <button
        type="button"
        onClick={ () => orderPlanets(column, sort) }
        data-testid="column-sort-button"
      >
        Filtrar
      </button>
    </form>
  );
}

export default SortFilter;
