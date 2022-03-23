import React, { useState } from 'react';

// Code adapted from https://stackoverflow.com/questions/55757761/handle-an-input-with-react-hooks

function useInput({ type, list, testid }) {
  const [value, setValue] = useState('');
  if (type === 'text') {
    const input = (<input
      value={ value }
      onChange={ ({ target }) => setValue(target.value) }
      type={ type }
      data-testid={ testid }
    />);
    return [value, input];
  }
  if (type === 'select') {
    const input = (
      <label htmlFor={ type }>
        <select
          value={ value }
          onChange={ ({ target }) => setValue(target.value) }
          type={ type }
          id={ type }
          data-testid={ testid }
        >
          { list.map((item) => (
            <option key={ item }>
              { item }
            </option>
          ))}
        </select>
      </label>);
    return [value, input];
  }
}

export default useInput;
