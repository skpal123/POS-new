﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.Inventory
{
    public class OfferSetupInfo
    {
        public Guid Id { set; get; }
        public string OfferId { set; get; }
        public string OfferName { set; get; }
        public Guid? Product_Id { set; get; }
        public string ProductName { set; get; }
        public bool IsSingle { set; get; }
        public List<FreeProductInfo> FreeProductList { set; get; }
        public decimal? DiscountRate { set; get; }
        public int? BundleSize { set; get; }
    }
}