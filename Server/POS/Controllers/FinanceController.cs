using ERP.DataService.Model;
using ERP.DataService.Model.Model;
using ERPWebApiService.Connection;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ViewModel.Model;

namespace ERPWebApiService.Controllers
{
    [RoutePrefix("api/FinanceService")]
    public class FinanceController : ApiController
    {
        SumonERPContext ERPContext = new SumonERPContext();
        [Route("getChartOfAccountList")]
        [HttpGet]
        public HttpResponseMessage getChartParentChildAccountList()
        {
            try
            {
                List<AccountParentChildRelationInfo> ChartOfAccountListTree = new List<AccountParentChildRelationInfo>();
                List<AccountParentChildRelationInfo> ChartOfAccountListTree2 = new List<AccountParentChildRelationInfo>();
                var accountList = (from acc in ERPContext.Accounts
                                   join pcr in ERPContext.AccountParentChildRelations on acc.Id equals pcr.ChildAccount_Id
                                   select new AccountParentChildRelationInfo()
                                   {
                                       Id = pcr.Id,
                                       AccountId = acc.Id,
                                       AccountDescription = acc.AccountDescription,
                                       AutoAccountCode = acc.AutoAccountCode,
                                       ManualAccountCode = acc.ManualAccountCode,
                                       ParentGroupId = pcr.ParentGroupId,
                                       ParentLevelId = pcr.ParentLevelId,
                                       ParentAccount_Id = pcr.ParentAccount_Id,
                                       ChildAccId = pcr.ChildAccId,
                                       ParentAccId = pcr.ParentAccId,
                                       ChildGroupId = pcr.ChildGroupId,
                                       ChildLevelId = pcr.ChildLevelId,
                                       ChildAccount_Id = pcr.ChildAccount_Id,
                                   }).ToList();
                ChartOfAccountListTree = (from acc in ERPContext.Accounts
                                          where acc.LevelId == 1 && acc.AccId == 1
                                          orderby acc.GroupId
                                          select new AccountParentChildRelationInfo()
                                          {
                                              AccountId = acc.Id,
                                              AccountDescription = acc.AccountDescription,
                                              AutoAccountCode = acc.AutoAccountCode,
                                              ManualAccountCode = acc.ManualAccountCode,
                                          }).ToList();
                foreach (var account in ChartOfAccountListTree)
                {
                    AccountParentChildRelationInfo ChartOfAccount = new AccountParentChildRelationInfo();
                    ChartOfAccount.AccountId = account.AccountId;
                    ChartOfAccount.AccountDescription = account.AccountDescription;
                    ChartOfAccount.Id = account.Id;
                    ChartOfAccount.Children = genterateAccountTree(accountList, account.AccountId);
                    ChartOfAccountListTree2.Add(ChartOfAccount);
                }

                return Request.CreateResponse(HttpStatusCode.OK, ChartOfAccountListTree2);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }
        private List<AccountParentChildRelationInfo> genterateAccountTree(List<AccountParentChildRelationInfo> accoountList, Guid? accountId)
        {
            var accountList2 =
                accoountList.Where(y => y.ParentAccount_Id == accountId).Select(x => new AccountParentChildRelationInfo()
                {
                    Id = x.Id,
                    AccountId = x.AccountId,
                    AccountDescription = x.AccountDescription,
                    AutoAccountCode = x.AutoAccountCode,
                    ManualAccountCode = x.ManualAccountCode,
                    ParentGroupId = x.ParentGroupId,
                    ParentLevelId = x.ParentLevelId,
                    ParentAccount_Id = x.ParentAccount_Id,
                    ChildAccId = x.ChildAccId,
                    ParentAccId = x.ParentAccId,
                    ChildGroupId = x.ChildGroupId,
                    ChildLevelId = x.ChildLevelId,
                    ChildAccount_Id = x.ChildAccount_Id,
                    Children = genterateAccountTree(accoountList, x.ChildAccount_Id)
                }).ToList();
            return accountList2;
        }
    }
}
