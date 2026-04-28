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
            const spans = burgerBtn.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                resetBurger(spans);
            }
        });

        const links = navMenu.querySelectorAll('.nav-btn');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                resetBurger(burgerBtn.querySelectorAll('span'));
            });
        });
    }

    function resetBurger(spans) {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    // --- 2. CARGA INICIAL Y BUSCADOR ---
    actualizarTodasLasSecciones("");

    if (buscador) {
        buscador.addEventListener("input", (e) => {
            const textoBusqueda = e.target.value.toLowerCase().trim();
            actualizarTodasLasSecciones(textoBusqueda);
        });
    }

    /**
     * Filtra y manda a renderizar cada sección.
     * Unificamos la búsqueda por clases como en Figuras y Juegos.
     */
    function actualizarTodasLasSecciones(termino) {
        // 1. CARTAS (Unificado para usar clase .productos-grid)
        if (typeof productos !== 'undefined') {
            const filtrados = productos.filter(p => filtrarItem(p, termino));
            const contenedor = document.querySelector(".productos-grid") || document.getElementById("contenedor-productos");
            renderizar(contenedor, filtrados, "producto-card", "img-container", "info");
        }

        // 2. FIGURAS
        if (typeof figuras !== 'undefined') {
            const filtrados = figuras.filter(f => filtrarItem(f, termino));
            const contenedor = document.querySelector(".figures-grid") || document.getElementById("contenedor-figuras");
            renderizar(contenedor, filtrados, "figure-card", "figure-img", "figure-info");
        }

        // 3. JUEGOS DE MESA
        if (typeof juegosMesa !== 'undefined') {
            const filtrados = juegosMesa.filter(j => filtrarItem(j, termino));
            const contenedor = document.querySelector(".boardgames-grid") || document.getElementById("contenedor-juegos");
            renderizar(contenedor, filtrados, "bg-card", "bg-img", "bg-info");
        }
    }

    function filtrarItem(item, termino) {
        if (!termino) return true;
        const nombre = (item.nombre || "").toLowerCase();
        const categoria = (item.categoria || "").toLowerCase();
        const desc = (item.descripcion || "").toLowerCase();
        return nombre.includes(termino) || categoria.includes(termino) || desc.includes(termino);
    }

    /**
     * Función de renderizado optimizada (String Building)
     */
    function renderizar(contenedor, lista, claseCard, claseImg, claseInfo) {
        if (!contenedor) return;

        contenedor.innerHTML = "";

        if (lista.length === 0) {
            contenedor.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #999; padding: 40px;">No se encontraron resultados.</p>`;
            return;
        }

        let acumuladorHTML = "";

        lista.forEach(item => {
            acumuladorHTML += `
                <div class="${claseCard}">
                    <div class="${claseImg}">
                        <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='assets/img/logo.png'">
                    </div>
                    <div class="${claseInfo}">
                        <p class="categoria">${item.categoria || 'Coleccionable'}</p>
                        <h3>${item.nombre}</h3>
                        <p class="descripcion">${item.descripcion || 'Sin descripción.'}</p>
                    </div>
                </div>
            `;
        });

        contenedor.innerHTML = acumuladorHTML;
    }
});