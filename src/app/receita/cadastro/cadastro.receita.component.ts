import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Receita} from '../../services/receita';
import {ReceitaService} from '../../services/receita.service';
import {Response} from '../../services/response';

@Component({
  selector: 'app-cadastro-receita',
  templateUrl: './cadastro.receita.component.html',
  styleUrls: ['./cadastro.receita.component.css']
})
export class CadastroReceitaComponent implements OnInit {

  private titulo: string;
  private receita: Receita = new Receita();

  constructor(private receitaService: ReceitaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  /*CARREGADO NA INICIALIZAÇÃO DO COMPONENTE */
  ngOnInit() {
    this.activatedRoute.params.subscribe(parametro => {
      if (parametro['id'] === undefined) {
        this.titulo = 'Novo Cadastro de Receita';
      } else {
        this.titulo = 'Editar Cadastro de Receita';
        this.receitaService.getReceita(Number(parametro['id'])).subscribe(res => this.receita = res);
      }
    });
  }

  /*FUNÇÃO PARA SALVAR UM NOVO REGISTRO OU ALTERAÇÃO EM UM REGISTRO EXISTENTE */
  salvar(): void {
    /*SE NÃO TIVER CÓDIGO VAMOS INSERIR UM NOVO REGISTRO */
    if (this.receita.id === undefined) {
      /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */
      this.receitaService.addReceita(this.receita).subscribe(response => {
          // PEGA O RESPONSE DO RETORNO DO SERVIÇO
          const res: Response = <Response>response;

          /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
          E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
          if (res.codigo === 1) {
            alert(res.mensagem);
            this.receita = new Receita();
          } else {
            /*
            ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
            NO SERVIDOR (CODIGO = 0)*/
            alert(res.mensagem);
          }
        },
        (erro) => {
          /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
           EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API*/
          alert(erro);
        });
    } else {
      /*AQUI VAMOS ATUALIZAR AS INFORMAÇÕES DE UM REGISTRO EXISTENTE */
      this.receitaService.atualizarReceita(this.receita).subscribe(response => {
          // PEGA O RESPONSE DO RETORNO DO SERVIÇO
          const res: Response = <Response>response;
          /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
            E REDIRECIONAR O USUÁRIO PARA A PÁGINA DE CONSULTA*/
          if (res.codigo === 1) {
            alert(res.mensagem);
            this.router.navigate(['/consulta-receita']);
          } else {
            /*ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
            NO SERVIDOR (CODIGO = 0)*/
            alert(res.mensagem);
          }
        },
        (erro) => {
          /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
           EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API*/
          alert(erro);
        });
    }
  }
}

