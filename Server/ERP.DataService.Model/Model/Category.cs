using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.DataService.Model.Model
{
    [Table("tblCategory")]
    public class Category
    {
        public Guid Id { set; get; }
         [StringLength(20)]
        public string CategoryId { set; get; }
        [StringLength(150)]
        public string CategoryName { set; get; }

    }
}
