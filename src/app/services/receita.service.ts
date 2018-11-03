import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Receita} from './receita';
import {Response} from './response';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class ReceitaService {
  private baseUrlService;
  private options;

  constructor(private http: HttpClient,
              private configService: ConfigService) {
    /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
    this.baseUrlService = configService.getUrlService() + '/receitas';
    /** ADICIONANDO O JSON NO HEADER */
    this.options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  }

  /**CONSULTA TODAS AS RECEITAS CADASTRADAS */
  getReceitas() {
    return this.http.get<Receita[]>(this.baseUrlService);
  }

  /**ADICIONA UMA NOVA RECEITA */
  addReceita(receita: Receita): Observable<Response> {
    return this.http.post<Response>(this.baseUrlService, JSON.stringify(receita), this.options)
      .pipe(map((res: HttpResponse<Response>) => res.body ));
  }
  /**EXCLUI UMA RECEITA */
  excluirReceita(codigo: number) {
    return this.http.delete(this.baseUrlService  + '/' + codigo);
  }
}
