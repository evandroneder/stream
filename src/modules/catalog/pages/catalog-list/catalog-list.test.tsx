import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  CatalogoItem,
  TiposCategoriaEnum,
} from '../../models/catalog.interface';
import CatalogList from './catalog-list';

vi.mock('../../hooks/catalog/catalog.hook', () => ({
  useCatalogoContext: () => ({
    filteredItems: [
      {
        id: 1,
        titulo: 'Filme 1',
        descricao: 'Descrição do filme 1',
        imagem: 'https://via.placeholder.com/150',
        categoria: TiposCategoriaEnum.FILME,
        favorito: false,
      },
      {
        id: 2,
        titulo: 'Série 2',
        descricao: 'Descrição da série 2',
        imagem: 'https://via.placeholder.com/150',
        categoria: TiposCategoriaEnum.SERIE,
        favorito: true,
      },
    ],
    setAllItems: vi.fn(),
  }),
}));

vi.mock('../../components/catalog-filter/catalog-filter', () => ({
  default: () => <div data-testid="catalog-filter" />,
}));

vi.mock('../../components/catalog-item/catalog-item', () => ({
  default: ({ catalogo }: { catalogo: CatalogoItem }) => (
    <div data-testid="catalog-item">{catalogo.titulo}</div>
  ),
}));

describe('CatalogList', () => {
  it('renderiza corretamente com os itens filtrados', () => {
    render(<CatalogList />);

    expect(screen.getByTestId('catalog-filter')).toBeInTheDocument();

    const items = screen.getAllByTestId('catalog-item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Filme 1');
    expect(items[1]).toHaveTextContent('Série 2');
  });
});
