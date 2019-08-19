using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model.HrPayroll
{
    public class GradeStepSalaryItemInfo
    {
        public  Guid Id { get; set; }
        public  double? SalaryItemId { get; set; }
        public  string SalaryItem_Id { get; set; }
        public  double? SalaryAmount { get; set; }
        public  string HasComparator { get; set; }
        public  string ComparatorItemName { get; set; }
        public  string ComparatorItem_id { get; set; }
        public  string ItemType { get; set; }
        public  string Grade_id { get; set; }
        public  string GradeStep_id { get; set; }
        public  double? SingleItemAmount { get; set; }
        public  string SalItemType { get; set; }
        public  string Salary_id { get; set; } 
    }
}
