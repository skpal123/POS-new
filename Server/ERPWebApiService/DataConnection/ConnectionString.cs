using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
namespace ERPWebApiService.DataConnection
{
    public class ConnectionString
    {
        public string getConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["SumonERPContext"].ConnectionString.ToString();
        }
    }
}