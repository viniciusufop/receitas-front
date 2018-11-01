import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Receita} from '../services/receita';
import {ConfigService} from './config.service';

@Injectable()
export class ReceitaService {
  private baseUrlService = '';
  private headers: HttpHeaders;

  constructor(private http: HttpClient,
              private configService: ConfigService) {

    /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
    this.baseUrlService = configService.getUrlService() + '/receitas';

    /*ADICIONANDO O JSON NO HEADER */
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });
    // this.options = new RequestOptions({ headers: this.headers });
  }

  /**CONSULTA TODAS AS RECEITAS CADASTRADAS */
  getReceitas() {
    return this.http.get<Receita>(this.baseUrlService);
  }

  /**ADICIONA UMA NOVA RECEITA */
  addReceita(receita: Receita) {
    // this.http.post(){{this.headers}}
    return this.http.post(this.baseUrlService, JSON.stringify(receita));
  }
  /**EXCLUI UMA RECEITA */
  excluirReceita(codigo: number) {

    return this.http.delete(this.baseUrlService + codigo);
  }

  /**CONSULTA UMA RECEITA PELO CÓDIGO */
  getReceita(codigo: number) {
    return this.http.get(this.baseUrlService + codigo);
  }

  /**ATUALIZA INFORMAÇÕES DA RECEITA */
  atualizarPessoa(receita: Receita) {
    return this.http.put(this.baseUrlService, JSON.stringify(receita));
  }

}
