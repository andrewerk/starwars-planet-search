import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import useInput from '../hooks/useInput';

function NameFilter() {
  const { filterByNumericValues } = useContext(StarWarsContext);
  const [name, nameInput] = useInput({
    type: 'text', list: null, testid: 'name-filter', initial: '' });
  useEffect(() => { filterByName(name); }, [filterByName, name]);
  return (
    <form>
    </form>
  );
}

export default NameFilter;