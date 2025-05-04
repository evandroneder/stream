import { Box, Fade } from '@mui/material';
import { useEffect } from 'react';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogItem from '../../components/catalog-item/catalog-item';
import { useCatalogoContext } from '../../hooks/catalog/catalog.hook';
import { catalogo, CatalogoItem } from '../../models/catalog.interface';

function CatalogList() {
  const catalog = useCatalogoContext();

  useEffect(() => {
    catalog.setAllItems(catalogo);
  }, [catalog]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Box>
        <CatalogFilter />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
        {catalog.filteredItems.map((catalogo: CatalogoItem, index: number) => {
          return (
            <Fade
              key={catalogo.id}
              in={true}
              timeout={{ enter: 500 + index * 100 }}>
              <Box
                sx={{
                  maxWidth: 300,
                  width: '100%',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                  },
                }}>
                <CatalogItem catalogo={catalogo} />
              </Box>
            </Fade>
          );
        })}
      </Box>
    </Box>
  );
}

export default CatalogList;
