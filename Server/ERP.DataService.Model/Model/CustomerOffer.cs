using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class CustomerOffer
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string ValuableCustomer_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Offer_Id { set; get; }
        public int? OfferType { set; get; }
        public bool? IsDiscount { set; get; }
        public bool? IsMultiple { set; get; }
        public bool? IsSingle { set; get; }

    }
}
