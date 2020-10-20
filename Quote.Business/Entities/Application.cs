using System;
using System.Collections.Generic;

namespace Quote.Business.Entities
{
    public partial class Application
    {
        public int ApplicantId { get; set; }
        public double ValueOfHome { get; set; }
        public double LoanAmount { get; set; }
        public int TermOfLoan { get; set; }
        public double InterestOfLoan { get; set; }
        public double MonthlyRepayments { get; set; }
    }
}
