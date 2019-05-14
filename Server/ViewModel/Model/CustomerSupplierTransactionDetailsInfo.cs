using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class CustomerSupplierTransactionDetailsInfo
    {
        public Guid Id { set; get; }
        public string InvoiceNo{ set; get; }
        public string TransactionId{ set; get; }
        public  Guid? Group_Id{ set; get; }
        public  Guid? CustomerTransaction_Id{ set; get; }
        public  Guid? SupplierTransaction_Id{ set; get; }
        public DateTime? PaymentDate{ set; get; }
        public decimal PaidAmount { set; get; }
    }
}
