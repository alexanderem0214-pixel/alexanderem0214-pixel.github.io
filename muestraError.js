import { ProblemDetailsError } from "./ProblemDetailError.js";

export function muestraError(error) {
  if (error === null) {
    console.error("Error");
    alert("Error desconocido");
  } else if (error instanceof ProblemDetailsError) {
    const problemDetails = error.problemDetails;
    let mensaje = typeof problemDetails["title"] === "string" ? problemDetails["title"] : "";

    if (typeof problemDetails["detail"] === "string") {
      if (mensaje !== "") {
        mensaje += "\n\n";
      }
      mensaje += problemDetails["detail"];
    }

    if (mensaje === "") {
      mensaje = "Error en el servicio";
    }

    console.error(error, problemDetails);
    alert(mensaje);
  } else {
    console.error(error);
    alert(error.message);
  }
}
