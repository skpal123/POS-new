using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class SubCategoryInfo
    {
        public Guid Id { set; get; }
        public string SubCategoryId { set; get; }
        public Guid? Category_Id { set; get; }
        public String CategoryName { set; get; }
        public string SubCategoryName { set; get; }
    }
}
