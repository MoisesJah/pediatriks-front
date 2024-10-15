import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-image-display',
  standalone: true,
  imports: [],
  templateUrl: './image-display.component.html',
  styleUrl: './image-display.component.scss'
})
export class ImageDisplayComponent implements OnInit, ICellRendererAngularComp {
  ngOnInit(): void {}

  params?: ICellRendererParams 
  image: string | null = null

  agInit(params: ICellRendererParams): void {
    this.params = params

    if (params.value) {
      this.image = params.data.banner_url
    }
  }

  refresh(params: ICellRendererParams): boolean {
    return true
  }
}
