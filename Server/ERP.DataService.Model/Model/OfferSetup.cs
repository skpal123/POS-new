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
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
        [StringLength(1500)]
        public string OfferName { set; get; }
        [StringLength(30)]
        public string OfferId { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Product_Id { set; get; }
        public bool? IsSingle { set; get; }
        public bool? IsOneToMany { set; get; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string FreeProduct_Id { set; get; }
        public decimal? DiscountRate { set; get; }
        public int? BundleSize { set; get; }
    }
}
