import React from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

class StarWarsProvider extends React.Component {
  state = {
    data: [],
    filterByName: {
      name: '',
    },
    filteredData: [],
    filterByNumericValues: [],
  }

  getData = async () => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const response = await fetch(url);
    const planets = await response.json();
    this.setState({ data: planets.results, filteredData: planets.results });
  };

  filterByName = (text) => {
    this.setState({ filterByName: { name: text } });
    const { data } = this.state;
    const newData = data.filter(({ name }) => name.includes(text));
    if (text !== '') {
      this.setState({ filteredData: newData });
    } else {
      this.setState({ filteredData: data });
    }
  }

  // changeNumericFilter = (type, { column, comparison, value }) => {
  //   if (type === 'add') {
  //     this.setState((prevState) => ({
  //       ...prevState,
  //       filterByNumericValues:
  //       [
  //         ...prevState.filterByNumericValues,
  //         {
  //           column,
  //           comparison,
  //           value,
  //         },
  //       ],
  //     }
  //     ));
  //   }
  // }

  applyNumericFilter = (type, { column, comparison, value }) => {
    if (type === 'add') {
      this.setState((prevState) => ({
        ...prevState,
        filterByNumericValues:
        [
          ...prevState.filterByNumericValues,
          {
            column,
            comparison,
            value,
          },
        ],
      }), () => {
        const { filterByName: name, filterByNumericValues } = this.state;
        if (filterByNumericValues.length > 0) {
          this.filterByName(name);
          const { filteredData } = this.state;
          if (comparison === 'maior que') {
            const newFilteredData = filteredData.filter(
              (planet) => filterByNumericValues.every((filter) => (
                filter.value < Number(planet[column])
              )),
            );
            this.setState({ filteredData: newFilteredData });
          } else if (comparison === 'igual a') {
            const newFilteredData = filteredData.filter(
              (planet) => filterByNumericValues.every((filter) => (
                Number(filter.value) === Number(planet[column])
              )),
            );
            this.setState({ filteredData: newFilteredData });
          } else if (comparison === 'menor que') {
            const newFilteredData = filteredData.filter(
              (planet) => filterByNumericValues.every((filter) => (
                filter.value > Number(planet[column])
              )),
            );
            this.setState({ filteredData: newFilteredData });
          }
        }
      });
    }
  }

  render() {
    const { children } = this.props;
    return (
      <StarWarsContext.Provider
        value={ {
          ...this.state,
          getData: this.getData,
          filterByName: this.filterByName,
          changeNumericFilter: this.changeNumericFilter,
          applyNumericFilter: this.applyNumericFilter } }
      >
        { children }
      </StarWarsContext.Provider>
    );
  }
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
