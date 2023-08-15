import { Navigate, Route, Routes } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, ListagemDeCidade } from '../pages';

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
        label: 'Cidades',
        icon: 'location_city',
        path: '/cidades',
      },
    ]);
  }, []);
    
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />}></Route>
      <Route path="/cidades" element={<ListagemDeCidade />}></Route>

      <Route path="*" element={<Navigate to="/pagina-inicial"/>}></Route>
    </Routes>
  );
};