import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  display = '0';
  result = '';
  isDarkMode = false;
  showHistory = false;
  lastThreeOperations: string[] = [];

  toggleHistory() {
    this.showHistory = !this.showHistory;
  }

  addOperationToHistory(operation: string) {
    this.lastThreeOperations.unshift(operation);
    if (this.lastThreeOperations.length > 3) {
      this.lastThreeOperations.pop();
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  calculate() {
    try {
      this.result = this.safeEval(this.display.replace(/×/g, '*').replace(/÷/g, '/')).toString();
      this.addOperationToHistory(this.display + ' = ' + this.result);
    } catch (e) {
      this.result = 'Error';
    }
  }

  appendNumber(num: number) {
    if (this.display === '0' || this.display === 'Error') {
      this.display = String(num);
    } else {
      this.display += String(num);
    }
  }

  appendOperator(operator: string) {
    const lastChar = this.display[this.display.length - 1];
    const operators = ['+', '-', '×', '÷'];

    if (operators.includes(lastChar)) {
      return;
    }

    if (!isNaN(Number(lastChar)) || lastChar === '.') {
      this.display += operator;
    }
  }

  clear() {
    this.display = '0';
    this.result = '';
  }

  toggleSign() {
    if (this.display === '0') {
      return;
    } else if (this.display.startsWith('-')) {
      this.display = this.display.substring(1);
    } else {
      this.display = '-' + this.display;
    }
  }

  appendZeroes(num: number) {
    if (this.display !== '0') {
      this.display += '00';
    }
  }

  safeEval(expression: string): number {
    try {
      const result = Function('"use strict"; return (' + expression + ')')();
      return Math.round((result + Number.EPSILON) * 1000000000) / 1000000000;
    } catch (e) {
      return NaN;
    }
  }
}
