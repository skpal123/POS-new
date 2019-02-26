using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class FormControlPermssion
    {
        public Guid Id { set; get; }
        public bool? Status { set; get; }
        public int? ControlId { set; get; }
    }
}
