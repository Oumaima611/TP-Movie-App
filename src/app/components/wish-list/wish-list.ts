import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';

@Component({
  imports: [],
  selector: 'app-wish-list',
  styleUrl: './wish-list.css',
  templateUrl: './wish-list.html',
})
export class WishList {
  private router = inject(Router)
  movieService = inject(MovieService)

  backToMovieList() {
    this.router.navigate(['/'])
  }

  openDetail(id: number) {
    this.router.navigate([`/${id}`])
  }
}