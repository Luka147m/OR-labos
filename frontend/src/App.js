import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import DataTable from './datatable';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/datatable' exact Component={DataTable} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
