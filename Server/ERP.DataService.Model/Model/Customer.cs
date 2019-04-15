using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
     [Table("tblCustomer")]
    public class Customer
    {
        public Guid Id { set; get; }
        [StringLength(20)]
        public string CustomerId { set; get; }
        [StringLength(150)]
        public string CustomerName { set; get; }
        [StringLength(20)]
        public string PhoneNo { set; get; }
        [StringLength(100)]
        public string Email { set; get; }
        [StringLength(200)]
        public string Address { set; get; }
        public Guid? Ledger_Id { set; get; }
        public Guid? SubLedger_Id { set; get; }
    }
}
