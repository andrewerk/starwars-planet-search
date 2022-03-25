import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ filterByName: { name: '' } });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(url);
      const planets = await response.json();
      const planetsSorted = [...planets.results].sort((a, b) => {
        const negativ = -1;
        if (a.name < b.name) { return negativ; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
      setData(planetsSorted);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (filterByName.filterByName.name !== '') {
      const newData = data.filter(({ name }) => name.toLowerCase()
        .includes(filterByName.filterByName.name.toLowerCase()));
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  },
  [filterByName, data]);

  useEffect(() => {
    if (filterByNumericValues.length > 0) {
      const newfilteredData = data.filter((planet) => filterByNumericValues
        .every((filter) => {
          if ((filter.comparison === 'maior que'
            && filter.value < Number(planet[filter.column]))
            || (filter.comparison === 'menor que'
            && filter.value > Number(planet[filter.column]))
            || (filter.comparison === 'igual a'
            && Number(filter.value) === Number(planet[filter.column]))) {
            return true;
          }
          return false;
        }));
      setFilteredData(newfilteredData);
    } else {
      setFilteredData(data);
    }
  }, [data, filterByNumericValues]);

  const removeFilter = (filterToDelete) => {
    const newNumericFilter = filterByNumericValues.filter((filter) => (
      filterToDelete !== filter
    ));
    setFilterByNumericValues(newNumericFilter);
  };

  const orderPlanets = (column, sort) => {
    const negativ = -1;
    if (sort === 'DESC') {
      const sorted = [...data].sort((a, b) => (
        b[column] === 'unknown' ? negativ : Number(b[column]) - Number(a[column])));
      setFilteredData(sorted);
    }
    if (sort === 'ASC') {
      const sorted = [...data].sort((a, b) => (
        b[column] === 'unknown' ? negativ : Number(a[column]) - Number(b[column])));
      setFilteredData(sorted);
    }
  };

  return (
    <StarWarsContext.Provider
      value={ {
        filteredData,
        data,
        setFilterByName,
        filterByNumericValues,
        setFilterByNumericValues,
        removeFilter,
        orderPlanets,

      } }
    >
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default StarWarsProvider;
