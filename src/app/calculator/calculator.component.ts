import { Component, ChangeDetectorRef } from '@angular/core';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  firstNumber: number | null = null;
  secondNumber: number | null = null;
  operation: string | null = null;
  result: number | null = null;
  operations: string[] = [];
  location = 'default';

  constructor(private calculatorService: CalculatorService, private cdr: ChangeDetectorRef) {}

  setFirstNumber(): void {
    if (this.firstNumber !== null) {
      this.calculatorService.setFirstNumber(this.firstNumber, this.location)
        .subscribe(operations => this.operations = operations);
    }
  }

  setSecondNumber(): void {
    if (this.secondNumber !== null) {
      this.calculatorService.setSecondNumber(this.secondNumber, this.location)
        .subscribe(operations => this.operations = operations);
    }
  }

  performCalculation(): void {
    if (this.firstNumber !== null && this.secondNumber !== null && this.operation) {
      this.calculatorService.calculate(this.firstNumber, this.secondNumber, this.operation, this.location)
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