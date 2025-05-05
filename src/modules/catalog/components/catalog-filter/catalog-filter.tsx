import { Box, Chip } from '@mui/material';
import { TiposCategoriaEnum } from '../../models/catalog.interface';
import FilterAutocomplete from './autocomplete-filter';
import CatalogFavoritesIcon from '../catalog-favorites-icon/catalog-favorites-icon';
import { useCatalogoContext } from '../../hooks/catalog/catalog.hook';

type colors =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';
function CatalogFilter() {
  const catalog = useCatalogoContext();

  const options = [
    { label: TiposCategoriaEnum.FILME, color: 'primary' },
    { label: TiposCategoriaEnum.SERIE, color: 'secondary' },
    { label: TiposCategoriaEnum.ANIMACAO, color: 'success' },
    { label: TiposCategoriaEnum.DOCUMENTARIO, color: 'info' },
  ];

  const handleSelectOption = (option: TiposCategoriaEnum) => {
    const categorias = catalog.filters.categorias;
    const findIndex = categorias.findIndex((p) => p === option);
    if (findIndex === -1) {
      categorias.push(option);
    } else {
      categorias.splice(findIndex, 1);
    }
    catalog.updateFilter({ categorias });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        flexWrap: 'wrap-reverse',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '1rem',
        }}>
        {options.map((option) => {
          const selected = catalog.filters.categorias.find(
            (item) => item === option.label,
          );
          return (
            <Chip
              key={option.label}
              sx={{
                opacity: selected ? '1' : '0.5',
                transform: selected ? 'scale(1.05)' : '',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer',
                },
              }}
              label={option.label}
              onClick={() => handleSelectOption(option.label)}
              color={option.color as colors}
              size="small"
            />
          );
        })}
      </Box>
      <FilterAutocomplete />

      <CatalogFavoritesIcon />
    </Box>
  );
}

export default CatalogFilter;
