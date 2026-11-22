import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  imports: [SearchBar],
  selector: 'app-movie-list',
  styleUrl: './movie-list.css',
  templateUrl: './movie-list.html',
})
export class MovieList implements OnInit {
  router = inject(Router)
  movieService = inject(MovieService)
  private request?: Subscription;

  ngOnInit(): void {
    this.getMovieList();
  }

  getMovieList() {
    this.request?.unsubscribe();
    this.request = this.movieService.getMovieList().subscribe(
      (response) => this.movieService.movieList.set(response)
    );
  }

  // appelée par la search-bar avec le titre saisi
  searchMovieByTitle(title: string) {
    if (!title) {
      this.getMovieList();   // champ vide : on réaffiche tous les films
      return;
    }
    this.request?.unsubscribe();   // annule la recherche précédente
    this.request = this.movieService.getMovieByTitle(title).subscribe(
      (response) => this.movieService.movieList.set(response)
    );
  }

  navigateTo(movie: Movie) {
    this.router.navigate([`/${movie.id}`]);
  }
}