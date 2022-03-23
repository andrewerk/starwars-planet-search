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

  render() {
    const { children } = this.props;
    return (
      <StarWarsContext.Provider
        value={ {
          ...this.state,
          getData: this.getData,
          filterByName: this.filterByName } }
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
