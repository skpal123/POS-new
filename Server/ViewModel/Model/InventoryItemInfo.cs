using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class InventoryItemInfo
    {
        public Guid Id { set; get; }
        public string ItemId { set; get; }
        public string ItemCode { set; get; }
        public string ItemName { set; get; }
        public Guid? Category_Id { set; get; }
        public string CategoryName { set; get; }
        public Guid? SubCategory_Id { set; get; }
        public string SubCategoryName { set; get; }
        public Guid? UnitId { set; get; }
        public string UnitName { set; get; }
        public Guid? Ledger_Id { set; get; }
        public string LedgerName { set; get; }
        public Guid? SubLedger_Id { set; get; }
        public string SubLedgerName { set; get; }
    }
}
