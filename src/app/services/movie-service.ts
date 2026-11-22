
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay , } from 'rxjs'
import { environment } from '../../environments/environment';
import { MovieResponse } from '../interfaces/movie-response';
import { Movie } from '../interfaces/movie';
@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private readonly http=inject(HttpClient);
    private readonly url = environment.url_api;
    private readonly key= environment.api_key;
    private readonly movieUrl= environment.url_movie_api;

    

    public movieList=signal<Movie[]>([]);
    public selectedMovie=signal<Movie | null>(null)
    public wishList = signal<Movie[]>(JSON.parse(localStorage.getItem('wishlist') || '[]'));
    
    getMovieList(): Observable<Movie[]>{
        return this.http.get<MovieResponse>(
        `${this.url}?api_key=${this.key}`)
        .pipe(
            map(response => response.results),
            shareReplay({bufferSize:1, refCount:false})
        );
    }
    getMovieById(id :number){
        return this.http.get<Movie>(`${this.movieUrl}/${id}?api_key=${this.key}`).pipe(
            map(response=>response)
        )
    }
    getMovieByTitle(title: string): Observable<Movie[]> {
        return this.http.get<MovieResponse>(
            `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${this.key}`)
            .pipe(map(response => response.results));
    }

    addToWishList(movie:Movie){
    if (this.wishList().some(m => m.id === movie.id)) return;
        this.wishList.update(wishList => [...wishList, movie])
        localStorage.setItem('wishlist', JSON.stringify(this.wishList()));
    }
}
