using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("Offer")]
    public class Offer
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
