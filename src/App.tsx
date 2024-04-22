import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return <div className='App'>
<Routes>
  <Route path='/game' element={<div>게임 로비</div>}/>
  <Route path='/room/:id' element={<div></div>}/>
</Routes>

  </div>;
}

export default App;
