using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.Inventory
{
    public class OfferInfo
    {
        public Guid Id { set; get; }
        public Guid? ValuableCustomerType_Id { set; get; }
        public Guid? OfferSetup_Id { set; get; }
        public string OfferType { set; get; }
        public bool? IsMultiple { set; get; }
        public bool? IsDiscountRate { set; get; }
        public bool? IsSingle { set; get; }
    }
}
