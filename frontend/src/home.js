import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const osvjezi = async (event) => {
    event.preventDefault();
    try {
      await fetch('/osvjezi');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>OR</title>
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="Otvoreni podaci o hrvatskim gradovima"
        />
        <meta name="author" content="Luka Miličević" />
        <meta name="license" content="Creative Commons Zero v1.0 Universal" />
      </Helmet>
      <h1>Otvoreno računarstvo</h1>
      <Link to="/datatable">Datatable</Link>
      {isAuthenticated ? (
        <div>
          <p>Dobrodošao, {user.nickname}!</p>

          <button onClick={() => navigate('/profil')}>Korisnički profil</button>
          <button type="button" onClick={(event) => osvjezi(event)}>
            Osvježi preslike
          </button>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Prijava</button>
        </div>
      )}
      <h2>Otvoreni podaci o hrvatskim gradovima</h2>
      <p>
        Labos iz predmeta{' '}
        <a href="https://www.fer.unizg.hr/predmet/or">Otvoreno Računarstvo</a>{' '}
        Skup podataka o gradovima Hrvatske
      </p>
      <p>
        <b>Autor:</b> Luka Miličević
      </p>
      <p>
        <b>Licenca:</b> Creative Commons Zero v1.0 Universal
      </p>
      <p>
        <b>Verzija:</b> 4.0
      </p>
      <p>
        <b>Jezik:</b> Hrvatski
      </p>
      <h3>Podaci</h3>
      <p>
        Podaci preuzeti od{' '}
        <a href="https://dzs.gov.hr/">Državnog zavoda za statistiku</a> (popis
        2021.)
      </p>
      <ul>
        <li>Ime grada</li>
        <li>Županija - u kojoj se grad nalazi</li>
        <li>Gradonačelnik - trenutačni gradonačelnik u 2023. god</li>
        <li>Broj stanovnika</li>
        <li>Ukupna površina - zone grada u kilometrima kvadratnim</li>
        <li>
          Godina osnutka - negativna godina predstavlja godinu prije Krista
        </li>
        <li>Latitude - zemljopisna širina N</li>
        <li>Longitude - zemljopisna dužina E</li>
        <li>Kvartovi - sadrži ime kvarta i broj stanovnika kvarta</li>
      </ul>
      <h3>Linkovi na skupove podataka</h3>
      <p>
        <a href="/Gradovi.json">JSON format podataka</a>
      </p>
      <p>
        <a href="/Gradovi.csv">CSV format podataka</a>
      </p>
    </div>
  );
};

export default Home;
