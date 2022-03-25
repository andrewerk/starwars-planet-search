import React from 'react';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';
import NameFilter from './components/NameFilter';
import NumericFilter from './components/NumericFilter';
import SortFilter from './components/SortFilter';

function App() {
  return (
    <StarWarsProvider>
      <NameFilter />
      <NumericFilter />
      <SortFilter />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
