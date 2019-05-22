using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Validation
{
    public class SupplierValidation
    {
        public bool SupplierId { set; get; }
        public bool ContactPerson { set; get; }
        public bool SupplierName { set; get; }
        public bool PhoneNo { set; get; }
        public bool Email { set; get; }
        public bool Address { set; get; }
        public bool Ledger_Id { set; get; }
        public bool SubLedger_Id { set; get; }
    }
}
