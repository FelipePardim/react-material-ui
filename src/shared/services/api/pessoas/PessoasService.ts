import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemPessoa {
    id: number;
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}

export interface IDetalhePessoa {
    id: number;
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}

type TPessoasComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao listar os registros');
  }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
  try {
    const urlRelativa = `/pessoas/${id}`;
    const { data } = await Api.get(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao buscar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao buscar o registro');
  }
};

const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
  try {
    const urlRelativa = '/pessoas';
    const { data } = await Api.post<IDetalhePessoa>(urlRelativa, dados);
    
    if (data) {
      return data.id;
    }
    
    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (dados: IDetalhePessoa, id: number): Promise<number | Error> => {
  try {
    const urlRelativa = `/pessoas/${id}`;
    const { status } = await Api.put<IDetalhePessoa>(urlRelativa, dados);

    if (status === 200) {
      return status;
    }

    return new Error('Erro ao atualizar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<number | Error> => {
  try {
    const urlRelativa = `/pessoas/${id}`;
    const { status } = await Api.delete(urlRelativa);

    if (status === 200) {
      return status;
    }
  
    return new Error('Erro ao apagar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'Erro ao apagar registro');
  }
};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};