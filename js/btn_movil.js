const btnMenu = document.getElementById('toggle-menu');
const btnCategorias = document.getElementById('toggle-categorias');
const opcionesUsuario = document.getElementById('opciones-usuario');
const categorias = document.getElementById('categorias');

if (btnMenu && opcionesUsuario && categorias) {
  btnMenu.addEventListener('click', () => {
    opcionesUsuario.classList.toggle('visible');
    if (categorias.classList.contains('visible')) {
      categorias.classList.remove('visible');
    }
  });
}

if (btnCategorias && categorias) {
  btnCategorias.addEventListener('click', () => {
    categorias.classList.toggle('visible');
    if (opcionesUsuario && opcionesUsuario.classList.contains('visible')) {
      opcionesUsuario.classList.remove('visible');
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
    const ps5Card = document.getElementById("ps5-card");
    if (ps5Card) {
      ps5Card.addEventListener("click", () => {
        window.location.href = "detalle_publicaciones.html";
      });
    }
  });