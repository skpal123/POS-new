using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class SubLedgerTransactionInfo
    {
        public Guid Id { get; set; }
        public Guid? Account_Id { get; set; }
        public string AccountCode { get; set; }
        public string SubledgerDescription { get; set; }
        public double? Lineno { get; set; }
        public Guid? SubLedger_Id { get; set; }
        public decimal? Amount { get; set; }
        public double? FcAmount { get; set; }
    }

}
