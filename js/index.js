const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

document.addEventListener("DOMContentLoaded", () => {
  // REGISTRO
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const data = {
      nombre,
      email,
      contrasenaHash: password,
      rolID: 1  
    };

    const res = await fetch("https://localhost:7290/api/account/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
  });

// LOGIN
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const data = { email, password };

  try {
    const res = await fetch("https://localhost:7290/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      const mensajeDiv = document.getElementById("mensajeBienvenida");
      mensajeDiv.textContent = `¡Bienvenido/a, ${result.nombre}!`;
      mensajeDiv.style.display = "block";

      setTimeout(() => {
        window.location.href = "../views/home.html";
      }, 2000);
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Hubo un problema al intentar iniciar sesión.");
  }
});

});
