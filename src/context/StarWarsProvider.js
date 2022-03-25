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
      setData(planets.results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (filterByName.filterByName.name !== '') {
      const newData = data.filter(({ name }) => name.toLowerCase()
        .includes(filterByName.filterByName.name.toLowerCase()));
      setFilteredData(newData);
      console.log(filterByName.filterByName.name, newData);
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
    if (sort === 'DESC') {
      (filteredData.length > 0 ? filteredData : data).sort((a, b) => (
        Number(b[column]) - Number(a[column])));
    }
    if (sort === 'ASC') {
      (filteredData.length > 0 ? filteredData : data).sort((b, a) => (
        Number(b[column]) - Number(a[column])));
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
