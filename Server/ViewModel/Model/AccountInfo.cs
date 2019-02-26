using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class AccountInfo
    {
        public Guid Id { set; get; }
        public int GroupId { set; get; }
        public int LevelId { set; get; }
        public int AccId { set; get; }
        public string AccountDescription { set; get; }
        public bool CloseingStatus { set; get; }
        public int AccountType { set; get; }
        public string ManualAccountCode { set; get; }
        public string AutoAccountCode { set; get; }
        public bool IsProfitLoss { set; get; }
        public bool IsLeaf { set; get; }
        public bool IsReciptsPayment { set; get; }
        public bool HasSubLedger { set; get; }
        public string Currency { set; get; }
        public int PackageId { set; get; }
        public bool IsSale { set; get; }
        public Guid? BranchId { set; get; }
        public Guid? Corporate_Id { set; get; }
        public int? ControlLevelId { set; get; }
        public Guid? ControlLevel_Id { set; get; }
        public Guid? ParentAccountId { set; get; }
    }
}
