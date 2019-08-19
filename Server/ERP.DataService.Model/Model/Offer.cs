using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("Offer")]
    public class Offer
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string ValuableCustomerType_Id { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string OfferSetup_Id { set; get; }
        public string OfferType { set; get; }
        public bool? IsMultiple { set; get; }
        public bool? IsDiscountRate { set; get; }
        public bool? IsSingle { set; get; }
    }
}
