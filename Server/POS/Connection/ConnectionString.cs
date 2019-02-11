using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
namespace ERPWebApiService.Connection
{
    public class ConnectionString
    {
        public static string GetConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["SumonPOSContext"].ConnectionString.ToString();
        }
    }
}