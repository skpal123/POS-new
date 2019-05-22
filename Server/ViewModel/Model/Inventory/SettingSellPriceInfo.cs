using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public  class SettingSellPriceInfo
    {
        public Guid Id { set; get; }
        public string ItemCode { set; get; }
        public string ItemId { set; get; }
        public string ItemName { set; get; }
        public DateTime? PurchaseDate { set; get; }
        public decimal PreviousAmount { set; get; }
        public decimal Amount { set; get; }
        public Guid? Item_Id { set; get; }
    }
}
