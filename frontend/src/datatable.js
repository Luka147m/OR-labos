import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import DataTable from 'react-data-table-component';

const customStyles = {
  headCells: {
    style: {
      fontWeight: 'bold',
      fontSize: '14px',
    },
  },
};

const columns = [
  {
    name: 'Ime grada',
    selector: (row) => row.imegrada,
    sortable: true,
  },
  {
    name: 'Županija',
    selector: (row) => row.zupanija,
    sortable: true,
  },
  {
    name: 'Gradonačelnik',
    selector: (row) => row.gradonacelnik,
    sortable: true,
  },
  {
    name: 'Broj stanovnika',
    selector: (row) => row.brojstanovnika,
    sortable: true,
  },
  {
    name: 'Površina',
    selector: (row) => row.povrsina,
    sortable: true,
  },
  {
    name: 'Godina osnutka',
    selector: (row) => row.godinaosnutka,
    sortable: true,
  },
  {
    name: 'Zemljopisna širina',
    selector: (row) => row.latitude,
    sortable: true,
  },
  {
    name: 'Zemljopisna visina',
    selector: (row) => row.longitude,
    sortable: true,
  },
  {
    name: 'Nadmorska visina',
    selector: (row) => row.nadmorskavisina,
    sortable: true,
  },
];

const Datatable = () => {
  const [selectedField, setSelectedField] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState([]);

  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const bntPressed = () => {
    const apiUrl = `/getJson`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((fetchedData) => {
        setData(fetchedData[0].json_agg);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

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
          <input
            type='text'
            placeholder='Unesite vrijednost'
            value={searchInput}
            onChange={handleInputChange}
          />
          <label style={{ color: 'grey' }}>
            Po ovoj vrijednosti će se pretraživati podaci.
          </label>
        </div>
        <select
          placeholder='Odaberite polje za pretragu'
          value={selectedField}
          onChange={handleFieldChange}
        >
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
        <button className='btn' onClick={bntPressed}>
          Pretraži
        </button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        noDataComponent='Pretraži da prikažeš rezultat'
        customStyles={customStyles}
      />
    </div>
  );
};

export default Datatable;
