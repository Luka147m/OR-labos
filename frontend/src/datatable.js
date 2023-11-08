import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import exportFromJSON from 'export-from-json';

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
  {
    name: 'Kvart',
    selector: (row) => row.nazivkvarta,
    sortable: true,
  },
  {
    name: 'Broj stanovnika kvarta',
    selector: (row) => row.brojkvartstan,
    sortable: true,
  },
];

const Datatable = () => {
  const [selectedField, setSelectedField] = useState('sve');
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
    const requestData = {
      searchInput: searchInput,
      selectedField: selectedField,
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((fetchedData) => {
        setData(fetchedData);
        //console.log(fetchedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const exportCSV = () => {
    const fileName = 'Gradovi';
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const exportJSON = () => {
    const formattedJSON = data.reduce((acc, current) => {
      const postojiGrad = acc.find((grad) => grad.gradid === current.gradid);

      if (postojiGrad) {
        if (current.nazivkvarta) {
          postojiGrad.kvartovi.push({
            nazivkvarta: current.nazivkvarta,
            brojkvartstan: current.brojkvartstan,
          });
        }
      } else {
        const noviGrad = {
          gradid: current.gradid,
          imegrada: current.imegrada,
          zupanija: current.zupanija,
          gradonacelnik: current.gradonacelnik,
          brojstanovnika: current.brojstanovnika,
          povrsina: parseFloat(current.povrsina),
          godinaosnutka: current.godinaosnutka,
          latitude: parseFloat(current.latitude),
          longitude: parseFloat(current.longitude),
          nadmorskavisina: current.nadmorskavisina,
          kvartovi: [],
        };

        if (current.nazivkvarta) {
          noviGrad.kvartovi.push({
            nazivkvarta: current.nazivkvarta,
            brojkvartstan: current.brojkvartstan,
          });
        }

        acc.push(noviGrad);
      }

      return acc;
    }, []);

    const fileName = 'Gradovi';
    const exportType = exportFromJSON.types.json;
    exportFromJSON({ data: formattedJSON, fileName, exportType });
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
          <label style={{ color: 'grey', fontSize: '12px' }}>
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
          <option value='nadmorska'>Nadmorska visina</option>
          <option value='kvart'>Naziv kvarta</option>
          <option value='kvartbroj'>Broj stanovnika kvarta</option>
        </select>
        <button className='btn' onClick={bntPressed}>
          Pretraži
        </button>
        <button onClick={exportCSV}>Generiraj CSV</button>
        <button onClick={exportJSON}>Generiraj JSON</button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        noDataComponent='Pretraži da prikažeš rezultat/nema rezultata'
        customStyles={customStyles}
        pagination
        striped
      />
    </div>
  );
};

export default Datatable;
