import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';

const routes: Routes = [
  { path: 'pokemon/add/', component: PokemonFormComponent },
  { path: 'pokemon/edit/:id', component: PokemonFormComponent },
  { path: '',   redirectTo: 'pokemon/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
