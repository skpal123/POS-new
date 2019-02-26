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
using ERPWebApiService.Autentication;
using ERPWebApiService.Exceptions;
using System.Data.Entity.Migrations;
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
               // var userSession=AuthorizationHelper.GetSession();
                var accountDetails = new AccountDetails();
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
                                       AccountType=acc.AccountType,
                                       ParentGroupId = pcr.ParentGroupId,
                                       ParentLevelId = pcr.ParentLevelId,
                                       ParentAccount_Id = pcr.ParentAccount_Id,
                                       ChildAccId = pcr.ChildAccId,
                                       ParentAccId = pcr.ParentAccId,
                                       ChildGroupId = pcr.ChildGroupId,
                                       ChildLevelId = pcr.ChildLevelId,
                                       ChildAccount_Id = pcr.ChildAccount_Id                                     
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
                                              ChildGroupId=acc.GroupId,
                                              ChildLevelId=acc.LevelId,
                                              ChildAccId=acc.AccId
                                          }).ToList();
                foreach (var account in ChartOfAccountListTree)
                {
                    AccountParentChildRelationInfo ChartOfAccount = new AccountParentChildRelationInfo();
                    ChartOfAccount.AccountId = account.AccountId;
                    ChartOfAccount.AccountDescription = account.AccountDescription;
                    ChartOfAccount.Id = account.Id;
                    ChartOfAccount.ChildGroupId = account.ChildGroupId;
                    ChartOfAccount.ChildLevelId = account.ChildLevelId;
                    ChartOfAccount.ChildAccId = account.ChildAccId;
                    ChartOfAccount.Children = genterateAccountTree(accountList, account.AccountId);
                    ChartOfAccountListTree2.Add(ChartOfAccount);
                }
                accountDetails.AccountParentChildRelationInfoList = ChartOfAccountListTree2;
                accountDetails.AccountList = accountList;
                return Request.CreateResponse(HttpStatusCode.OK, accountDetails);
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
        [Route("createChartOfAccount")]
        [HttpPost]
        public HttpResponseMessage CreateChartOfAccount(AccountInfo accountInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                    var chartOfAccount = new Account()
                    {
                        Id=Guid.NewGuid(),
                        AccId=accountInfo.AccId,
                        GroupId=accountInfo.GroupId,
                        LevelId=accountInfo.LevelId,
                        AccountType=accountInfo.AccountType,
                        AccountDescription=accountInfo.AccountDescription,
                        AutoAccountCode=accountInfo.AutoAccountCode,
                        ManualAccountCode=accountInfo.ManualAccountCode,
                        IsLeaf=false,
                        IsProfitLoss=accountInfo.IsProfitLoss,
                        IsReciptsPayment=accountInfo.IsProfitLoss,
                        IsSale=accountInfo.IsSale
                        //BranchId=userSession.SelectedBranchId
                    };
                    ERPContext.Accounts.AddOrUpdate(chartOfAccount);
                    ERPContext.SaveChanges();
                    var parentAccount=ERPContext.Accounts.FirstOrDefault(x=>x.Id==accountInfo.ParentAccountId);
                    var childParentRelation=new AccountParentChildRelation(){
                        Id=Guid.NewGuid(),
                        ParentAccId=parentAccount.AccId,
                        ParentGroupId=parentAccount.GroupId,
                        ParentLevelId=parentAccount.LevelId,
                        ChildAccId=chartOfAccount.AccId,
                        ChildGroupId=chartOfAccount.GroupId,
                        ChildLevelId=chartOfAccount.LevelId,
                        ParentAccount_Id=parentAccount.Id,
                        ChildAccount_Id=chartOfAccount.Id
                        //Branch_Id=userSession.SelectedBranchId
                    };
                    ERPContext.AccountParentChildRelations.AddOrUpdate(childParentRelation);
                    ERPContext.SaveChanges();
                    ERPContext.Database.ExecuteSqlCommand("update tblaccount set Isleaf=0 where id='" + accountInfo.ParentAccountId + "'");
                //}
                
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
        [Route("createChartOfAccount/{id}")]
        [HttpPost]
        public HttpResponseMessage CreateChartOfAccount(string id,AccountInfo accountInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                    var parseId = Guid.Parse(id);
                    var oChartOfAccount = ERPContext.Accounts.FirstOrDefault(x => x.Id == parseId);
                    var chartOfAccount = new Account()
                    {
                        Id = oChartOfAccount.Id,
                        AccountType = accountInfo.AccountType,
                        AccountDescription = accountInfo.AccountDescription,
                        AutoAccountCode = accountInfo.AutoAccountCode,
                        ManualAccountCode = accountInfo.ManualAccountCode,
                        AccId=oChartOfAccount.AccId,
                        GroupId=oChartOfAccount.GroupId,
                        LevelId=oChartOfAccount.LevelId,
                        CloseingStatus=oChartOfAccount.CloseingStatus,
                        IsLeaf=oChartOfAccount.IsLeaf,
                        IsProfitLoss=oChartOfAccount.IsProfitLoss,
                        HasSubLedger=oChartOfAccount.HasSubLedger,
                        IsReciptsPayment=oChartOfAccount.IsReciptsPayment,
                        IsSale=oChartOfAccount.IsSale
                    };
                    ERPContext.Accounts.AddOrUpdate(chartOfAccount);
                    ERPContext.SaveChanges();
                //}

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
        [Route("getVoucherList/{startDate}/{endDate}")]
        [HttpGet]
        public HttpResponseMessage GetVoucherListByDateInterval(DateTime startDate, DateTime endDate)
        {
            try
            {
               // var userSession = AuthorizationHelper.GetSession();
                var voucherList = ERPContext.Vouchers.Where(x => x.Voucherdate >= startDate && x.Voucherdate <= endDate).Select(x => new VoucherInfo()
                {
                    Id=x.Id,
                    VoucherType=x.Vouchertype,
                    VoucherNo=x.Voucherno,
                    VoucherDate=x.Voucherdate,
                    VoucherStatus=x.Voucherstatus,
                    ChequeNo=x.Chequeno,
                    ChequeDate=x.Chequedate,
                    BranchID=x.BranchID,
                    Bankname=x.Bankname,
                    BankAccountNo=x.BankAccountNo,
                    ApprovedBy=x.ApprovedBy,
                    CheckedBy=x.CheckedBy,
                    IsAutoGenerated=x.IsAutoGenerated,
                    Particulars=x.Particulars,
                    PostingStatus=x.PostingStatus,
                    Amount=x.TotalAmount                 
                }).ToList();

                return Request.CreateResponse(HttpStatusCode.OK, voucherList);
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
        [Route("getVoucheryid/{voucherId}")]
        [HttpGet]
        public HttpResponseMessage GetVoucherById(string voucherId)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                var voucherid = Guid.Parse(voucherId);
                var voucherInfo = ERPContext.Vouchers.Where(x=>x.Id==voucherid).Select(x => new VoucherInfo()
                {
                    Id = x.Id,
                    VoucherType = x.Vouchertype,
                    VoucherNo = x.Voucherno,
                    VoucherDate = x.Voucherdate,
                    VoucherStatus = x.Voucherstatus,
                    ChequeNo = x.Chequeno,
                    ChequeDate = x.Chequedate,
                    BranchID = x.BranchID,
                    Bankname = x.Bankname,
                    BankAccountNo = x.BankAccountNo,
                    ApprovedBy = x.ApprovedBy,
                    CheckedBy = x.CheckedBy,
                    IsAutoGenerated = x.IsAutoGenerated,
                    Particulars = x.Particulars,
                    PostingStatus = x.PostingStatus,
                    Amount = x.TotalAmount,
                }).FirstOrDefault();
                var voucherDeatils = (from acc in ERPContext.Accounts
                                      join vd in ERPContext.VoucherDetailList on acc.Id equals vd.Account_Id
                                      where vd.Voucher_Id == voucherid
                                      orderby vd.Lineno
                                      select new VoucherDetailInfo()
                                      {
                                          Id = vd.Id,
                                          Lineno = vd.Lineno,
                                          Vat=vd.Vat??0,
                                          Tax=vd.Tax??0,
                                          AccountId = vd.Account_Id,
                                          Amount = vd.Amount,
                                          AccountDescription = acc.AccountDescription
                                      }).ToList();

                voucherInfo.VoucherDetailsList = voucherDeatils;
                return Request.CreateResponse(HttpStatusCode.OK, voucherInfo);
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
        [Route("getChildAccount")]
        [HttpGet]
        public HttpResponseMessage GetAllChildAccount()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                var accountList = ERPContext.Accounts.Where(x=>x.IsLeaf==true && x.LevelId!=1).Select(x => new AccountInfo()
                {
                    Id=x.Id,
                    AccountDescription=x.AccountDescription,
                    AutoAccountCode=x.AutoAccountCode,
                    ManualAccountCode=x.ManualAccountCode,
                    AccountType=x.AccountType
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, accountList);
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
        [Route("getMaxAccid/{levelId}/{groupId}")]
        [HttpGet]
        public HttpResponseMessage GetMaxAccidByLevelAndGroupId(int levelId,int groupId)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                int MaxAccId=0;
                using (SqlConnection con = new SqlConnection(ConnectionString.GetConnectionString()))
                {
                    SqlCommand cmd=new SqlCommand(@"select isnull(max(accid),0) from tblaccount where groupId=@groupId and LevelId=@levelId",con);
                    cmd.Parameters.AddWithValue("@levelId",levelId);
                    cmd.Parameters.AddWithValue("@groupId",groupId);
                    //cmd.Parameters.AddWithValue("@branchId",groupId);
                    con.Open();
                    MaxAccId = Convert.ToInt32(cmd.ExecuteScalar());
                }
                return Request.CreateResponse(HttpStatusCode.OK, MaxAccId);
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
        [Route("getFormControl/{formName}")]
        [HttpGet]
        public HttpResponseMessage GetFormControlByFormName(string formName)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                var userControlList = ERPContext.UserFormControls.Where(x => x.FormName == formName&&x.IsEnable==true).Select(x => new UserFormControlInfo
                {
                    Id=x.Id,
                    Name=x.Name,
                    LabelName=x.LabelName,
                    Editable=x.Editable,
                    Autocomplete=x.Autocomplete,
                    IsEnable=x.IsEnable,
                    FormName=x.FormName,
                    Type=x.Type
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, userControlList);
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
