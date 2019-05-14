using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
     [Table("tblCustomerSupplierTransactionDetail")]
    public class CustomerSupplierTransactionDetail
    {
        public Guid Id { set; get; }
         [StringLength(20)]
        public string InvoiceNo { set; get; }
         [StringLength(20)]
        public string TransactionId { set; get; }
        public Guid? Group_Id { set; get; }
        public Guid? CustomerTransaction_Id { set; get; }
        public Guid? SupplierTransaction_Id { set; get; }
        public DateTime? PaymentDate { set; get; }
        public decimal PaidAmount { set; get; }
    }
}
