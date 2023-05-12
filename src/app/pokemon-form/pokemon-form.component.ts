import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../interfaces/pokemon';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit, OnDestroy {
  pokemonId: string = "";
  title: string = "Nuevo";
  destroy: Subject<any> = new Subject();
  myForm: FormGroup;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private router: Router) { 
    this.myForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      attack: new FormControl(0),
      defense: new FormControl(0),
      hp: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      idAuthor: new FormControl(1, Validators.required),
    });
  }

  ngOnInit(): void {

    this.pokemonService.getData().pipe(
      takeUntil(this.destroy)     // import takeUntil from rxjs/operators.
       ).subscribe(obj => {
        if(obj && obj !== ""){
          this.pokemonId = obj;
          this.title = 'Editar';
          this.getPokemonById(this.pokemonId!);
        }
     });
  }

  ngOnDestroy(): void{
    this.destroy.next(0);
  }


  getPokemonById(pokemonId: string){
    this.pokemonService.getPokemonById(pokemonId.toString()).subscribe((data: Pokemon) => {
      console.log("data pokemon", data)
      this.myForm.setValue(data);
    })
  }

  onSubmit(myForm: FormGroup){
    console.log('Valid?', myForm.value);
    if(myForm.valid){
      this.pokemonId ? this.savePokemonData(myForm.value) : this.editPokemonData(myForm.value);
      ;
    }
  }

  savePokemonData(pokemonData: Pokemon){
    this.pokemonService.savePokemon(pokemonData).subscribe((data: Pokemon) => {
      console.log("data pokemon", data)
      this.router.navigateByUrl('');
      window.location.reload();
    })
  }

  editPokemonData(pokemonData: Pokemon){
    this.pokemonService.editPokemon(pokemonData).subscribe((data: Pokemon) => {
      console.log("data edit pokemon", data)
      this.router.navigateByUrl('');
      window.location.reload();
    })
  }

  cancel(){
    this.myForm.reset();
    this.router.navigateByUrl('');
  }

}
