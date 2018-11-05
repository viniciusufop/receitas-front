import {Component, OnInit} from '@angular/core';
import {Receita} from '../../services/receita';
import {ReceitaService} from '../../services/receita.service';
import {Form, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cadastro-receita',
  templateUrl: './cadastro.receita.component.html',
  styleUrls: ['./cadastro.receita.component.css']
})
export class CadastroReceitaComponent implements OnInit {
  // variaveis dos compoenentes de tela
  private descricaoFormControl: FormControl  = new FormControl('', [Validators.required]);
  private dataVencimentoFormControl: FormControl  = new FormControl('', [Validators.required]);
  private valorFormControl: FormControl = new FormControl('', [Validators.required, Validators.min(0.01)]);
  private operacaoFormControl: FormControl = new FormControl('', [Validators.required]);
  private receita: Receita;
  private titulo: string;

  private campoObrigatorio = 'Campo obrigatório. Favor preencher!';
  private valorminimo = 'Valor deve ser maior que 0!';
  private semError = '';
  private operacoes: string[] = ['Receita', 'Despesa'];
  private operacao: string;

  constructor(private receitaService: ReceitaService,
              private router: Router) {
  }

  ngOnInit() {
    this.titulo = 'Novo Cadastro de Operação';
    this.receita = new Receita();
  }

  salvar(): void {
    if (this.operacaoFormControl.value === 'Despesa') {
      this.receita.valor = this.receita.valor * -1;
    }
    this.receitaService.addReceita(this.receita).subscribe(response => {
      this.router.navigate(['/consulta-receita']);
    }, (error) => {
        alert(error);
    });
  }

  getErrorDescricaoMessage(): String {
    return this.descricaoFormControl.hasError('required') ? this.campoObrigatorio : this.semError;
  }

  getErrorDataMessage() {
    return this.dataVencimentoFormControl.hasError('required') ? this.campoObrigatorio : this.semError;
  }

  getErrorValorMessage() {
    return this.valorFormControl.hasError('required') ? this.campoObrigatorio :
      this.valorFormControl.hasError('min') ? this.valorminimo : this.semError;
  }

  getErrorOperacaoMessage() {
    return this.operacaoFormControl.hasError('required') ? this.campoObrigatorio : this.semError;
  }

  desabilitarSalvar(): boolean {
    return this.descricaoFormControl.invalid
      || this.dataVencimentoFormControl.invalid
      || this.valorFormControl.invalid
      || this.operacaoFormControl.invalid;
  }
}

