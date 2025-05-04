import FavoriteIcon from '@mui/icons-material/Favorite';
import { Badge, Box, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCatalogoContext } from '../../hooks/catalog/catalog.hook';

function CatalogFavoritesIcon() {
  const catalog = useCatalogoContext();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Tooltip title="Ver favoritos">
        <IconButton
          onClick={() => navigate('/favoritos')}
          size="large"
          color="error">
          <Badge badgeContent={catalog.favorites.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default CatalogFavoritesIcon;
