import { useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useEffect, useMemo } from 'react';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const ListagemDePessoas: React.FC = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    PessoasService.getAll();
  }, []);

  return (
    <div>
      <LayoutBaseDePagina 
        titulo="Listagem de Pessoas" 
        barraDeFerramentas={
          <FerramentasDaListagem 
            mostrarInputBusca
            textoBotaoNovo='Nova'
            textoDaBusca={busca}
            aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
          />
        }>
      </LayoutBaseDePagina>
    </div>
  );
};