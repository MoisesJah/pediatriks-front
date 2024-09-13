import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { PDFProgressData, PdfViewerModule } from 'ng2-pdf-viewer';
import { PersonalService } from 'src/app/services/personal/personal.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-cv-viewer',
  standalone: true,
  imports: [PdfViewerModule,CommonModule],
  templateUrl: './cv-viewer.component.html',
  styleUrl: './cv-viewer.component.scss',
})
export class CvViewerComponent implements ICellRendererAngularComp {
  modal = inject(NgbModal);
  personalService = inject(PersonalService);
  params?: ICellRendererParams;
  pdfFile!: any;
  error: any;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  openPdf(content: TemplateRef<any>) {
    const modalRef = this.modal.open(content, { centered: true });

    this.personalService
      .getCV(this.params?.data.id_personal)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          if (this.pdfFile) {
            URL.revokeObjectURL(this.pdfFile);
          }

          this.pdfFile = URL.createObjectURL(res);
        },
        error: (err) => {
          this.error = err;
        },
      });

    modalRef.result.finally(() => {
      if (this.pdfFile) {
        this.pdfFile = null;
        URL.revokeObjectURL(this.pdfFile);
      }
    });
  }
  closePdf() {
    this.modal.dismissAll();
  }

  onProgress(progressData: PDFProgressData) {
    // do anything with progress data. For example progress indicator
  }
}
