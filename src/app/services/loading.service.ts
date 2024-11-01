import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  isLoading: Observable<boolean>;

  constructor() {
    this.isLoading = this.loadingSub.asObservable().pipe(delay(0));
  }

  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error(
        'The request URL must be provided to the LoadingService.setLoading function'
      );
    }
    if (loading === true) {
      this.loadingMap.set(url, loading);
      this.loadingSub.next(true);
    } else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
    }
  }

  // Métodos para iniciar y detener la carga sin URL específica
  startLoading() {
    this.loadingSub.next(true);
  }

  stopLoading() {
    this.loadingSub.next(false);
  }
}
