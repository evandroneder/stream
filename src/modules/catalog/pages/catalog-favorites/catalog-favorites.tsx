import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Fade, IconButton, Typography } from '@mui/material';
import React from 'react';
import CatalogItem from '../../components/catalog-item/catalog-item';
import { CatalogoItem } from '../../models/catalog.interface';
import { useNavigate } from 'react-router-dom';
import { useCatalogoContext } from '../../hooks/catalog/catalog.hook';

function CatalogFavorites() {
  const catalog = useCatalogoContext();
  const navigate = useNavigate();

  const ItemList = React.memo(
    ({ catalogo, index }: { catalogo: CatalogoItem; index: number }) => {
      return (
        <Fade in={true} timeout={{ enter: 500 + index * 100 }}>
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
    },
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <IconButton color="primary" onClick={() => navigate('/')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1" color="primary">
          Voltar
        </Typography>
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
        {catalog.favorites.length === 0 && (
          <Typography variant="h6" color="textSecondary">
            Nenhum favorito encontrado.
          </Typography>
        )}

        {catalog.favorites.map((item, index) => {
          return <ItemList key={item.id} catalogo={item} index={index} />;
        })}
      </Box>
    </Box>
  );
}

export default CatalogFavorites;
