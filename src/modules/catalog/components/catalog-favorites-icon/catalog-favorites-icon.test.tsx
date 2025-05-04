import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CatalogFavoritesIcon from './catalog-favorites-icon';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate,
}));

vi.mock('../../hooks/catalog/catalog.hook', () => ({
  useCatalogoContext: () => ({
    favorites: [
      { id: 1, titulo: 'Item 1' },
      { id: 2, titulo: 'Item 2' },
    ],
  }),
}));

describe('CatalogFavorites Component', () => {
  it('deve renderizar o ícone de favoritos com o número correto de favoritos', () => {
    render(<CatalogFavoritesIcon />);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
