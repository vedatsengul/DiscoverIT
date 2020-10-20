using System;
using System.Collections.Generic;
using System.Text;

namespace Quote.Business.ViewModels
{
    public class QuoteViewModel
    {
        public double ValueOfHome { get; set; }
        public double LoanAmount { get; set; }
        public int TermOfLoan { get; set; }
        public double Interest { get; set; }
        public double Repayment { get; set; }
        public int QuoteNo { get; set; }
    }
}
