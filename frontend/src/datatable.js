import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Ime grada',
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: 'Županija',
  },
  {
    name: 'Gradonačelnik',
  },
  {
    name: 'Broj stanovnika',
  },
  {
    name: 'Površina',
  },
  {
    name: 'Godina osnutka',
  },
  {
    name: 'Zemljopisna širina',
  },
  {
    name: 'Zemljopisna visina',
  },
  {
    name: 'Nadmorska visina',
  },
  {
    name: 'Kvartovi',
  },
];

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
];

const Datatable = () => {
  return (
    <div className='container'>
      <Helmet>
        <title>OR-datatable</title>
        <meta charset='UTF-8' />
        <meta
          name='description'
          content='Otvoreni podaci o hrvatskim gradovima'
        />
        <meta name='author' content='Luka Miličević' />
        <meta name='license' content='Creative Commons Zero v1.0 Universal' />
      </Helmet>
      <h1>Otvoreno računarstvo</h1>
      <Link to='/'>Home</Link>
      <h3>Polje za pretragu</h3>
      <div className='filterMenu'>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input type='text' placeholder='Unesite vrijednost' />
          <label style={{ color: 'grey' }}>
            Po ovoj vrijednosti će se pretraživati podaci.
          </label>
        </div>
        <select placeholder='Odaberite polje za pretragu'>
          <option value='sve'>Sva polja (wildcard)</option>
          <option value='ime'>Ime Grada</option>
          <option value='zupanija'>Županija</option>
          <option value='gradonacelnik'>Gradonacelnik</option>
          <option value='broj'>Broj stanovnika</option>
          <option value='povrsina'>Ukupna površina</option>
          <option value='godina'>Godina osnutka</option>
          <option value='latitude'>Zemljopisna širina</option>
          <option value='longitude'>Zemljopisna visina</option>
          <option value='kvartovi'>Kvartovi</option>
        </select>
        <button className='btn'>Pretraži</button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Datatable;
