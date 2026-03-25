document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedor-servicios');

  if (!contenedor) {
    console.log("Advertencia: No se encontró el contenedor de servicios en esta página.");
    return;
  }

  fetch('php/devuelve.php')
    .then(response => {
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        window.location.href = '../../errors/resultadonojson.html';
        return;
      }
      return response.json();
    })
    .then(data => {
      if (!data) return;

      contenedor.innerHTML = '';

      data.forEach(servicio => {
        const card = `
                    <article class="service-detail-card">
                        <div class="service-header">
                            <h3>${servicio.nombre}</h3>
                            <span class="service-price-tag">$${servicio.precio}</span>
                        </div>
                        <p class="service-description">${servicio.descripcion}</p>
                        <div class="service-footer">
                            <div class="service-duration">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                                </svg>
                                <span>${servicio.tiempo}</span>
                            </div>
                            <button class="btn-service">Solicitar</button>
                        </div>
                    </article>
                `;
        contenedor.insertAdjacentHTML('beforeend', card);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      if (window.location.pathname.includes('servicios.html')) {
        window.location.href = '../../errors/errorinterno.html';
      }
    });
});
