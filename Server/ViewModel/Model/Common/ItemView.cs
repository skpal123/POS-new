using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class ItemView
    {
        public Guid Id { set; get; }
        public string Name { set; get; }
        public Guid? SubMenu_Id { set; get; }
    }
}
