using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class PermissionView
    {
        public Guid Id { get; set; }
        public Guid MenuId { get; set; }
        public Guid SubmenuId { get; set; }
        public Guid ModuleId { get; set; }
        public Guid? RoleId { get; set; }

        public int ModuleSeqId { get; set; }

        public string ModuleName { get; set; }
        public string MenuName { get; set; }
        public string SubMenuName { get; set; }
        public int MenuSeqId { get; set; }

        public int SubmenuSeqId { get; set; }

        public Guid? ItemId { get; set; }

        public string ItemName { get; set; }

        public Guid PermissionId { get; set; }

        public string PermissionName { get; set; }

        public bool IsPermission { get; set; }
    }
}
