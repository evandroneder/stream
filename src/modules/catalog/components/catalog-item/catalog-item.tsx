import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import {
  CatalogoItem,
  TiposCategoriaEnum,
} from '../../models/catalog.interface';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCatalogoContext } from '../../hooks/catalog/catalog.hook';
import React, { useCallback } from 'react';

interface CatalogItemProps {
  catalogo: CatalogoItem;
}

function CatalogItem({ catalogo }: CatalogItemProps) {
  const navigate = useNavigate();
  const { updateFavorites } = useCatalogoContext();

  const handleSelectItem = useCallback(() => {
    navigate(`/${catalogo.id}`);
  }, [catalogo, navigate]);

  const handleFavoriteClick = useCallback(() => {
    updateFavorites(catalogo);
  }, [updateFavorites, catalogo]);

  const Render = React.useMemo(() => {
    return (
      <Box sx={{ position: 'relative' }}>
        <Card
          sx={{
            backgroundImage: 'url(' + catalogo.imagem + ')',
            backgroundRepeat: 'no-repeat',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end ',
            position: 'relative',
          }}
          onClick={handleSelectItem}>
          <CardContent sx={{ background: ' rgba(0, 0, 0, 0.7)' }}>
            <Box>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                color="white">
                {catalogo.titulo}
              </Typography>
              <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                {catalogo.descricao}
              </Typography>
              <Box>
                <Chip
                  label={catalogo.categoria}
                  color={
                    catalogo.categoria === TiposCategoriaEnum.FILME
                      ? 'primary'
                      : catalogo.categoria === TiposCategoriaEnum.SERIE
                      ? 'secondary'
                      : catalogo.categoria === TiposCategoriaEnum.ANIMACAO
                      ? 'success'
                      : 'info'
                  }
                  size="small"
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
        <IconButton
          onClick={handleFavoriteClick}
          color={catalogo.favorito ? 'error' : 'default'}
          sx={{ position: 'absolute', top: 8, right: 8 }}>
          <FavoriteIcon />
        </IconButton>
      </Box>
    );
  }, [
    catalogo.categoria,
    catalogo.descricao,
    catalogo.favorito,
    catalogo.imagem,
    catalogo.titulo,
    handleFavoriteClick,
    handleSelectItem,
  ]);

  return Render;
}

export default CatalogItem;
