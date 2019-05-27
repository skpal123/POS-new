using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.Validation
{
    public class CustomerTransactionValidation
    {
        public bool? Customer_Id { set; get; }
        public bool? PaymentMode { set; get; }
        public bool? PaymentDate { set; get; }
        public bool? Ledger_Id { set; get; }
        public bool? SubLedger_Id { set; get; }
        public bool? PaymentType { set; get; }
        public bool? PaymentMethod { set; get; }
        public bool? PayAmount { set; get; }
        public bool? TotalDueAdvanceAmount { set; get; }
    }
}
