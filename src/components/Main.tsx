import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import StartPage from '../pages/StartPage/StartPage';

const Layout = styled.div`
  width: 100dvw;
  height: 100dvh;
`;

export default function Main() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/lobby' element={<div>게임 로비</div>} />
        <Route path='/room/:id' element={<div></div>} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </Layout>
  );
}
