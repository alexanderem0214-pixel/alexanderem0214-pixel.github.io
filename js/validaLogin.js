import { muestraError } from './muestraError.js';
import { ProblemDetailsError } from './ProblemDetailError.js';

const form = document.querySelector('#login-form');

if (form instanceof HTMLFormElement) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const u = formData.get('usuario');
    const usuario = u ? String(u).trim() : "";

    if (usuario === "") {
      return muestraError(new ProblemDetailsError({
        title: "Atención",
        detail: "El nombre es obligatorio.",
        status: 400
      }));
    }

    try {
      const response = await fetch('php/lib/procesaLogin.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new ProblemDetailsError(result);
      }

      sessionStorage.setItem('usuarioActivo', result.nombre);
      window.location.href = 'index.html';

    } catch (error) {
      muestraError(error);
    }
  });
}
