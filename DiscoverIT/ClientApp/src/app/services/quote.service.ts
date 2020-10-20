import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuoteRequest } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private httpClient: HttpClient) {
  }

  public calculateRepayment(model: QuoteRequest) {
    return this.httpClient.post<number>('api/quote/calculate', model);
  }

  public submitForApproval(model: QuoteRequest) {
    return this.httpClient.post<number>('api/quote/submitForApproval', model);
  }
}
