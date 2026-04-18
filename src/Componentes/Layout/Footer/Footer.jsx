import './Footer.css';

import { useEffect, useState } from 'react';

function Footer() {
  const [equipo, setEquipo] = useState([]);

  useEffect(() => {
    fetch('/data/programadores.json') // Ruta relativa a la carpeta public
      .then(response => response.json())
      .then(data => setEquipo(data));
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>Facebook Marquet</h2>
          <p>Tu lugar para encontrar de todo en La Plata y alrededores.</p>
        </div>

  
        <div className="footer-team">
          <h3>Nuestro Equipo</h3>
          <div className="team-grid">
            {equipo.map((persona) => (
              <div key={persona.id} className="dev-card">
                <img src={persona.imagen} alt={persona.nombre} className="dev-img" />
                <div className="dev-info">
                  <h4>{persona.nombre}</h4>
                  <p>{persona.informacion}</p>
                  <span>{persona.edad} años</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <nav className="footer-links">
          <ul>
            <li>Privacidad</li>
            <li>Condiciones</li>
            <li>Publicidad</li>
            <li>Ayuda</li>
          </ul>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Facebook Marquet - Ariel Dev</p>
      </div>
    </footer>
  );
}

export default Footer;