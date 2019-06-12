using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblOfferSetup")]
    public class OfferSetup
    {
        public Guid Id { set; get; }
        [StringLength(1500)]
        public string OfferName { set; get; }
          [StringLength(30)]
        public string OfferId { set; get; }
        public Guid? Product_Id { set; get; }
        public bool? IsSingle { set; get; }
        public bool? IsOneToMany { set; get; }
        public Guid? FreeProduct_Id { set; get; }
        public decimal? DiscountRate { set; get; }
        public int? BundleSize { set; get; }
    }
}
