import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const {
    filteredData, data, filterByNumericValues, removeFilter, setFilterByNumericValues,
  } = useContext(StarWarsContext);
  const [planetList, setPlanetList] = useState([]);
  useEffect(() => {
    setPlanetList(filteredData.length > 0 ? filteredData : data);
  }, [data, filteredData]);
  return (
    <div>
      { filterByNumericValues.map((filter) => (
        <label
          key={ filter.column }
          htmlFor={ filter }
          data-testid="filter"
        >
          {filter.column}
          { ' ' }
          {filter.comparison}
          { ' ' }
          {filter.value}
          <button
            type="button"
            id={ filter }
            onClick={ () => removeFilter(filter) }
          >
            X
          </button>
        </label>
      ))}
      <button
        type="button"
        onClick={ () => setFilterByNumericValues([]) }
        data-testid="button-remove-filters"
      >
        Remover todas filtragens
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planetList.map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
