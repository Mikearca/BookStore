document.addEventListener("DOMContentLoaded", () => {
  const nombre = localStorage.getItem("nombre");
  const rol = localStorage.getItem("rol");

  if (!nombre || rol !== "1") {
    alert("Acceso restringido. Solo administradores pueden ingresar.");
    window.location.href = "../index.html";
  }
});

function cerrarSesion() {
  localStorage.clear();
  window.location.href = "../index.html";
}

function cargarVista(nombreVista) {
  fetch(`/views/admin/${nombreVista}.html`)
    .then(res => res.text())
    .then(html => {
      const contenedor = document.getElementById("contenido");
      contenedor.innerHTML = html;

      requestAnimationFrame(() => {
        if (nombreVista === "usuarios") cargarUsuarios();
        if (nombreVista === "libros") cargarLibros();
      });
    });
}


// usuarios
function cargarUsuarios() {
  fetch("https://localhost:7290/api/account/todos")
    .then(res => res.json())
    .then(usuarios => {
      const tbody = document.getElementById("tabla-usuarios");
      tbody.innerHTML = "";

      usuarios.forEach(u => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
          <td>${u.nombre}</td>
          <td>${u.email}</td>
          <td>${u.rolID == 1 ? "Admin" : "Usuario"}</td>
          <td class="botones">
          <button class="edit-button" onclick="editarUsuario(${u.usuarioID})">
          <svg class="edit-svgIcon" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
          </path></svg></button>
          <button class="deletebutton" onclick="eliminarUsuario(${u.usuarioID})"><svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
          </button>
          </td>
        `;

        tbody.appendChild(fila);
      });
    });
}


// libros
// <button class="editar" onclick="abrirModalLibro(${l.libroID}, '${l.nombre}', '${l.formato}', ${l.generoID})">Editar</button>
function cargarLibros() {
  fetch("https://localhost:7290/api/libros/todos")
    .then(res => res.json())
    .then(libros => {
      const tbody = document.getElementById("tabla-libros");
      tbody.innerHTML = "";

      libros.forEach(l => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
          <td>${l.nombre}</td>
          <td>${l.formato}</td>
          <td>${l.generoID}</td>
          <td class="botones">
          <button class="edit-button" onclick="abrirModalLibro(${l.libroID}, '${l.nombre}', '${l.formato}', ${l.generoID})">
          <svg class="edit-svgIcon" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z">
          </path></svg></button>
          <button class="deletebutton" onclick="eliminarLibro(${l.libroID})"><svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
          </button>
          </td>
        `;

        tbody.appendChild(fila);
      });
    });
}


// Para los botones de accion de usuarios XD
function editarUsuario(id) {
  fetch(`https://localhost:7290/api/account/traer/${id}`)
    .then(res => res.json())
    .then(usuario => {
      abrirModalUsuario(usuario.usuarioID, usuario.nombre, usuario.email, usuario.rolID);
    });
}

function eliminarUsuario(id) {
  const confirmar = confirm("¿Estás seguro de eliminar este usuario?");
  if (confirmar) {
    fetch(`https://localhost:7290/api/account/borrar/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      cargarUsuarios();
    });
  }
}

// Para los botones de libros
function editarLibro(id) {
  fetch(`https://localhost:7290/api/libros/traer/${id}`)
    .then(res => res.json())
    .then(libro => {
      abrirModalLibro(libro.libroID, libro.nombre, libro.formato, libro.generoID);
    });
}


function eliminarLibro(id) {
  const confirmar = confirm("¿Estás seguro de eliminar este usuario?");
  if (confirmar) {
    fetch(`https://localhost:7290/api/account/eliminar/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      cargarLibros();
    });
  }
}

// para el modal
function abrirModalUsuario(id, nombre, email, rolID) {
  tipoEntidad = "usuario";  // Establecer tipo de entidad
  document.getElementById("modal-titulo").textContent = "Editar Usuario";
  document.getElementById("modal-id").value = id;
  document.getElementById("modal-nombre").value = nombre;
  document.getElementById("modal-secundario").value = email;
  document.getElementById("modal-terciario").value = rolID;
  document.getElementById("modal").style.display = "block";
}

function abrirModalLibro(id, nombre, formato, generoID) {
  tipoEntidad = "libro";  // Establecer tipo de entidad
  document.getElementById("modal-titulo").textContent = "Editar Libro";
  document.getElementById("modal-id").value = id;
  document.getElementById("modal-nombre").value = nombre;
  document.getElementById("modal-secundario").value = formato;
  document.getElementById("modal-terciario").value = generoID;
  document.getElementById("modal").style.display = "block";
}
function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

document.getElementById("modal-formulario").addEventListener("submit", function(e) {
  e.preventDefault();

  const id = document.getElementById("modal-id").value;
  const nombre = document.getElementById("modal-nombre").value;
  const secundario = document.getElementById("modal-secundario").value;
  const terciario = document.getElementById("modal-terciario").value;

  if (tipoEntidad === "usuario") {
    fetch(`https://localhost:7290/api/account/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        email: secundario,
        rolID: parseInt(terciario)
      })
    }).then(res => res.json())
      .then(data => {
        alert(data.message);
        cerrarModal();
        cargarUsuarios();
      });

  } else if (tipoEntidad === "libro") {
    fetch(`https://localhost:7290/api/libros/actualizar/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        formato: secundario,
        generoID: parseInt(terciario)
      })
    }).then(res => res.json())
      .then(data => {
        alert(data.message);
        cerrarModal();
        cargarLibros();
      });
  }
});

// para la barra lateral
document.getElementById("usuarios-link").addEventListener("click", function() {
  setActive("usuarios-link");
});

document.getElementById("libros-link").addEventListener("click", function() {
  setActive("libros-link");
});

function setActive(linkId) {
  // Elimina la clase 'active' de todos los enlaces
  const items = document.querySelectorAll(".menu-item");
  items.forEach(item => item.classList.remove("active"));

  // Añade la clase 'active' al enlace clickeado
  document.getElementById(linkId).classList.add("active");
}

