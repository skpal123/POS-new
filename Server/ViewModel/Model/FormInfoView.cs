using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class FormInfoView
    {
        public int Id { set; get; }
        public string Name { set; get; }
        public Boolean? IsEnable { set; get; }
        public Boolean? IsValidationActive { set; get; }
        public string FormName { set; get; }
        public Boolean? IsMinLength { set; get; }
        public Boolean? IsMaxLength { set; get; }
        public Boolean? IsEmail { set; get; }
    }
}
