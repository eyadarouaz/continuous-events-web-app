import { Injectable} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(private toast: ToastrService) { }
  
  showSuccess(message: string): void {
    this.toast.success(message);
  }
  
  showError(message: string): void {
    this.toast.error(message, '', { onActivateTick: true });
  }
}