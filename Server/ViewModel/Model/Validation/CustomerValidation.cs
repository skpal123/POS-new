using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Validation
{
    public class CustomerValidation
    {
        public bool CustomerId { set; get; }
        public bool CustomerName { set; get; }
        public bool PhoneNo { set; get; }
        public bool Email { set; get; }
        public bool Address { set; get; }
        public bool Ledger_Id { set; get; }
        public bool SubLedger_Id { set; get; }
    }
}
