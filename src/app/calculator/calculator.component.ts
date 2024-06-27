import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculatorService } from '../calculator.service';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  calculatorForm: FormGroup;
  firstNumber: string | null = null;
  secondNumber: string | null = null;
  operation: string | null = null;
  result: number | null = null;
  operations: string[] = [];
  location = 'default';

  constructor(private calculatorService: CalculatorService,
     private cdr: ChangeDetectorRef,
    private fb: FormBuilder) {
      this.calculatorForm = this.fb.group({
        firstNumber: ['', [Validators.required, Validators.pattern(/^[-+]?\d{1,4}$/), this.rangeValidator.bind(this)]],
        secondNumber: ['', [Validators.required, Validators.pattern(/^[-+]?\d{1,4}$/), this.rangeValidator.bind(this)]],
        operation: ['', Validators.required]
      });
    }

    rangeValidator(control: any): { [key: string]: boolean } | null {
      const value = parseFloat(control.value);
      if (!isNaN(value) && (value < -1000 || value > 1000)) {
        return { 'rangeError': true };
      }
      return null;
    }

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
    const firstNumber = this.calculatorForm.get('firstNumber')?.value;
    if (firstNumber !== null) {
      this.calculatorService.setFirstNumber(parseFloat(firstNumber), this.location)
        .subscribe(operations => this.operations = operations);
    }
  }

  setSecondNumber(): void {
    const secondNumber = this.calculatorForm.get('secondNumber')?.value;
    if (secondNumber !== null) {
      this.calculatorService.setSecondNumber(parseFloat(secondNumber), this.location)
        .subscribe(operations => this.operations = operations);
    }
  }

  performCalculation(): void {
    if (this.calculatorForm.valid) {
      const { firstNumber, secondNumber, operation } = this.calculatorForm.value;
      const num1 = parseFloat(firstNumber);      
      const num2 = parseFloat(secondNumber);

      if (isNaN(num1) || isNaN(num2)) {
        alert('Error: Invalid number input');
        return;
      }

      if (operation === 'divide' && num2 === 0) {
        alert('Error: Division by zero');
        return;
      }

      this.calculatorService.calculate(num1, num2, operation, this.location)
        .subscribe(result => this.result = result);
    }
  }

  clear(): void {
    this.calculatorService.clearNumbers(this.location).subscribe(() => {
      this.firstNumber = null;
      this.secondNumber = null;
      this.operation = null;
      this.calculatorForm.reset();
      this.result = null;
      this.operations = [];

      this.cdr.detectChanges();
      this.calculatorService.clearNumbers(this.location).subscribe();

    });
  }
}