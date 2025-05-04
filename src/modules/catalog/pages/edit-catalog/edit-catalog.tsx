import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CatalogForm } from '../../components/catalog-form/catalog-form';
import { useCatalogoContext } from '../../hooks/catalog/catalog.hook';

function EditCatalog() {
  const navigate = useNavigate();
  const { allItems } = useCatalogoContext();

  const { id } = useParams<{ id: string }>();

  const catalogo = allItems.find((item) => item.id.toString() === id);

  if (!catalogo) {
    navigate('');
    return null;
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <IconButton color="primary" onClick={() => navigate('/')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1" color="primary">
          Voltar
        </Typography>
      </Box>
      <Box sx={{ alignContent: 'center', display: 'flex' }}>
        <img width={300} src={catalogo?.imagem} />
      </Box>

      <CatalogForm catalogo={catalogo} />
    </Box>
  );
}

export default EditCatalog;
