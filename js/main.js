/**
 * MAIN.JS - El Director de Orquesta
 * Maneja la carga inicial, el filtrado universal y la navegación móvil.
 */

document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById("buscador");
    const burgerBtn = document.getElementById('burger-btn');
    const navMenu = document.getElementById('nav-menu');

    // --- 1. LÓGICA DE NAVEGACIÓN (MENÚ HAMBURGUESA) ---

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Animación manual de las líneas para formar una X
            const spans = burgerBtn.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Cerrar el menú automáticamente al hacer clic en un link de sección
        const links = navMenu.querySelectorAll('.nav-btn');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                // Reset de las líneas del botón
                const spans = burgerBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // --- 2. CARGA INICIAL DE PRODUCTOS ---

    actualizarTodasLasSecciones("");

    // --- 3. EVENTO DEL BUSCADOR ---

    if (buscador) {
        buscador.addEventListener("input", (e) => {
            const textoBusqueda = e.target.value.toLowerCase();
            actualizarTodasLasSecciones(textoBusqueda);
        });
    }

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