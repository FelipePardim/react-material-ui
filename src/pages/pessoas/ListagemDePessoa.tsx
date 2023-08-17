import { useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useEffect, useMemo, useState } from 'react';
import { IListagemPessoa, PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { useDebounce } from '../../shared/hooks';
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';

export const ListagemDePessoas: React.FC = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const { debounce } = useDebounce();

  const [ rows, setRows ] = useState<IListagemPessoa[]>([]);
  const [ totalCount, setTotalCount ] = useState<number>(0);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(1, busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);

            setRows(result.data);
            setTotalCount(result.totalCount);
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

        <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Açoes</TableCell>
                <TableCell>Nome Completo</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>Açoes {totalCount}</TableCell>
                  <TableCell>{row.nomeCompleto}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                {isLoading && (
                  <TableCell colSpan={3}>
                    <LinearProgress variant='indeterminate'/>
                  </TableCell>
                )}
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </LayoutBaseDePagina>
    </div>
  );
};