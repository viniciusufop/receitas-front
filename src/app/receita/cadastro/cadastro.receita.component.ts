import {Component, OnInit} from '@angular/core';
import {Receita} from '../../services/receita';
import {ReceitaService} from '../../services/receita.service';
import {FormControl, Validators} from '@angular/forms';
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
  private valorFormControl: FormControl  = new FormControl('', [Validators.required]);

  private receita: Receita;
  private titulo: string;

  private campoObrigatorio = 'Campo obrigatório. Favor preencher!';
  private valorminimo = 'Valor mínimo é 0!';
  private semError = '';

  constructor(private receitaService: ReceitaService,
              private router: Router) {
  }

  ngOnInit() {
    this.titulo = 'Novo Cadastro de Receita';
    this.receita = new Receita();
  }

  salvar(): void {
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
    return this.valorFormControl.hasError('required') ? this.campoObrigatorio : this.semError;
  }

  desabilitarSalvar(): boolean {
    return this.descricaoFormControl.invalid || this.dataVencimentoFormControl.invalid || this.valorFormControl.invalid;
  }
}

