using ERP.DataService.Model;
using ERPWebApiService.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ERPWebApiService.Controllers
{
     [RoutePrefix("api/InventoryService")]
    public class InventoryController : ApiController
    {
        public ActionLogger actionLogger = new ActionLogger();
        SumonERPContext ErpContext = new SumonERPContext();
        // GET api/<controller>
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, true);
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}