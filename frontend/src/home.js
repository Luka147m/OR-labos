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
      <h3>Linkovi na skupove podataka</h3>
      <p>
        <a href='https://raw.githubusercontent.com/Luka147m/OR-labos/main/Gradovi.json'>
          JSON format podataka
        </a>{' '}
        <a href='https://raw.githubusercontent.com/Luka147m/OR-labos/main/Gradovi.csv'>
          CSV format podataka
        </a>
      </p>
    </div>
  );
};

export default Home;
