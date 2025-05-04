/* eslint-disable react-refresh/only-export-components */
import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  catalogo,
  CatalogoItem,
  TiposCategoriaEnum,
  updateCatalogo,
} from '../../models/catalog.interface';

interface FilterState {
  titulo: string;
  categorias: TiposCategoriaEnum[];
}

interface CatalogoFilterContextType {
  filters: FilterState;
  updateFilter: (newFilters: Partial<FilterState>) => void;
  filteredItems: CatalogoItem[];
  allItems: CatalogoItem[];
  favorites: CatalogoItem[];
  updateFavorites: (item: CatalogoItem) => void;
  setAllItems: (items: CatalogoItem[]) => void;
  updateCatalog: (items: CatalogoItem) => void;
}

const CatalogoFilterContext = createContext<
  CatalogoFilterContextType | undefined
>(undefined);

export const CatalogoFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [filters, setFilters] = useState<FilterState>({
    titulo: '',
    categorias: [],
  });
  const [allItems, setAllItems] = useState<CatalogoItem[]>([]);

  const favorites = React.useMemo(() => {
    return allItems.filter((item) => item.favorito);
  }, [allItems]);

  const updateFilter = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const updateFavorites = (item: CatalogoItem) => {
    updateCatalogo(
      catalogo.map((i) =>
        i.id === item.id ? { ...i, favorito: !item.favorito } : i,
      ),
    );
    setAllItems(catalogo);
  };

  const updateCatalog = (newCatalog: CatalogoItem) => {
    updateCatalogo(
      catalogo.map((i) => (i.id === newCatalog.id ? newCatalog : i)),
    );
    setAllItems(catalogo);
  };

  const filteredItems = catalogo.filter((item) => {
    const matchesTitulo = item.titulo
      .toLowerCase()
      .includes(filters.titulo.toLowerCase());
    const matchesCategoria =
      filters.categorias.length === 0
        ? true
        : filters.categorias.includes(item.categoria);

    return matchesTitulo && matchesCategoria;
  });

  return (
    <CatalogoFilterContext.Provider
      value={{
        filters,
        updateFilter,
        filteredItems,
        allItems,
        setAllItems,
        updateCatalog,
        favorites,
        updateFavorites,
      }}>
      {children}
    </CatalogoFilterContext.Provider>
  );
};

export const useCatalogoContext = () => {
  const context = useContext(CatalogoFilterContext);
  if (!context) {
    throw new Error(
      'useCatalogoFilterContext deve ser usado dentro de um CatalogoFilterProvider',
    );
  }
  return context;
};
