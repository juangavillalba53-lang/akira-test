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
    // Forzamos la carga inicial vacía
    actualizarTodasLasSecciones("");

    if (buscador) {
        buscador.addEventListener("input", (e) => {
            // .trim() elimina espacios accidentales al inicio o final
            const textoBusqueda = e.target.value.toLowerCase().trim();
            actualizarTodasLasSecciones(textoBusqueda);
        });
    }

    /**
     * Filtra y manda a renderizar cada sección.
     */
    function actualizarTodasLasSecciones(termino) {
        // 1. CARTAS
        if (typeof productos !== 'undefined') {
            const filtrados = productos.filter(p => filtrarItem(p, termino));
            const contenedor = document.getElementById("contenedor-productos");
            renderizar(contenedor, filtrados, "producto-card", "img-container", "info");
        }

        // 2. FIGURAS
        if (typeof figuras !== 'undefined') {
            const filtrados = figuras.filter(f => filtrarItem(f, termino));
            const contenedor = document.getElementById("contenedor-figuras") || document.querySelector(".figures-grid");
            renderizar(contenedor, filtrados, "figure-card", "figure-img", "figure-info");
        }

        // 3. JUEGOS DE MESA
        if (typeof juegosMesa !== 'undefined') {
            const filtrados = juegosMesa.filter(j => filtrarItem(j, termino));
            const contenedor = document.getElementById("contenedor-juegos") || document.querySelector(".boardgames-grid");
            renderizar(contenedor, filtrados, "bg-card", "bg-img", "bg-info");
        }
    }

    function filtrarItem(item, termino) {
        if (!termino) return true; // Si no hay búsqueda, mostrar todo
        const nombre = (item.nombre || "").toLowerCase();
        const categoria = (item.categoria || "").toLowerCase();
        const desc = (item.descripcion || "").toLowerCase();
        return nombre.includes(termino) || categoria.includes(termino) || desc.includes(termino);
    }

    /**
     * Función de renderizado optimizada
     */
    function renderizar(contenedor, lista, claseCard, claseImg, claseInfo) {
        if (!contenedor) return;

        // Limpiamos el contenedor
        contenedor.innerHTML = "";

        if (lista.length === 0) {
            contenedor.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #999; padding: 40px;">No se encontraron resultados.</p>`;
            return;
        }

        // Usamos un fragmento de texto (string building) para mayor velocidad
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

        // Insertamos todo el HTML de una sola vez
        contenedor.innerHTML = acumuladorHTML;
    }
});