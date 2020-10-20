using Quote.Business.Entities;
using Quote.Business.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Quote.Business.Business
{
    public class QuoteBusiness : IQuoteBusiness
    {
        private readonly QuoteContext _database;

        public QuoteBusiness(QuoteContext database)
        {
            _database = database;
        }

        public double CalculateRepayment(QuoteViewModel model)
        {
            var calculatedInterest = model.Interest / 1200;

            var repayment = (model.LoanAmount * calculatedInterest) / (1 - Math.Pow(1 + calculatedInterest, model.TermOfLoan * 12 * -1));

            return Math.Round(repayment,2);
        }

        public async Task<int> SubmitForApproval(QuoteViewModel model)
        {
            var quote = new Application();

            quote.InterestOfLoan = model.Interest;
            quote.LoanAmount = model.LoanAmount;
            quote.MonthlyRepayments = model.Repayment;
            quote.TermOfLoan = model.TermOfLoan;
            quote.ValueOfHome = model.ValueOfHome;

            await _database.Application.AddAsync(quote);
            await _database.SaveChangesAsync();

            return quote.ApplicantId;
        }
    }
}
