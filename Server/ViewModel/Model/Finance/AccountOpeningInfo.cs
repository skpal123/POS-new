using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class AccountOpeningInfo
    {
        public Guid Id { set; get; }
        public string BranchCode { set; get; }
        public Guid? BranchId { set; get; }
        public decimal? Amount { set; get; }
        public DateTime OpeningDate { set; get; }
        public string AutoAccountCode { set; get; }
        public Guid? AccountId { set; get; }
    }
}
