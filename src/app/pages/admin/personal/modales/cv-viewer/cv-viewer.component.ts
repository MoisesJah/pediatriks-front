import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PersonalService } from 'src/app/services/personal/personal.service';

@Component({
  selector: 'app-cv-viewer',
  standalone: true,
  imports: [PdfViewerModule, NgbModalModule],
  templateUrl: './cv-viewer.component.html',
  styleUrl: './cv-viewer.component.scss',
})
export class CvViewerComponent implements ICellRendererAngularComp {
  modal = inject(NgbModal);
  personalService = inject(PersonalService);
  // @ViewChild('pdfViewer') cvModal!: TemplateRef<any>
  params?: ICellRendererParams;
  src!: string;
  pdfFile!: any;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    this.src = `${this.params?.value}`.replace('http://localhost', 'http://localhost:8000');
    
    
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  openPdf(content: TemplateRef<any>) {
    this.modal.open(content, { centered: true });
    this.personalService.getCV(this.params?.data.id_personal).subscribe((res) => {
      this.pdfFile = res;
    })
  }
  closePdf() {
    this.modal.dismissAll();
  }
}
