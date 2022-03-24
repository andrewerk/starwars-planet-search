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
    const { data, filteredData, filterByNumericValues } = this.state;
    const newData = (filterByNumericValues
      ? filteredData : data).filter(({ name }) => name.includes(text));
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
          const { filteredData } = this.state;
          const newfilteredData = filteredData.filter((planet) => filterByNumericValues
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
          this.setState({ filteredData: newfilteredData }, this.filterByName(name));
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
