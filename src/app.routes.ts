import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaComponent } from './app/receita/consulta/consulta.receita.component';
import {CadastroReceitaComponent} from './app/receita/cadastro/cadastro.receita.component';

const appRoutes: Routes = [
  { path: '',                        component: ConsultaComponent },
  // { path: 'consulta-receita',         component: ConsultaComponent },
  { path: 'cadastro-receita',         component: CadastroReceitaComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
