import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaComponent } from './app/receita/consulta/consulta.receita.component';
import {CadastroReceitaComponent} from './app/receita/cadastro/cadastro.receita.component';
import { HomeComponent } from './app/home/home.component';

const appRoutes: Routes = [
  { path: 'home',                    component: HomeComponent },
  { path: '',                        component: HomeComponent },
  { path: 'consulta-receita',         component: ConsultaComponent },
  { path: 'cadastro-receita',         component: CadastroReceitaComponent },
  { path: 'cadastro-receita/:id', component: CadastroReceitaComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
