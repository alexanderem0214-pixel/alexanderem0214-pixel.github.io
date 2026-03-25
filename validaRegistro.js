import { muestraError } from './muestraError.js';
import { ProblemDetailsError } from './ProblemDetailError.js';

const inicializarRegistro = () => {
  const form = document.querySelector('#registro-form');

  if (!form || !(form instanceof HTMLFormElement)) {
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const n = formData.get('nombre');
    const em = formData.get('email');
    const p = formData.get('password');
    const cp = formData.get('confirm_password');

    const nombre = n ? String(n).trim() : "";
    const email = em ? String(em).trim() : "";
    const pass = p ? String(p) : "";
    const confirmPass = cp ? String(cp) : "";

    if (nombre === "" || email === "" || pass === "" || confirmPass === "") {
      return muestraError(new ProblemDetailsError({
        title: "Datos Faltantes",
        detail: "Es obligatorio llenar todos los campos.",
        status: 400
      }));
    }

    if (pass !== confirmPass) {
      return muestraError(new ProblemDetailsError({
        title: "Error de Validación",
        detail: "Las contraseñas no coinciden.",
        status: 400
      }));
    }

    try {
      const response = await fetch('php/lib/procesaRegistro.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new ProblemDetailsError(result);
      }

      alert(result.message);
      window.location.href = 'acceso.html';

    } catch (error) {
      muestraError(error);
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarRegistro);
} else {
  inicializarRegistro();
}
