/* IV Estudio Dental — único archivo de JavaScript del sitio.
 *
 * La página funciona completa sin esto: el menú de celular abre y cierra con
 * una casilla de CSS. Lo que hay aquí sólo lo pule.
 *
 * 1. Cierra el menú al elegir una sección.
 * 2. Cierra el menú con la tecla Esc.
 * 3. Cierra el menú al tocar fuera.
 * 4. Le dice a los lectores de pantalla si el menú está abierto o cerrado.
 */

(function () {
  'use strict';

  var casilla = document.getElementById('menu');
  var barra = document.querySelector('.nav');
  if (!casilla || !barra) return;

  var boton = barra.querySelector('.nav__boton');

  function cerrar() {
    if (!casilla.checked) return;
    casilla.checked = false;
    avisar();
  }

  // aria-expanded le dice al lector de pantalla en qué estado está el menú.
  function avisar() {
    if (boton) boton.setAttribute('aria-expanded', casilla.checked ? 'true' : 'false');
  }

  casilla.addEventListener('change', avisar);
  avisar();

  // 1. Al tocar un enlace del menú
  barra.querySelectorAll('.nav__enlace').forEach(function (enlace) {
    enlace.addEventListener('click', cerrar);
  });

  // 2. Tecla Esc
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') cerrar();
  });

  // 3. Al tocar fuera de la barra
  document.addEventListener('click', function (evento) {
    if (!barra.contains(evento.target)) cerrar();
  });
})();


/* ---------------------------------------------------------------------------
 * ANIMACIONES DE ENTRADA
 *
 * Los elementos con clase "revelar" (y sus variantes) aparecen con un
 * desvanecido cuando entran en pantalla.
 *
 * La clase .js que activa las animaciones ya la puso un script diminuto en el
 * <head>. Aquí sólo se van marcando los elementos como visibles.
 *
 * Si algo de esto falla, el bloque de rescate del final quita la clase .js y
 * la página se ve entera, sin animaciones. El contenido nunca queda oculto.
 * ------------------------------------------------------------------------ */

(function () {
  'use strict';

  var raiz = document.documentElement;

  function mostrarTodo() {
    raiz.classList.remove('js');
  }

  try {
    var objetivos = document.querySelectorAll(
      '.revelar, .revelar-filete, .revelar-estrellas, .revelar-cifra, .revelar-foto'
    );
    if (!objetivos.length) return;

    // Navegador viejo sin IntersectionObserver: se muestra todo y ya.
    if (!('IntersectionObserver' in window)) {
      mostrarTodo();
      return;
    }

    var funciono = false;

    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          funciono = true;
          entrada.target.classList.add('visible');
          observador.unobserve(entrada.target); // una sola vez
        });
      },
      {
        // Empieza la animación un poco antes de que el elemento llegue al
        // borde, para que el movimiento no se vea cortado.
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.05
      }
    );

    objetivos.forEach(function (el) {
      observador.observe(el);
    });

    // Red de seguridad: si a los 3 segundos el observador no ha reaccionado
    // ni una vez, algo va mal y se muestra la página entera sin animaciones.
    // Ojo: NO se marcan todos los elementos como visibles, porque eso dejaría
    // sin animación a las secciones de más abajo cuando el usuario baje.
    setTimeout(function () {
      if (!funciono) mostrarTodo();
    }, 3000);
  } catch (e) {
    mostrarTodo();
  }
})();
