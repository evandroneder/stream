import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as catalogHook from '../../hooks/catalog/catalog.hook';
import { TiposCategoriaEnum } from '../../models/catalog.interface';
import EditCatalog from './edit-catalog';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom',
  );

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: () => ({ id: '1' }),
  };
});

vi.mock('../../components/catalog-form/catalog-form', () => ({
  CatalogForm: () => <div data-testid="catalog-form" />,
}));

describe('EditCatalog', () => {
  const mockItem = {
    id: 1,
    imagem: 'http://example.com/image.jpg',
    titulo: 'Mock Título',
    descricao: 'Descrição',
    categoria: TiposCategoriaEnum.ANIMACAO,
  };

  beforeEach(() => {
    vi.spyOn(catalogHook, 'useCatalogoContext').mockReturnValue({
      allItems: [mockItem],
      filters: {
        categorias: [],
        titulo: '',
      },
      updateFilter: vi.fn(),
      filteredItems: [],
      favorites: [],
      updateFavorites: vi.fn(),
      setAllItems: vi.fn(),
      updateCatalog: vi.fn(),
    });
    mockedNavigate.mockClear();
  });

  it('renderiza corretamente com item válido', () => {
    render(
      <MemoryRouter>
        <EditCatalog />
      </MemoryRouter>,
    );

    expect(screen.getByText('Voltar')).toBeInTheDocument();
    expect(screen.getByTestId('catalog-form')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockItem.imagem);
  });

  it('navega para a home se o item não for encontrado', () => {
    vi.spyOn(catalogHook, 'useCatalogoContext').mockReturnValue({
      allItems: [],
      filters: {
        categorias: [],
        titulo: '',
      },
      updateFilter: vi.fn(),
      filteredItems: [],
      favorites: [],
      updateFavorites: vi.fn(),
      setAllItems: vi.fn(),
      updateCatalog: vi.fn(),
    });

    render(
      <MemoryRouter>
        <EditCatalog />
      </MemoryRouter>,
    );

    expect(mockedNavigate).toHaveBeenCalledWith('');
  });

  it('navega para / ao clicar no botão de voltar', () => {
    render(
      <MemoryRouter>
        <EditCatalog />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button')); // Certifique-se de que é um botão
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
