using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class AccountParentChildRelationInfo
    {
        public Guid Id { set; get; }
        public string AccountDescription { set; get; }
        public string AutoAccountCode { set; get; }
        public string ManualAccountCode { set; get; }
        public Guid? AccountId { set; get; }
        public int? AccountType { set; get; }
        public int? ParentGroupId { set; get; }
        public int? ParentLevelId { set; get; }
        public int? ChildGroupId { set; get; }
        public int? ParentAccId { set; get; }
        public int? ChildAccId { set; get; }
        public int? ChildLevelId { set; get; }
        public Guid? ParentAccount_Id { set; get; }
        public Guid? ChildAccount_Id { set; get; }
        public bool? IsLeaf { set; get; }
        public bool? HasSubleder { set; get; }
        public List<AccountParentChildRelationInfo> Children { set; get; }
    }
}
