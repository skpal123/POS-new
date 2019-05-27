﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class PartyTransactionInfo
    {
        public Guid Id { set; get; }
        public string ChalanNo { set; get; }
        public string InvoiceNo { set; get; }
        public string OrderNo { set; get; }
        public Guid? Customer_Id { set; get; }
        public string CustomerName { set; get; }
        public Guid? Group_Id { set; get; }
        public int? PaymentMode { set; get; }
        public DateTime? PaymentDate { set; get; }
        public Guid? Ledger_Id { set; get; }
        public string LedgerName { set; get; }
        public Guid? SubLedger_Id { set; get; }
        public string SubLedgerName { set; get; }
        public decimal PaidAmount { set; get; }
        public List<CustomerSupplierTransactionDetailsInfo> TransactionDetailsList { set; get; }

    }
}