import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { Pokemon } from './interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(id: any) {
    this.subject.next(id);
  }

  clearData() {
    this.subject.next(0);
  }
  
  savePokemon(pokemonData:Pokemon): Observable<Pokemon>{
    return this.http.post<Pokemon>('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/', pokemonData);
  }

  editPokemon(pokemonData:Pokemon): Observable<Pokemon>{
    return this.http.put<Pokemon>(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/${pokemonData.id}`, pokemonData);
  }

  getAllPokemon(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/?idAuthor=1');
  }

  getPokemonById(pokemonId: string): Observable<Pokemon>{
    return this.http.get<Pokemon>(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/${pokemonId}`);
  }

  deletePokemonById(pokemonId: number): Observable<any>{
    return this.http.delete(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/${pokemonId}`);
  }
}
