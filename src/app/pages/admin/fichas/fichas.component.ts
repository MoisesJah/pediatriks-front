import { Component, HostListener } from '@angular/core';
import { CdkDragDrop, CdkDragEnd, CdkDragMove, CdkDragStart, DragDropModule,moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { FormJson, FormElement } from '../../../models/Forms';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';

type FormElementType = 'text' | 'dropdown' | 'radiogroup' | 'checkbox' | 'block';
interface FormColumn{
  children: any
}

@Component({
  selector: 'app-fichas',
  standalone: true,
  templateUrl: './fichas.component.html',
  styleUrls: ['./fichas.component.scss'],
  imports: [DragDropModule, CommonModule,HeaderComponent,FormsModule],
})
export class FichasComponent {
  logo: string | null = null; // Ruta del logo cargado
  editableTitle: string = '';
  description: string = '';
  isEditingTitle: boolean = false;

  // Contadores para cada tipo de elemento
  typeCounters: Record<FormElementType, number> = {
    text: 0,
    dropdown: 0,
    radiogroup: 0,
    checkbox: 0,
    block: 0,
  };

  // Lista de elementos disponibles para arrastrar
  items = [
    { name: 'Input', icon: 'fas fa-pencil-alt', type: 'text' as FormElementType },
    { name: 'Select', icon: 'fas fa-list', type: 'dropdown' as FormElementType, choices: ['Option 1', 'Option 2', 'Option 3'] },
    { name: 'Radio Button', icon: 'fas fa-dot-circle', type: 'radiogroup' as FormElementType, choices: ['Option 1', 'Option 2', 'Option 3'] },
    { name: 'ComboBox', icon: 'fas fa-th-list', type: 'dropdown' as FormElementType, choices: ['Option 1', 'Option 2', 'Option 3'] },
    { name: 'Checkbox', icon: 'fas fa-check-square', type: 'checkbox' as FormElementType, choices: ['Option 1', 'Option 2', 'Option 3'] },
    { name: 'Bloque', icon: 'fa-solid fa-square', type: 'block' as FormElementType, children: [], numColumns: 1 },
  ];

    // Definir las columnas de la cuadrícula
    gridColumns = [
      { id: 1, name: 'Column 1', elements: [] },
      { id: 2, name: 'Column 2', elements: [] },
      { id: 3, name: 'Column 3', elements: [] },
    ];

  // JSON dinámico del formulario
  formJson: FormJson = {
    title: 'Formulario Dinámico',
    completedHtml: '<h3>Gracias por completar el formulario</h3>',
    pages: [
      {
        name: 'page1',
        elements: [], // Se llenará dinámicamente
      },
    ],
    showQuestionNumbers: 'off',
  };

  private dragItemClone: HTMLElement | null = null;
  private originalParent: HTMLElement | null = null;


  constructor(private cd: ChangeDetectorRef) {}


  onLogoUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.logo = reader.result as string; // Convertir a base64
      };
      reader.readAsDataURL(file);
    }
  }

  editTitle(): void {
    this.isEditingTitle = true;
  }
   // Guardar título y cerrar modo de edición
   saveTitle(): void {
    this.isEditingTitle = false;
  }

  // Detectar clics fuera del input
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isClickInside = target.closest('.editable-title');

    if (!isClickInside && this.isEditingTitle) {
      this.saveTitle();
    }
  }

  onDragStarted(event: CdkDragStart) {
    // Obtener el elemento arrastrado
    const element = event.source.getRootElement();
    // Guardar el contenedor original
    this.originalParent = element.parentElement;

    // Crear el clon del elemento arrastrado
    this.dragItemClone = element.cloneNode(true) as HTMLElement;
    this.dragItemClone.style.position = 'absolute';
    this.dragItemClone.style.pointerEvents = 'none'; // No queremos que el clon reciba eventos

    // Insertar el clon dentro del contenedor original
    if (this.originalParent) {
      this.originalParent.appendChild(this.dragItemClone);
    }
  }

  onDragMoved(event: CdkDragMove) {
    if (this.dragItemClone) {
      // Mover el clon con el ratón
      this.dragItemClone.style.left = `${event.pointerPosition.x}px`;
      this.dragItemClone.style.top = `${event.pointerPosition.y}px`;
    }
  }

  onDragEnded(event: CdkDragEnd) {
    // Eliminar el clon al terminar el drag
    if (this.dragItemClone) {
      this.dragItemClone.remove();
      this.dragItemClone = null;
      this.originalParent = null;
    }
  }

  // Método para manejar el drop
  drop(event: CdkDragDrop<any[]>) {
    console.log('Evento drop disparado:', event);

    // Si el ítem se ha soltado dentro del mismo contenedor (reordenar)
    if (event.previousContainer === event.container) {
      const movedItem = this.formJson.pages[0].elements[event.previousIndex];

      // Actualizar el contador para el tipo de ítem al moverlo
      const itemType = movedItem.type as FormElementType;
      if (this.typeCounters[itemType]) {
        this.typeCounters[itemType] -= 1; // Decrementar el contador antes de mover
      }

      // Eliminar el ítem de la posición anterior y moverlo a la nueva
      this.formJson.pages[0].elements.splice(event.previousIndex, 1);
      this.formJson.pages[0].elements.splice(event.currentIndex, 0, movedItem);

      // Después de mover el ítem, incrementar el contador de su tipo
      if (this.typeCounters[itemType]) {
        this.typeCounters[itemType] += 1;
      } else {
        this.typeCounters[itemType] = 1; // Si no existe, iniciar el contador
      }

      console.log('Formulario JSON actualizado (reordenado):', this.formJson);
    }
    // Si el ítem se ha soltado en un contenedor diferente (nuevo elemento)
    else if (event.previousContainer !== event.container) {
      const item = event.item.data; // Obtener los datos del item arrastrado
      const itemType = item.type as FormElementType; // Asegura que `item.type` sea uno de los tipos válidos

      if (['text', 'dropdown', 'radiogroup', 'checkbox', 'block'].includes(itemType)) {
        // Contar cuántos elementos de este tipo ya existen en el formulario
        const count = this.formJson.pages[0].elements.filter(element => element.type === itemType).length;

        // Crear un nuevo elemento FormElement basado en el item arrastrado
        const newElement: FormElement = {...item};
        newElement.name = `${item.name} ${count + 1}`; // Numeración correlativa

        // Añadir el nuevo elemento al JSON del formulario
        this.formJson.pages[0].elements.push(newElement);

        // Actualizar el contador para este tipo
        this.typeCounters[itemType] = this.typeCounters[itemType] + 1 || 1;

        console.log('Formulario JSON actualizado (nuevo elemento):', this.formJson);
      } else {
        console.error('Tipo de item no válido:', item.type);
      }
    }
  }

  selectedElement: FormElement | null = null;

  selectElement(element: FormElement) {
    console.log(this.formJson.pages[0].elements);
    this.selectedElement = element;
  }

  addChoice() {
    if (this.selectedElement && this.selectedElement.choices) {
      this.selectedElement.choices.push('Nueva opción');
    }
  }

  // Método para eliminar un elemento del formulario
  deleteElement(index: number): void {
    const elementToDelete = this.formJson.pages[0].elements[index];

    // Verificar si el elemento a eliminar es el seleccionado
    if (this.selectedElement === elementToDelete) {
      this.selectedElement = null; // Deseleccionar el elemento
    }

    // Eliminar el elemento de la lista
    this.formJson.pages[0].elements.splice(index, 1);

    // Forzar la detección de cambios para actualizar el panel derecho
    this.cd.detectChanges(); // Si el ChangeDetectorRef no es suficiente, podrías agregar lógica para asegurarte que el panel se actualice.
  }

  // Método para cambiar el estado de "Requerido"
  toggleRequired(element: FormElement): void {
    // Alternamos la propiedad 'required'
    element.required = !element.required;

    // Si el elemento seleccionado es el mismo, actualizamos también la propiedad en 'selectedElement'
    if (this.selectedElement === element) {
      this.selectedElement.required = element.required;
    }
  }


  trackById(index: number, item: string): number {
    return index; // Retorna el índice como identificador único
  }

}
