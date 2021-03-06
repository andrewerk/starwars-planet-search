import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import useInput from '../hooks/useInput';

function NameFilter() {
  const { setFilterByName } = useContext(StarWarsContext);
  const [name, nameInput] = useInput({
    type: 'text', list: null, testid: 'name-filter', initial: '' });
  useEffect(() => {
    setFilterByName({ filterByName: { name } });
  }, [name, setFilterByName]);
  return (
    <form>
      Pesquise pelo nome
      { '' }
      { nameInput }
    </form>
  );
}

export default NameFilter;
