export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));


export const longDate = (date: string) =>
  new Intl.DateTimeFormat('es-PE', {
    dateStyle: 'full',
    timeZone: 'UTC',
  }).format(new Date(date));