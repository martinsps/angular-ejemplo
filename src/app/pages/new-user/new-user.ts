import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './new-user.html',
  styleUrl: './new-user.css',
})
export class NewUser implements OnInit {
  protected readonly userForm: FormGroup;
  protected readonly loading = false;
  protected readonly error = '';
  protected isUpdateMode = false;
  protected userId: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      image: ['', [Validators.required, this.urlValidator]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isUpdateMode = true;
      this.userId = idParam;
      this.loadUserData(idParam);
    }
  }

  private loadUserData(userId: string): void {
    this.usersService.getUserById(userId).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          image: user.image,
        });
      },
      error: () => {
        alert('Error cargando los datos del usuario');
        this.router.navigate(['/home']);
      },
    });
  }

  private urlValidator(control: any) {
    if (!control.value) return null;
    // Accept URLs with file extensions OR API URLs like https://i.pravatar.cc/500?u=...
    const urlPattern =
      /^https?:\/\/.+\.(svg|jpg|jpeg|png|gif|webp)$|^https?:\/\/i\.pravatar\.cc\/\d+\?u=.+$/i;
    return urlPattern.test(control.value) ? null : { invalidUrl: true };
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      if (this.isUpdateMode && this.userId) {
        this.usersService.updateUser(this.userId, formData).subscribe({
          next: (response) => {
            alert('Usuario actualizado correctamente');
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Error updating user:', error);
            alert('Error al actualizar el usuario. Revisa los datos e inténtalo de nuevo.');
          },
        });
      } else {
        this.usersService.createUser(formData).subscribe({
          next: (response) => {
            alert('Usuario creado correctamente');
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Error creating user:', error);
            alert('Error al crear el usuario. Revisa los datos e inténtalo de nuevo.');
          },
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach((key) => {
      const control = this.userForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${this.getFieldLabel(fieldName)} es obligatorio`;
      if (field.errors['email']) return 'Email no válido';
      if (field.errors['invalidUrl']) return 'URL de imagen no válida';
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      first_name: 'Nombre Usuario',
      last_name: 'Apellido Usuario',
      email: 'Email Usuario',
      image: 'Imagen Usuario',
    };
    return labels[fieldName] || fieldName;
  }
}
