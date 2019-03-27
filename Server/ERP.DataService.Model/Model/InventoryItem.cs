using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblInventoryItem")]
    public class InventoryItem
    {
        public Guid Id { set; get; }
           [StringLength(20)]
        public string ItemId { set; get; }
           [StringLength(20)]
        public string ItemCode { set; get; }
           [StringLength(150)]
        public string ItemName { set; get; }
        public Guid? Category_Id { set; get; }
        public Guid? SubCategory_Id { set; get; }
        public Guid? UnitId { set; get; }
        public Guid? Ledger_Id { set; get; }
        public Guid? SubLedger_Id { set; get; }

    }
}
