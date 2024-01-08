// Profil.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profil = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="container">
      {isAuthenticated ? (
        <div>
          <h2>Korisnički profil</h2>
          <p>
            <strong>Ime:</strong> {user.name}
          </p>
          <p>
            <strong>Nadimak:</strong> {user.nickname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>ID:</strong> {user.sub}
          </p>
        </div>
      ) : (
        <p>Morate biti prijavljeni da biste vidjeli korisnički profil.</p>
      )}
    </div>
  );
};

export default Profil;
