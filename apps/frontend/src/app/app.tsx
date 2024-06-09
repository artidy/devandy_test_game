import { Route, Routes } from 'react-router-dom';

import { UrlPaths } from '@devandy-test-game/shared';
import LayoutPage from './pages/layout.page';
import MainPage from './pages/main.page';
import Page404 from './pages/404.page';

export function App() {
  return (
    <Routes>
      <Route path={UrlPaths.Main} element={<LayoutPage />}>
        <Route index element={<MainPage />} />
        <Route path={UrlPaths.NotFound} element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
