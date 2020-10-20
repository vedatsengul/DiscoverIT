using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quote.Business.Business;
using Quote.Business.ViewModels;

namespace DiscoverIT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuoteController : ControllerBase
    {
        private readonly IQuoteBusiness _quoteBusiness;

        public QuoteController(IQuoteBusiness quoteBusiness)
        {
            _quoteBusiness = quoteBusiness;
        }

        [HttpPost]
        [Route("calculate")]
        public async Task<IActionResult> Calculate([FromBody]QuoteViewModel model)
        {
            var repayment = _quoteBusiness.CalculateRepayment(model);
            return Ok(repayment);
        }

        [HttpPost]
        [Route("submitForApproval")]
        public async Task<IActionResult> SubmitForApproval([FromBody] QuoteViewModel model)
        {
            var repayment = await _quoteBusiness.SubmitForApproval(model);
            return Ok(repayment);
        }        
    }
}
