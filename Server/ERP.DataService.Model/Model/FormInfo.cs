using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblFormInfo")]
    public class FormInfo
    {
        public int Id{set;get;}
        [StringLength(100)]
        public string Name{set;get;}
        public Boolean? IsEnable{set;get;}
        public Boolean? IsValidationActive{set;get;}
         [StringLength(100)]
        public string FormName{set;get;}
        public Boolean? IsMinLength{set;get;}
        public Boolean? IsMaxLength{set;get;}
        public Boolean? IsEmail { set; get; }
    }
}
