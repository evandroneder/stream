/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CatalogFavorites from './catalog-favorites';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom',
  );
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

const mockedUseCatalogoContext = vi.fn();

vi.mock('../../hooks/catalog/catalog.hook', () => ({
  useCatalogoContext: () => mockedUseCatalogoContext(),
}));

vi.mock('../../components/catalog-item/catalog-item', () => ({
  default: ({ catalogo }: any) => (
    <div data-testid="catalog-item">{catalogo.titulo}</div>
  ),
}));

describe('CatalogFavorites', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza favoritos corretamente', () => {
    mockedUseCatalogoContext.mockReturnValue({
      favorites: [
        {
          id: 1,
          titulo: 'Título Favorito',
          descricao: 'Descrição',
          imagem: 'https://via.placeholder.com/150',
          categoria: 'Filme',
          favorito: true,
        },
      ],
    });

    render(<CatalogFavorites />);
    expect(screen.getByTestId('catalog-item')).toBeInTheDocument();
    expect(screen.getByText('Título Favorito')).toBeInTheDocument();
  });

  it('exibe mensagem se não houver favoritos', () => {
    mockedUseCatalogoContext.mockReturnValue({
      favorites: [],
    });

    render(<CatalogFavorites />);
    expect(screen.getByText('Nenhum favorito encontrado.')).toBeInTheDocument();
  });

  it('navega para "/" ao clicar em voltar', () => {
    mockedUseCatalogoContext.mockReturnValue({ favorites: [] });

    render(<CatalogFavorites />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
