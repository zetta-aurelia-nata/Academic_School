// *************** ANGULAR IMPORTS ***************
import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

// *************** INTERFACES ***************
export interface ConfirmOptions {
  title: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  success(title: string, text?: string): void {
    Swal.fire({
      icon: 'success',
      title,
      text,
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }

  error(title: string, text?: string): void {
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: 'var(--color-card-red)',
    });
  }

  async confirm(options: ConfirmOptions): Promise<boolean> {
    const isDanger = options.variant === 'danger';

    const result = await Swal.fire({
      icon: isDanger ? 'warning' : 'question',
      title: options.title,
      text: options.text,
      showCancelButton: true,
      confirmButtonText: options.confirmText ?? 'Confirm',
      cancelButtonText: options.cancelText ?? 'Cancel',
      confirmButtonColor: isDanger ? 'var(--color-card-red)' : 'var(--color-card-purple',
      reverseButtons: true,
      focusCancel: isDanger,
    });

    return result.isConfirmed;
  }
}
