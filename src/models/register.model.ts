export interface Register {
    "Marca temporal":                  string;
    Puntuación:                        any;
    "Nombres y Apellidos":             string;
    "Cédula de Identidad":             number | string;
    "Teléfono móvil":                  number | string;
    "Teléfono de habitación":          number | string;
    "Redes sociales":                  string;
    "Institución de donde vienes":     string;
    Ocupación:                         string;
    "Dirección de correo electrónico": string;
    Asistencia?: boolean;
}
