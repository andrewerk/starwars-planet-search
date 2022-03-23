import React from 'react';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';
import NameFilter from './components/NameFilter';

function App() {
  return (
    <StarWarsProvider>
      <NameFilter />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
