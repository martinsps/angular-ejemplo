import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected readonly users = signal<User[]>([]);
  protected readonly loading = signal<boolean>(false);
  protected readonly error = signal<string | null>(null);
  protected readonly page = signal<number>(1);
  protected readonly pageSize = signal<number>(8);

  constructor(private readonly usersService: UsersService, private readonly router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  private fetchUsers(): void {
    this.loading.set(true);
    this.error.set(null);
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los usuarios.');
        this.loading.set(false);
      },
    });
  }

  goToUpdate(userId: string): void {
    this.router.navigate(['/updateuser', userId]);
  }

  confirmDelete(userId: string, firstName: string): void {
    const ok = confirm(`¿Seguro que deseas eliminar al usuario ${firstName}?`);
    if (!ok) return;
    this.usersService.deleteUser(userId).subscribe({
      next: () => {
        this.users.set(this.users().filter((u) => u._id !== userId));
      },
      error: () => {
        alert('Error eliminando el usuario.');
      },
    });
  }

  protected pagedUsers(): User[] {
    const start = (this.page() - 1) * this.pageSize();
    return this.users().slice(start, start + this.pageSize());
  }

  protected totalPages(): number {
    return Math.max(1, Math.ceil(this.users().length / this.pageSize()));
  }

  protected goToPage(p: number): void {
    if (p < 1 || p > this.totalPages()) return;
    this.page.set(p);
  }
}
