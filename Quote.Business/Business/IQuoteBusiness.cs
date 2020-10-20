using Quote.Business.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Quote.Business.Business
{
    public interface IQuoteBusiness
    {
        double CalculateRepayment(QuoteViewModel model);
        Task<int> SubmitForApproval(QuoteViewModel model);
    }
}
