import { Navigate, Route, Routes } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, ListagemDePessoas } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página inicial',
        icon: 'home',
        path: '/pagina-inicial',
      },
      {
        label: 'Pessoas',
        icon: 'people',
        path: '/pessoas',
      },
    ]);
  }, []);
    
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />}></Route>
      <Route path="/pessoas" element={<ListagemDePessoas />}></Route>
      <Route path="/pessoas/detalhe/:id" element={<p>Edicao de pessoa</p>}></Route>

      <Route path="*" element={<Navigate to="/pagina-inicial"/>}></Route>
    </Routes>
  );
};