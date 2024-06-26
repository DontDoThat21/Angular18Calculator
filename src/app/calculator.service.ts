import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private apiUrl = 'http://localhost:7067/Api/Calculator'; // Adjust the URL to match your API endpoint

  constructor(private http: HttpClient) {}

  setFirstNumber(number: number, location: string): Observable<string[]> {
    return this.http.post<string[]>(`${this.apiUrl}/SetFirstNumber`, { number, location });
  }

  setSecondNumber(number: number, location: string): Observable<string[]> {
    return this.http.post<string[]>(`${this.apiUrl}/SetSecondNumber`, { number, location });
  }

  calculate(firstNumber: number, secondNumber: number, operation: string, location: string): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/Calculate`, { firstNumber, secondNumber, operation, location });
  }

  clearNumbers(location: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/ClearNumbers`, { location });
  }
}