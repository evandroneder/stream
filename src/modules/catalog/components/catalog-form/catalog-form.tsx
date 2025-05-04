import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  CatalogoItem,
  TiposCategoriaEnum,
} from '../../models/catalog.interface';
import { useSnackbar } from '../../../shared/providers/snackbar.provider';
import { useCatalogoContext } from '../../hooks/catalog/catalog.hook';

type FormInputs = {
  imagem: string;
  titulo: string;
  descricao: string;
  categoria: TiposCategoriaEnum;
};

// 🛡️ Schema de validação com Yup
const schema = yup.object().shape({
  imagem: yup
    .string()
    .url('Informe uma URL válida')
    .required('Imagem é obrigatória'),
  titulo: yup.string().required('Titulo é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),
  categoria: yup
    .mixed<TiposCategoriaEnum>()
    .required('Categoria é obrigatória'),
});
interface CatalogFormProps {
  catalogo: CatalogoItem;
}

export function CatalogForm({ catalogo }: CatalogFormProps) {
  const catalog = useCatalogoContext();
  const showSnackbar = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: catalogo,
  });

  const onSubmit = (data: FormInputs) => {
    catalog.updateCatalog({
      id: catalogo.id,
      ...data,
    });
    showSnackbar('Catalogo alterado com sucesso!', 'success');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        maxWidth: 400,
        flexWrap: 'wrap',
      }}>
      <Controller
        name="imagem"
        control={control}
        render={({ field }) => (
          <TextField
            label="URL da Imagem"
            fullWidth
            error={!!errors.imagem}
            helperText={errors.imagem?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="titulo"
        control={control}
        render={({ field }) => (
          <TextField
            label="Título"
            fullWidth
            error={!!errors.titulo}
            helperText={errors.titulo?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="descricao"
        control={control}
        render={({ field }) => (
          <TextField
            label="Descrição"
            multiline
            minRows={3}
            fullWidth
            error={!!errors.descricao}
            helperText={errors.descricao?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="categoria"
        control={control}
        render={({ field }) => (
          <TextField
            label="Categoria"
            select
            fullWidth
            error={!!errors.categoria}
            helperText={errors.categoria?.message}
            {...field}>
            {Object.keys(TiposCategoriaEnum).map((key) => (
              <MenuItem
                key={key}
                value={
                  TiposCategoriaEnum[key as keyof typeof TiposCategoriaEnum]
                }>
                {TiposCategoriaEnum[key as keyof typeof TiposCategoriaEnum]}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Button variant="contained" type="submit">
        Alterar
      </Button>
    </Box>
  );
}
