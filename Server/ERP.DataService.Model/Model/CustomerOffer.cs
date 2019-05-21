using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class CustomerOffer
    {
        public Guid Id { set; get; }
        public Guid? ValuableCustomer_Id { set; get; }
        public Guid? Offer_Id { set; get; }
        public int? OfferType { set; get; }
        public bool? IsDiscount { set; get; }
        public bool? IsMultiple { set; get; }
        public bool? IsSingle { set; get; }

    }
}
