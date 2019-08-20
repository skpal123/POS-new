using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.HrPayroll
{
    public class SalaryItemInfo
    {

        public string Id { get; set; }
        public double? ItemId { get; set; }
        public string ItemName { get; set; }
        public string ItemType { get; set; }
        public string ItemTypeName { get; set; }
        public double? IsPension { get; set; }
        public double? IsTax { get; set; }
        public double? IsDefault { get; set; }
        public double? IsBasic { get; set; }
        public double? IsDaily { get; set; }
        public string Percentage { get; set; }
        public string OperatorString { get; set; }
        public double? DefaultAmount { get; set; }
        public bool? IsLoan { get; set; }
        public bool? IsLeave { get; set; }
    }
}
