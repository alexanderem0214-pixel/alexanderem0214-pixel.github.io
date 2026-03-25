export class ProblemDetailsError extends Error {
  constructor(problemDetails) {
    super(problemDetails.detail || "Error en la solicitud");
    this.problemDetails = problemDetails;
    this.name = "ProblemDetailsError";
  }
}
