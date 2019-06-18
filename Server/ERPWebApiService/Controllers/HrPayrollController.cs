using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Net.Http;
using ERP.DataService.Model;
using ERPWebApiService.Authentication;
using ERPWebApiService.Exceptions;

namespace ERPWebApiService.Controllers
{
    [RoutePrefix("api/HrPayrollService")]
    public class HrPayrollController : ApiController
    {
        public ActionLogger actionLogger = new ActionLogger();
        SumonERPContext ERPContext = new SumonERPContext();
        [Route("Desigantions")]
        [HttpPost]
        public HttpResponseMessage CreateDesignation(AccountInfo accountInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
               

                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
	}
}