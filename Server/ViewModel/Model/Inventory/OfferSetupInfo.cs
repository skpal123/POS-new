using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.Inventory
{
    public class OfferSetupInfo
    {
        public string Id { get; set; }
        public string OfferId { set; get; }
        public string OfferName { set; get; }
        public string Product_Id { set; get; }
        public string ProductName { set; get; }
        public bool IsSingle { set; get; }
        public bool IsOneToMany { set; get; }
        public bool IsManyToOne { set; get; }
        public List<FreeProductInfo> FreeProductList { set; get; }
        public List<FreeProductInfo> ProductList { set; get; }
        public decimal? DiscountRate { set; get; }
        public int? BundleSize { set; get; }
    }
}
