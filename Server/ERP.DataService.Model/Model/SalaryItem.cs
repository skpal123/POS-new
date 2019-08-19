using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("SalaryItem")]
    public class SalaryItem
    {
        [Key]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string Id { set; get; }
          [StringLength(20)]
        public string ItemId { get; set; }
          [StringLength(150)]
        public string ItemName { get; set; }
          [StringLength(100)]
        public string ItemType { get; set; }
          [StringLength(100)]
        public string ItemTypeName { get; set; }
        public double? IsPension { get; set; }
        public double? IsTax { get; set; }
        public double? IsDefault { get; set; }
        public double? IsBasic { get; set; }
        public double? IsDaily { get; set; }
        public string Percentage { get; set; }
          [StringLength(20)]
        public string OperatorString { get; set; }
        public double? DefaultAmount { get; set; }
        public bool? IsLoan { get; set; }
        public bool? IsLeave { get; set; }
    }
}
