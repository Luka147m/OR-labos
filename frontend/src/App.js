import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Home from './home';
import DataTable from './datatable';
import Profil from './profil';

function App() {
  return (
    <div className="App">
      <Auth0Provider
        domain="luka147.eu.auth0.com"
        clientId="o6d0R6Qx0sCfRKUZKXLGsuFQp5S6Pou4"
        redirectUri={window.location.origin}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/datatable" element={<DataTable />} />
            <Route path="/profil" element={<Profil />} />
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </div>
  );
}

export default App;
