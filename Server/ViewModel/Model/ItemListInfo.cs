using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class ItemListInfo
    {
        public Guid Id { set; get; }
        public string ItemId { set; get; }
        public string ItemCode { set; get; }
        public string ItemName { set; get; }
        public string UnitName { set; get; }
        public string CategoryName { set; get; }
        public string SubCategoryName { set; get; }
    }
}
