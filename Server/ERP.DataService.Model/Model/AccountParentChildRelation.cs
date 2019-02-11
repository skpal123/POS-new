using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblAccountParentChildRelation")]
    public class AccountParentChildRelation
    {
        public Guid Id { set; get; }
        public int? ParentGroupId { set; get; }
        public int? ParentLevelId { set; get; }
        public int? ChildGroupId { set; get; }
        public int? ParentAccId { set; get; }
        public int? ChildAccId { set; get; }
        public int? ChildLevelId { set; get; }
        public Guid? ParentAccount_Id { set; get; }
        public Guid? ChildAccount_Id { set; get; }
        public Guid? Branch_Id { set; get; }

    }
}
