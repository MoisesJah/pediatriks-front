export interface FormElement {
  type: string; // Tipo de elemento (dropdown, text, etc.)
  name: string; // Nombre único del elemento
  choices?: string[]; // Opciones para dropdown, radiogroup o checkbox
  required?: boolean; // Propiedad para indicar si el elemento es requerido
  [key: string]: any;
  children?: FormElement[]; 
}

export interface FormPage {
  name: string; // Nombre único de la página
  elements: FormElement[]; // Lista de elementos
}

export interface FormJson {
  title: string; // Título del formulario
  completedHtml: string; // HTML mostrado al completar
  pages: FormPage[]; // Páginas del formulario
  showQuestionNumbers?: string; // Configuración adicional
}

