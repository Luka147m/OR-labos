import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container'>
      <Helmet>
        <title>OR</title>
        <meta charset='UTF-8' />
        <meta
          name='description'
          content='Otvoreni podaci o hrvatskim gradovima'
        />
        <meta name='author' content='Luka Miličević' />
        <meta name='license' content='Creative Commons Zero v1.0 Universal' />
      </Helmet>
      <h1>Otvoreno računarstvo</h1>
      <Link to='/datatable'>Datatable</Link>
      <h2>Otvoreni podaci o hrvatskim gradovima</h2>
      <p>
        Labos iz predmeta{' '}
        <a href='https://www.fer.unizg.hr/predmet/or'>Otvoreno Računarstvo</a>{' '}
        Skup podataka o gradovima Hrvatske
      </p>
      <p>
        <b>Autor:</b> Luka Miličević
      </p>
      <p>
        <b>Licenca:</b> Creative Commons Zero v1.0 Universal
      </p>
      <p>
        <b>Verzija:</b> 2.0
      </p>
      <p>
        <b>Jezik:</b> Hrvatski
      </p>
      <h3>Podaci</h3>
      <p>
        Podaci preuzeti od{' '}
        <a href='https://dzs.gov.hr/'>Državnog zavoda za statistiku</a> (popis
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
        <a href='/Gradovi.json'>JSON format podataka</a>
      </p>
      <p>
        <a href='/Gradovi.csv'>CSV format podataka</a>
      </p>
    </div>
  );
};

export default Home;
