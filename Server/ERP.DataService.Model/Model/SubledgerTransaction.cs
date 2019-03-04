using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ERP.DataService.Model.Model
{
    [Table("tblSubledgerTransaction")]
    public class SubledgerTransaction
    {
        public Guid Id { set; get; }
        public Guid? Voucher_Id { set; get; }
        public Guid? Voucher_Detail_Id { set; get; }
        public Guid? Account_Id { set; get; }
        public Guid? Subledger_Id { set; get; }
        public decimal? Amount { set; get; }
       
    }
}
