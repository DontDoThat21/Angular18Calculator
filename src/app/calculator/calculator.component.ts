import { Component, ChangeDetectorRef } from '@angular/core';
import { CalculatorService } from '../calculator.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  firstNumber: string | null = null;
  secondNumber: string | null = null;
  operation: string | null = null;
  result: number | null = null;
  operations: string[] = [];
  location = 'default';

  constructor(private calculatorService: CalculatorService,
     private cdr: ChangeDetectorRef,
    private fb: FormBuilder) {}

  isValid(controlName: string): boolean {
    let value: number | null = null;
  
    if (controlName === 'firstNumber' && this.firstNumber !== null) {
      value = parseFloat(this.firstNumber);
    } else if (controlName === 'secondNumber' && this.secondNumber !== null) {
      value = parseFloat(this.secondNumber);
    }
  
    return value !== null && !isNaN(value) && value >= -1000 && value <= 1000;
  }

  setFirstNumber(): void {
    if (this.firstNumber !== null) {
      this.calculatorService.setFirstNumber(parseFloat(this.firstNumber), this.location)
        .subscribe(operations => this.operations = operations);
    }
  }

  setSecondNumber(): void {
    if (this.secondNumber !== null) {
      this.calculatorService.setSecondNumber(parseFloat(this.secondNumber), this.location)
        .subscribe(operations => this.operations = operations);
    }
  }

  performCalculation(): void {
    if (this.firstNumber !== null && this.secondNumber !== null && this.operation) {
      const num1 = parseFloat(this.firstNumber);
      const num2 = parseFloat(this.secondNumber);

      if (isNaN(num1) || isNaN(num2)) {
        alert('Error: Invalid number input');
        return;
      }

      if (this.operation === 'divide' && num2 === 0) {
        alert('Error: Division by zero');
        return;
      }

      this.calculatorService.calculate(num1, num2, this.operation, this.location)
        .subscribe(result => this.result = result);
    }
  }

  clear(): void {
    this.calculatorService.clearNumbers(this.location).subscribe(() => {
      this.firstNumber = null;
      this.secondNumber = null;
      this.operation = null;
      this.result = null;
      this.operations = [];

      this.cdr.detectChanges();
    });
  }
}