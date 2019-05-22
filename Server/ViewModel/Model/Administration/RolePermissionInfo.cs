using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class RolePermissionInfo
    {
        public Guid Id { set; get; }
        public Guid? RoleId { set; get; }
        public Guid? PermissionId { set; get; }
    }
}
