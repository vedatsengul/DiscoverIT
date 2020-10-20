import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { QuoteRequest } from '../models/quote.model';
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  mortgageForm: FormGroup;
  minLoanAmount: number = 0;
  maxLoanAmount: number = 0;
  message: string;
  isRepaymentCalculated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly quoteService: QuoteService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {

    this.mortgageForm = this.formBuilder.group(
      {
        valueOfHome: [0, [Validators.required, Validators.min(0), Validators.max(500000)]],
        loanAmount: [0, [Validators.required, (control: AbstractControl) => Validators.min(this.minLoanAmount)(control), (control: AbstractControl) => Validators.max(this.maxLoanAmount)(control)]],
        termOfLoan: [10, [Validators.required, Validators.min(10), Validators.max(25)]],
        interest: [1.5, [Validators.required]],
        repayment: [null, []],
        quoteNo: [0, []]
      }
    );

    this.mortgageForm.get("valueOfHome").valueChanges.subscribe(data => {
      this.minLoanAmount = this.mortgageForm.controls["valueOfHome"].value * 0.6;
      this.maxLoanAmount = this.mortgageForm.controls["valueOfHome"].value * 0.8;
      this.mortgageForm.get('loanAmount').updateValueAndValidity();
    });
  }

  calculate() {
    this.message = "";
    if (this.mortgageForm.invalid) {
      return;
    }

    const newQuoteRequest: QuoteRequest = Object.assign({}, this.mortgageForm.value);
    newQuoteRequest.repayment = 0;

    this.quoteService.calculateRepayment(newQuoteRequest).subscribe(result => {
      this.mortgageForm.controls["repayment"].setValue(result);
      this.isRepaymentCalculated = true;
    }, error => {
      this.message = error.error;
    })
  }

  submitForApproval() {
    this.message = "";
    if (this.mortgageForm.invalid) {
      return;
    }

    const newQuoteRequest: QuoteRequest = Object.assign({}, this.mortgageForm.value);
    newQuoteRequest.repayment = 0;

    this.quoteService.calculateRepayment(newQuoteRequest).subscribe(result => {
      if (this.mortgageForm.controls["repayment"].value != result) {
        if (confirm("Due to changes you made after repayment calculation, repayment amount is changed from " + this.mortgageForm.controls["repayment"].value + " to " + result + " Do you want to proceed with new repayment value?")) {
          this.mortgageForm.controls["repayment"].setValue(result);
          newQuoteRequest.repayment = result;
        }
        else {
          return;
        }
      }
      this.quoteService.submitForApproval(newQuoteRequest).subscribe(result => {
        this.mortgageForm.controls["quoteNo"].setValue(result);
        this.message = "Quote No: " + result;
      }, error => {
        this.message = error.error;
      });
    }, error => {
      this.message = error.error;
    })
  }
}
