import {Component, Input, OnInit} from '@angular/core';
import {Receita} from '../services/receita';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  // Pie
  private pieChartType = 'pie';
  private pieChartLabels: string[] = ['Despesas', 'Receitas'];
  private valorTotalReceita = 0;
  private valorTotalDespesa = 0;
  private tamanho = 0;
  @Input() receitas: Receita[] = new Array();

  ngOnInit(): void {
  }

  getValores(receitas: Receita[]): number[] {
    if (receitas.length !== this.tamanho) {
      this.tamanho = receitas.length;
      for (const rec of receitas) {
        if (rec.valor < 0) {
          this.valorTotalDespesa += rec.valor;
        } else {
          this.valorTotalReceita += rec.valor;
        }
      }
    }
    return [this.valorTotalDespesa, this.valorTotalReceita];
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
