using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class PasswordChangeHistory
    {
        public Guid Id { set; get; }
        public Guid? User_Id { set; get; }
        public Guid? Branch_Id { set; get; }
         [StringLength(200)]
        public string Password { set; get; }
         [StringLength(200)]
         public string PrevPassword { set; get; }
        public DateTime? PasswordChangeDate { set; get; }
    }
}
