import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './interfaces/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  fieldSearch: string = "";
  pokemonList: Pokemon[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService ) {}

  ngOnInit(): void {
    this.getAllPokemon();
  }

  searchPokemon(pokemon: string){
    if(pokemon !== null && pokemon !== ""){
      this.pokemonList = this.pokemonList.filter((item: Pokemon)=> item.name.toLowerCase().includes(pokemon.toLowerCase()));
    }else{
      this.getAllPokemon();
    }
  }

  getAllPokemon(){
    this.pokemonService.getAllPokemon().subscribe((data: Pokemon[]) => {
      this.pokemonList = data;
    })
  }

  addPokemon(){
    this.pokemonService.clearData();
    this.router.navigateByUrl('pokemon/add/');
  }

  editPokemon(pokemonId: number){
    this.pokemonService.sendData(pokemonId);
    this.router.navigateByUrl(`pokemon/edit/${pokemonId}`);
  }

  deletePokemon(pokemonId: number){
    this.pokemonService.clearData();
     console.log("delete pokemon", pokemonId);
     this.deletePokemonData(pokemonId)
  }

  deletePokemonData(pokemonId: number){
    this.pokemonService.deletePokemonById(pokemonId).subscribe((data: any) => {
      console.log("delete pokemon", data)
      this.router.navigateByUrl('');
      window.location.reload();
    })
  }

 


}
