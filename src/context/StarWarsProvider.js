import React from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

class StarWarsProvider extends React.Component {
  state = {
    planets: [],
  }

  getData = async () => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const response = await fetch(url);
    const planets = await response.json();
    this.setState({ data: planets.results });
  };

  render() {
    const { children } = this.props;
    return (
      <StarWarsContext.Provider value={ { ...this.state, getData: this.getData } }>
        { children }
      </StarWarsContext.Provider>
    );
  }
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
