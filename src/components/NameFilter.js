import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import useInput from '../hooks/useInput';

function NameFilter() {
  const { filterByName } = useContext(StarWarsContext);
  const [name, nameInput] = useInput({
    type: 'text', list: null, testid: 'name-filter', initial: '' });
  useEffect(() => { filterByName(name); }, [filterByName, name]);
  return (
    <form>
      Pesquise pelo nome
      { '' }
      { nameInput }
    </form>
  );
}

export default NameFilter;
