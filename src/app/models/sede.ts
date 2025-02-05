export interface Sede {
  id_sede: string;               // Clave primaria de la sede
  nombre: string;                // Nombre de la sede
  direccion: string;             // Dirección de la sede
  distrito: string;              // Distrito donde se ubica la sede
  provincia: string;             // Provincia donde se ubica la sede
  departamento: string;          // Departamento donde se ubica la sede
  telefono: string;              // Teléfono de contacto de la sede
  email: string;                 // Email de contacto de la sede
  horarioapertura: string;       // Horario de apertura de la sede (puede ser de tipo Date si manejas fechas completas)
  horariocierre: string;         // Horario de cierre de la sede (puede ser de tipo Date si manejas fechas completas)
  capacidadpacientes: number;    // Capacidad máxima de pacientes que puede atender la sede
  numeroconsultorios: number;    // Número de consultorios disponibles en la sede
}
