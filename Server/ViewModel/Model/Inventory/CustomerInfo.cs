using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class CustomerInfo
    {
        public Guid Id { set; get; }
        public string CustomerId { set; get; }
        public string CustomerName { set; get; }
        public string PhoneNo { set; get; }
        public string Email { set; get; }
        public string Address { set; get; }
        public Guid? Ledger_Id { set; get; }
        public string LedgerName { set; get; }
        public Guid? SubLedger_Id { set; get; }
        public string SubLedgerName { set; get; }
    }
}
