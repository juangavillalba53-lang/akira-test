/**
 * MAIN.JS - El Director de Orquesta
 * Maneja la carga inicial y el filtrado universal de todas las secciones.
 */

document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById("buscador");

    // 1. CARGA INICIAL
    // Renderizamos todo por primera vez al abrir la página
    actualizarTodasLasSecciones("");

    // 2. EVENTO DEL BUSCADOR
    buscador.addEventListener("input", (e) => {
        const textoBusqueda = e.target.value.toLowerCase();
        actualizarTodasLasSecciones(textoBusqueda);
    });

    /**
     * Filtra y manda a renderizar cada sección
     */
    function actualizarTodasLasSecciones(termino) {
        // Filtrar y mostrar Cartas (vienen de productos.js)
        if (typeof productos !== 'undefined') {
            const filtrados = productos.filter(p => filtrarItem(p, termino));
            renderizar(document.getElementById("contenedor-productos"), filtrados, "producto-card", "img-container", "info");
        }

        // Filtrar y mostrar Figuras (vienen de figuras.js)
        if (typeof figuras !== 'undefined') {
            const filtrados = figuras.filter(f => filtrarItem(f, termino));
            renderizar(document.querySelector(".figures-grid"), filtrados, "figure-card", "figure-img", "figure-info");
        }

        // Filtrar y mostrar Juegos (vienen de juegos.js)
        if (typeof juegosMesa !== 'undefined') {
            const filtrados = juegosMesa.filter(j => filtrarItem(j, termino));
            renderizar(document.querySelector(".boardgames-grid"), filtrados, "bg-card", "bg-img", "bg-info");
        }
    }

    /**
     * Lógica de filtrado: busca en nombre, categoría y descripción
     */
    function filtrarItem(item, termino) {
        const nombre = (item.nombre || "").toLowerCase();
        const categoria = (item.categoria || "").toLowerCase();
        const desc = (item.descripcion || "").toLowerCase();
        return nombre.includes(termino) || categoria.includes(termino) || desc.includes(termino);
    }

    /**
     * Función de renderizado universal
     * Sirve para cualquier sección manteniendo las clases que definiste en el CSS
     */
    function renderizar(contenedor, lista, claseCard, claseImg, claseInfo) {
        if (!contenedor) return;
        contenedor.innerHTML = "";

        if (lista.length === 0) {
            contenedor.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #999; padding: 40px;">No se encontraron resultados.</p>`;
            return;
        }

        lista.forEach(item => {
            const card = document.createElement("div");
            card.className = claseCard;

            card.innerHTML = `
                <div class="${claseImg}">
                    <img src="${item.imagen}" alt="${item.nombre}">
                </div>
                <div class="${claseInfo}">
                    <p class="categoria">${item.categoria || 'Coleccionable'}</p>
                    <h3>${item.nombre}</h3>
                    <p class="descripcion">${item.descripcion || 'Sin descripción.'}</p>
                </div>
            `;
            contenedor.appendChild(card);
        });
    }
});