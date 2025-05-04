import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import { useCatalogoContext } from '../../hooks/catalog/catalog.hook';

function AutocompleteFilter() {
  const [inputTitulo, setInputTitulo] = useState('');
  const { updateFilter, filteredItems } = useCatalogoContext();

  const opcoesTitulo = Array.from(
    new Set(
      filteredItems
        .filter((item) =>
          item.titulo.toLowerCase().includes(inputTitulo.toLocaleLowerCase()),
        )
        .map((item) => item.titulo),
    ),
  );

  const buscarPorTitulo = () => {
    updateFilter({ titulo: inputTitulo });
  };

  const handleSelecionar = (value: string | null) => {
    updateFilter({ titulo: value ?? '' });
  };

  return (
    <Autocomplete
      sx={{
        flex: 1,
        background: 'white',
        minWidth: '200px',
        maxWidth: '400px',
      }}
      freeSolo
      onChange={(_, v) => handleSelecionar(v)}
      options={opcoesTitulo}
      value={inputTitulo}
      onInputChange={(e, value) => setInputTitulo(value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') buscarPorTitulo();
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Filtrar por título"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
}

export default AutocompleteFilter;
