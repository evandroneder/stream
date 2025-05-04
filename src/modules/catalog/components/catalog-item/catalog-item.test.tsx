import { render, screen, fireEvent } from '@testing-library/react';
import CatalogItem from './catalog-item';
import {
  CatalogoItem,
  TiposCategoriaEnum,
} from '../../models/catalog.interface';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockedNavigate = vi.fn();
const mockedUpdateFavorites = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom',
  );
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

vi.mock('../../hooks/catalog/catalog.hook', () => ({
  useCatalogoContext: () => ({
    updateFavorites: mockedUpdateFavorites,
  }),
}));

const mockCatalogItem: CatalogoItem = {
  id: 1,
  titulo: 'Título Teste',
  descricao: 'Descrição Teste',
  imagem: 'https://via.placeholder.com/150',
  categoria: TiposCategoriaEnum.FILME,
  favorito: false,
};

describe('CatalogItem Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar título, descrição e categoria', () => {
    render(<CatalogItem catalogo={mockCatalogItem} />);

    expect(screen.getByText('Título Teste')).toBeInTheDocument();
    expect(screen.getByText('Descrição Teste')).toBeInTheDocument();
    expect(screen.getByText('Filme')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('deve navegar para a página do item ao clicar no card', () => {
    render(<CatalogItem catalogo={mockCatalogItem} />);
    const card = screen.getByText('Título Teste').closest('div');

    fireEvent.click(card!);
    expect(mockedNavigate).toHaveBeenCalledWith('/1');
  });

  it('deve chamar updateFavorites ao clicar no botão de favorito', () => {
    render(<CatalogItem catalogo={mockCatalogItem} />);
    const favoriteButton = screen.getByRole('button');

    fireEvent.click(favoriteButton);
    expect(mockedUpdateFavorites).toHaveBeenCalledWith(mockCatalogItem);
  });
});
