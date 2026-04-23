const contenedor = document.getElementById("contenedor-productos");
const buscador = document.getElementById("buscador");

/**
 * Función principal para renderizar los productos en pantalla
 * @param {Array} lista - El array de productos a mostrar
 */
function mostrarProductos(lista) {
    // 1. Limpiamos el contenedor antes de dibujar
    contenedor.innerHTML = "";

    // 2. Si la búsqueda no arroja resultados, mostramos un mensaje
    if (lista.length === 0) {
        contenedor.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #999; margin-top: 50px;">
            No se encontraron productos que coincidan con tu búsqueda.
        </p>`;
        return;
    }

    // 3. Recorremos la lista y creamos las tarjetas
    lista.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("producto-card");

        // Verificamos si existe la imagen, de lo contrario usamos un placeholder
        const rutaImagen = p.imagen ? p.imagen : "https://via.placeholder.com/400?text=Sin+Imagen";

        card.innerHTML = `
            <img src="${rutaImagen}" alt="${p.nombre}">
            <div class="info">
                <h3>${p.nombre}</h3>
                <p>${p.descripcion}</p>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

/**
 * Evento para el buscador
 * Filtra en tiempo real por nombre y descripción
 */
buscador.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();

    const filtrados = productos.filter(p => {
        const nombre = p.nombre.toLowerCase();
        const descripcion = p.descripcion.toLowerCase();
        return nombre.includes(texto) || descripcion.includes(texto);
    });

    mostrarProductos(filtrados);
});

// Inicializamos la página mostrando todos los productos al cargar
mostrarProductos(productos);