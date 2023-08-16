import { useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useEffect, useMemo } from 'react';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { useDebounce } from '../../shared/hooks';

export const ListagemDePessoas: React.FC = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const { debounce } = useDebounce();



  useEffect(() => {

    debounce(() => {
      PessoasService.getAll()
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);
          }
        });
    });
  }, [busca]);

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