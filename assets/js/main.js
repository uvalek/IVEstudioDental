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
