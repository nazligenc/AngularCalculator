import {NgClass, NgForOf, NgIf} from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[
    NgClass,
    NgIf,
    NgForOf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project1';
  display = '0';
  result = '';
  isDarkMode=false;
  showHistory=false;
  lastThreeOperations: string[] = [];

  toggleHistory(){
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
      this.result = eval(this.display.replace('×', '*').replace('÷', '/')).toString();
      this.addOperationToHistory(this.display + ' = ' + this.result);
    } catch (e) {
      this.result = 'Error';
    }
  }

  appendNumber(num: number) {
    if (this.display === '0') {
      this.display = String(num);
    } else {
      this.display += String(num);
    }
  }

  appendOperator(operator: string) {
    if (this.display === '0' && operator !== '+/-' && operator !== '×' && operator !== '÷') {
      return; // Eğer ekran değeri 0 ise ve eklenen operatör değiştirme işlemi değilse, işlem yapma
    }

    const lastChar = this.display[this.display.length - 1];
    if (['+', '-', '×', '÷'].includes(lastChar) && ['+', '-', '×', '÷'].includes(operator)) {
      this.display = this.display.slice(0, -1) + operator;
    } else {
      this.display += operator;
    }
  }

  clear() {
    this.display = '0';
    this.result = '';
  }

  toggleSign() {
    if (this.display === '0') {
      this.display = '0';
    } else if (this.display.startsWith('-')) {
      this.display = this.display.substring(1);
    } else {
      this.display = '-' + this.display;
    }
  }
  appendZeroes(num:number) {
    if (this.display !== '0') {
      this.display += '00';
    }else{
      return;
    }
  }

}
