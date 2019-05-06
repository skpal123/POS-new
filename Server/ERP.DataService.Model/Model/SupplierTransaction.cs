using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
     [Table("tblSupplierTransaction")]
    public class SupplierTransaction
    {
        public Guid Id { set; get; }
        [StringLength(20)]
        public string ChalanNo { set; get; }
        [StringLength(20)]
        public string InvoiceNo { set; get; }
        [StringLength(20)]
        public string OrderNo { set; get; }
        public Guid? Group_Id { set; get; }
        public int? PaymentMode { set; get; }
        public DateTime? PaymentDate { set; get; }
        public Guid? Ledger_Id { set; get; }
        public Guid? SubLedger_Id { set; get; }
        public Guid? PaidAmount { set; get; }
    }
}
