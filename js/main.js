const contenedor = document.getElementById("contenedor-productos");
const buscador = document.getElementById("buscador");

/**
 * Función principal para renderizar los productos en pantalla
 */
function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #999; margin-top: 50px;">
            No se encontraron productos que coincidan con tu búsqueda.
        </p>`;
        return;
    }

    lista.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("producto-card");

        const rutaImagen = p.imagen ? p.imagen : "https://via.placeholder.com/400?text=Sin+Imagen";

        // IMPORTANTE: Clase "descripcion" para que el CSS la encuentre
        card.innerHTML = `
            <div class="img-container">
                <img src="${rutaImagen}" alt="${p.nombre}">
            </div>
            <div class="info">
                <p class="categoria">${p.categoria || 'Coleccionable'}</p>
                <h3>${p.nombre}</h3>
                <p class="descripcion">${p.descripcion || 'Sin descripción disponible.'}</p>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

buscador.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const filtrados = productos.filter(p => {
        const nombre = (p.nombre || "").toLowerCase();
        const descripcion = (p.descripcion || "").toLowerCase();
        const categoria = (p.categoria || "").toLowerCase();

        return nombre.includes(texto) ||
            descripcion.includes(texto) ||
            categoria.includes(texto);
    });
    mostrarProductos(filtrados);
});

mostrarProductos(productos);