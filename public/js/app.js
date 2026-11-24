const vehiculos = [
    // Primeros 3 vehículos con pagina de detalle dedicada
    { id: 1, marca: "Toyota", modelo: "Corolla LE", anio: 2024, precio: 850, imagen: "/img/auto1.jpg", detalle: "/detalle-1.html" },
    { id: 2, marca: "Honda", modelo: "CR-V Turbo", anio: 2024, precio: 1350, imagen: "/img/auto2.jpg", detalle: "/detalle-2.html" },
    { id: 3, marca: "Ford", modelo: "Mustang GT", anio: 2023, precio: 2400, imagen: "/img/auto3.jpg", detalle: "/detalle-3.html" },

    // Resto del catalogo
    { id: 4, marca: "Nissan", modelo: "Versa Advance", anio: 2024, precio: 720 },
    { id: 5, marca: "Volkswagen", modelo: "Jetta Comfortline", anio: 2023, precio: 950 },
    { id: 6, marca: "Mazda", modelo: "Mazda 3 Sedán", anio: 2024, precio: 1050 },
    { id: 7, marca: "Kia", modelo: "K3 EX", anio: 2024, precio: 780 },
    { id: 8, marca: "Hyundai", modelo: "Elantra GLS", anio: 2023, precio: 890 },
    { id: 9, marca: "Chevrolet", modelo: "Onix Premier", anio: 2024, precio: 740 },
    { id: 10, marca: "Toyota", modelo: "RAV4 XLE", anio: 2023, precio: 1400 },
    { id: 11, marca: "Mazda", modelo: "CX-5 Signature", anio: 2024, precio: 1480 },
    { id: 12, marca: "Nissan", modelo: "Kicks Exclusive", anio: 2023, precio: 980 },
    { id: 13, marca: "Volkswagen", modelo: "Taos Highline", anio: 2024, precio: 1290 },
    { id: 14, marca: "Kia", modelo: "Sportage SXL", anio: 2024, precio: 1380 },
    { id: 15, marca: "Hyundai", modelo: "Tucson Limited", anio: 2023, precio: 1320 },
    { id: 16, marca: "Chevrolet", modelo: "Tracker LT", anio: 2024, precio: 1020 },
    { id: 17, marca: "Ford", modelo: "Bronco Sport", anio: 2023, precio: 1650 },
    { id: 18, marca: "Jeep", modelo: "Wrangler Unlimited", anio: 2023, precio: 2200 },
    { id: 19, marca: "Toyota", modelo: "Hilux Doble Cabina", anio: 2024, precio: 1750 },
    { id: 20, marca: "Ford", modelo: "Ranger XLT", anio: 2024, precio: 1700 },
    { id: 21, marca: "Nissan", modelo: "Frontier Pro-4X", anio: 2023, precio: 1800 },
    { id: 22, marca: "Honda", modelo: "Civic Touring", anio: 2024, precio: 1120 },
    { id: 23, marca: "Toyota", modelo: "Camry XSE", anio: 2023, precio: 1450 },
    { id: 24, marca: "Volkswagen", modelo: "Teramont Peak", anio: 2024, precio: 1950 },
    { id: 25, marca: "Chevrolet", modelo: "Suburban RST", anio: 2023, precio: 2600 }
];

// Genera un SVG limpio si la fotografía física aún no está en public/img/
function obtenerImagenRespaldo(texto) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="220" viewBox="0 0 400 220">
        <rect width="400" height="220" fill="#1e3a5f"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="bold">${texto}</text>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Renderizar catálogo en index.html
    const contenedorCatalogo = document.getElementById('catalogo-grid');
    if (contenedorCatalogo) {
        vehiculos.forEach(auto => {
            const card = document.createElement('article');
            card.className = 'card';

            const imgSrc = auto.imagen || obtenerImagenRespaldo(`${auto.marca} ${auto.modelo}`);
            const fallbackSrc = obtenerImagenRespaldo(`${auto.marca} ${auto.modelo}`);

            const badgeHtml = auto.detalle
                ? '<span class="badge-destacado">Detalle disponible</span>'
                : '';

            const botonHtml = auto.detalle
                ? `<a href="${auto.detalle}" class="btn btn-primary">Ver detalles</a>`
                : `<a href="/contacto.html" class="btn btn-outline">Solicitar renta</a>`;

            card.innerHTML = `
                <img src="${imgSrc}" alt="${auto.marca} ${auto.modelo}" class="card-img" onerror="this.onerror=null;this.src='${fallbackSrc}';">
                <div class="card-body">
                    ${badgeHtml}
                    <h3 class="card-title">${auto.marca} ${auto.modelo}</h3>
                    <p class="card-year">Año: ${auto.anio}</p>
                    <p class="card-price">$${auto.precio} MXN <span>/ día</span></p>
                    ${botonHtml}
                </div>
            `;
            contenedorCatalogo.appendChild(card);
        });
    }

    // Mostrar confirmación de envío en contacto.html
    const alertaExito = document.getElementById('alerta-exito');
    if (alertaExito) {
        const params = new URLSearchParams(window.location.search);
        if (params.get('enviado') === 'true') {
            alertaExito.style.display = 'block';
        }
    }
});