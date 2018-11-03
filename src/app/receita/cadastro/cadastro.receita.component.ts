import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Receita} from '../../services/receita';
import {ReceitaService} from '../../services/receita.service';
import {Response} from '../../services/response';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-cadastro-receita',
  templateUrl: './cadastro.receita.component.html',
  styleUrls: ['./cadastro.receita.component.css']
})
export class CadastroReceitaComponent implements OnInit {
  titulo: string;
  // variaveis dos compoenentes de tela
  // = new FormControl('', [Validators.required, Validators.email]);
  descricaoFormControl: FormControl  = new FormControl('', [Validators.required]);
  dataVencimentoFormControl: FormControl  = new FormControl('', [Validators.required]);
  valorFormControl: FormControl  = new FormControl('', [Validators.required]);

  descricao: string;
  dataVencimento: Date;
  valor: number;

  constructor(private receitaService: ReceitaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  /*CARREGADO NA INICIALIZAÇÃO DO COMPONENTE */
  ngOnInit() {
      this.activatedRoute.params.subscribe(parametro => {
        this.titulo = 'Novo Cadastro de Receita';
    });
  }

  /*FUNÇÃO PARA SALVAR UM NOVO REGISTRO OU ALTERAÇÃO EM UM REGISTRO EXISTENTE */
  salvar(): void {
    /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */

    const receita: Receita = new Receita();
    receita.descricao = this.descricao;
    receita.vencimento = this.dataVencimento;
    receita.valor = this.valor;
    this.receitaService.addReceita(receita).subscribe(response => {
      // PEGA O RESPONSE DO RETORNO DO SERVIÇO
      const res: Response = <Response>response;

      /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
      E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
      if (res.codigo === 1) {
        alert(res.mensagem);
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
  }
}

