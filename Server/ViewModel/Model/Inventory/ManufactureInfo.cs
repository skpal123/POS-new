using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class ManufactureInfo
    {
        public Guid Id { set; get; }
        public string ManufactureId { set; get; }
        public string ManufactureName { set; get; }
        public string Address { set; get; }
        public string CountryName { set; get; }
        public Guid? Country_Id { set; get; }
    }
}
