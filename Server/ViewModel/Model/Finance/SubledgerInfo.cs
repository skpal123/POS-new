using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class SubledgerInfo
    {
        public Guid Id { set; get; }
        public string SublederCode { set; get; }
        public string Description { set; get; }
        public Guid? AccountId { set; get; }

    }
}
