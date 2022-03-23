import React from 'react';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';
import NameFilter from './components/NameFilter';
import NumericFilter from './components/NumericFilter';

function App() {
  return (
    <StarWarsProvider>
      <NameFilter />
      <NumericFilter />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
