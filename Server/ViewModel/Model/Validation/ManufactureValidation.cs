using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Validation
{
    public class ManufactureValidation
    {
        public Boolean? ManufactureId { set; get; }
        public Boolean? ManufactureName { set; get; }
        public Boolean? Address { set; get; }
        public Boolean? CountryName { set; get; }
    }
}
