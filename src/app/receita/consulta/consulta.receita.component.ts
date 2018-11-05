import {Component, OnInit} from '@angular/core';
import {Receita} from '../../services/receita';
import {ReceitaService} from '../../services/receita.service';
import {Response} from '../../services/response';

@Component({
  selector: 'app-consulta-receita',
  templateUrl: './consulta.receita.component.html',
  styleUrls: ['./consulta.receita.component.css']
})
export class ConsultaComponent implements OnInit {

  private receitas: Receita[] = new Array();
  private titulo: string;
  constructor(private receitaService: ReceitaService) {
  }

  ngOnInit() {
    /*SETA O TÍTULO */
    this.titulo = 'Receitas vs Despesas';
    /*CHAMA O SERVIÇO E RETORNA TODAS AS PESSOAS CADASTRADAS */
    this.receitaService.getReceitas().subscribe(res => this.receitas = res);
  }

  isReceita(valor: number): boolean {
    return valor >= 0;
  }

  formatValue(value: number): string {
    let negativo = '';
    if (value < 0) {
      value = value * -1;
      negativo = '-';
    }
    return negativo + 'R$' + value.toFixed(2).toString();
  }

  /**EXCLUI UM REGISTRO QUANDO CLICAMOS NA OPÇÃO EXCLUIR DE UMA
   * LINHA DA TABELA*/
  excluir(id: number, index: number): void {
    if (confirm('Deseja realmente excluir esse registro?')) {
      /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
      this.receitaService.excluirReceita(id).subscribe(response => {
          /**PEGA O RESPONSE DO SERVIÇO */
          const res: Response = <Response>response;
          /*1 = SUCESSO
          * MOSTRAMOS A MENSAGEM RETORNADA PELO SERVIÇO E DEPOIS REMOVEMOS
          O REGISTRO DA TABELA HTML*/
          if (res.codigo === 1) {
            alert(res.mensagem);
            this.receitas.splice(index, 1);
          } else {
            /*0 = EXCEPTION GERADA NO SERVIÇO JAVA */
            alert(res.mensagem);
          }
        },
        (erro) => {
          /*MOSTRA ERROS NÃO TRATADOS */
          alert(erro);
        });
    }
  }
}
