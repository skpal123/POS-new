using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class GroupItemInfo
    {
        public Guid Id { set; get; }
        public string TransactionId { set; get; }
        public string TransactionType { set; get; }
        public string Reason { set; get; }
        public int Quantity { set; get; }
        public decimal TotalAmount { set; get; }
        public decimal Vat { set; get; }
        public decimal Tax { set; get; }
        public decimal DiscountRate { set; get; }
        public decimal DiscountAmount { set; get; }
        public decimal NetPaidAmount { set; get; }
        public string ChalanNo { set; get; }
        public string InvoiceNo { set; get; }
        public string Comments { set; get; }
        public DateTime? TransactionDate { set; get; }
        public String GrvNo { set; get; }
        public Guid? Supplier_Id { set; get; }
        public string SupplierName { set; get; }
        public DateTime GrvDate { set; get; }
        public Guid? Approver_Id { set; get; }
        public Guid? Ledger_Id { set; get; }
        public string LedgerName { set; get; }
        public Guid? SubLedger_Id { set; get; }
        public string SubLedgerName { set; get; }
        public int? PaymentMode { set; get; }
        public string LotNo { set; get; }
        public List<ItemTransactionInfo> ItemTransactionList { set; get; }
    }
}
