import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserDetail implements OnInit {
  protected readonly user = signal<User | null>(null);
  protected readonly loading = signal<boolean>(false);
  protected readonly error = signal<string | null>(null);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.error.set('Identificador de usuario inválido.');
      return;
    }
    this.fetchUser(idParam);
  }

  private fetchUser(_id: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.usersService.getUserById(_id).subscribe({
      next: (u) => {
        this.user.set(u);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el usuario.');
        this.loading.set(false);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  goToUpdate(): void {
    const u = this.user();
    if (!u) return;
    this.router.navigate(['/updateuser', u._id]);
  }

  confirmDelete(): void {
    const u = this.user();
    if (!u) return;
    const ok = confirm(`¿Seguro que deseas eliminar al usuario ${u.first_name}?`);
    if (!ok) return;
    this.usersService.deleteUser(u._id).subscribe({
      next: () => {
        alert('Usuario eliminado');
        this.goBack();
      },
      error: () => {
        alert('Error eliminando el usuario.');
      },
    });
  }
}
