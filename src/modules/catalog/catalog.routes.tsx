import { CatalogoFilterProvider } from './hooks/catalog/catalog.hook';
import CatalogFavorites from './pages/catalog-favorites/catalog-favorites';
import CatalogList from './pages/catalog-list/catalog-list';
import EditCatalog from './pages/edit-catalog/edit-catalog';

export const CATALOG_ROUTES = [
  {
    path: '',
    elment: () => (
      <CatalogoFilterProvider>
        <CatalogList />
      </CatalogoFilterProvider>
    ),
  },
  {
    path: ':id',
    elment: () => (
      <CatalogoFilterProvider>
        <EditCatalog />
      </CatalogoFilterProvider>
    ),
  },
  {
    path: 'favoritos',
    elment: () => (
      <CatalogoFilterProvider>
        <CatalogFavorites />
      </CatalogoFilterProvider>
    ),
  },
];
