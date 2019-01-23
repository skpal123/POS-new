using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    public class Item
    {
        public Guid Id { set; get; }
        [StringLength(200)]
        public string Name { set; get; }
        [StringLength(200)]
        public string RouterPath { set; get; }
        public Guid? SubMenu_Id { set; get; }
    }
}
