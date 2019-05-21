using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class OfferSetup
    {
        public Guid Id { set; get; }
        public Guid? Product_Id { set; get; }
        public Guid? FreeProduct_Id { set; get; }
        public decimal? DiscountRate { set; get; }
        public int? BundleSize { set; get; }
    }
}
