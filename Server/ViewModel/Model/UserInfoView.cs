using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class UserInfoView
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }

        public string UserName { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public Guid? AgentId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? EmployeeId { get; set; }

        public string UserPassword { get; set; }

        public bool UserStatus { get; set; }

        public int UserLevel { get; set; }

        public Guid? UserLevelId { get; set; }

        public RoleInfo UserRole { get; set; }

        public string Mobile { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public Guid? Project_Id { get; set; }
    }
}
