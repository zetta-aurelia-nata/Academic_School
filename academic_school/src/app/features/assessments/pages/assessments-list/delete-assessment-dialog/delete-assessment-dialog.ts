//********** ANGULAR IMPORTS **********
import { Component, inject } from '@angular/core';

//********** ANGULAR MATERIAL IMPORTS **********
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

//********** APPLICATION MODELS AND SETTINGS IMPORTS **********
import { Assessment } from '../assessment.list.model';

@Component({
  selector: 'app-delete-assessment-dialog',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './delete-assessment-dialog.html',
  styleUrl: './delete-assessment-dialog.scss',
})
export class DeleteAssessmentDialog {
  //********** PRIVATE VARIABLES **********
  private readonly dialogRef = inject(MatDialogRef<DeleteAssessmentDialog>);

  //********** PUBLIC STATE VARIABLES **********
  assessment = inject<Assessment>(MAT_DIALOG_DATA);

  //********** ACTION HANDLERS **********
  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}