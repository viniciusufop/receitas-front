import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ConfigService} from './services/config.service';
import {ReceitaService} from './services/receita.service';
import {ConsultaComponent} from './receita/consulta/consulta.receita.component';
import {CadastroReceitaComponent} from './receita/cadastro/cadastro.receita.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routing} from '../app.routes';
import {MaterialModule} from '../material.module';
import {MAT_DATE_LOCALE, MatSelectModule} from '@angular/material';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent,
    CadastroReceitaComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
    MaterialModule,
    ChartsModule,
    MatSelectModule,
  ],
  providers: [ConfigService, ReceitaService,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})

export class AppModule { }
