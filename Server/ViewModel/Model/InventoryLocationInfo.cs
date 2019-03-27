﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class InventoryLocationInfo
    {
        public Guid Id { set; get; }
        public string LocationId { set; get; }
        public string LocationName { set; get; }
        public string Description { set; get; }
    }
}
