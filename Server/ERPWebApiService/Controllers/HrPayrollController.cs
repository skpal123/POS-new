using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Net.Http;
using ERP.DataService.Model;
using ERP.DataService.Model.Model;
using ERPWebApiService.Authentication;
using ERPWebApiService.DataConnection;
using ERPWebApiService.Exceptions;
using ViewModel.Model;
using ViewModel.Model.HrPayroll;

namespace ERPWebApiService.Controllers
{
    [RoutePrefix("api/HrPayrollService")]
    public class HrPayrollController : ApiController
    {
        public ActionLogger actionLogger = new ActionLogger();
        SumonERPContext ERPContext = new SumonERPContext();
        [Route("Designation")]
        [HttpPost]
        public HttpResponseMessage CreateDesignation(DesignationInfo desigantionInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var designation = new Designation()
                {
                    Id = Guid.NewGuid().ToString(),
                    DesignationId = desigantionInfo.DesignationId,
                    DesignationName = desigantionInfo.DesignationName,
                    Description = desigantionInfo.Description
                };
                ERPContext.Designations.Add(designation);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, designation);
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
        [Route("Designation/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateDesignation(string id,DesignationInfo desigantionInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var oDesignation = ERPContext.Designations.FirstOrDefault(x => x.Id == desigantionInfo.Id);
                if (oDesignation != null)
                {
                    var designation = new Designation()
                    {
                        Id = oDesignation.Id,
                        DesignationId = desigantionInfo.DesignationId,
                        DesignationName = desigantionInfo.DesignationName,
                        Description = desigantionInfo.Description
                    };
                    ERPContext.Designations.AddOrUpdate(designation);
                    ERPContext.SaveChanges();
                }
               
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
        [Route("Designations")]
        [HttpGet]
        public HttpResponseMessage GetDesignationList()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var designations = ERPContext.Designations.Select(x => new DesignationInfo()
                {
                    Id = x.Id,
                    DesignationId = x.DesignationId,
                    DesignationName = x.DesignationName,
                    Description = x.Description
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, designations);
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
        [Route("Designation/{id}")]
        [HttpGet]
        public HttpResponseMessage GetDesignationById(string id)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var designations = ERPContext.Designations.Where(x=>x.Id==id).Select(x => new DesignationInfo()
                {
                    Id = x.Id,
                    DesignationId = x.DesignationId,
                    DesignationName = x.DesignationName,
                    Description = x.Description
                }).ToList().FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, designations);
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
        [Route("Designation/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteDesigantion(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from Designation where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Grade")]
        [HttpPost]
        public HttpResponseMessage CreateEmployeeGrade(EmployeeGradeInfo employeeGradeInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var grade = new EmployeeGrade()
                {
                    Id = Guid.NewGuid().ToString(),
                    GradeId = employeeGradeInfo.GradeId,
                    GradeName = employeeGradeInfo.GradeName,
                };
                ERPContext.EmployeeGrades.Add(grade);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, grade);
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
        [Route("Grade/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateEmployeeGrade(string id, EmployeeGradeInfo gradeInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var oGrade = ERPContext.EmployeeGrades.FirstOrDefault(x => x.Id == gradeInfo.Id);
                if (oGrade != null)
                {
                    var grade = new EmployeeGrade()
                    {
                        Id = oGrade.Id,
                        GradeId = gradeInfo.GradeId,
                        GradeName = gradeInfo.GradeName,
                    };
                    ERPContext.EmployeeGrades.AddOrUpdate(grade);
                    ERPContext.SaveChanges();
                }

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
        [Route("Grades")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeGradeList()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var designations = ERPContext.EmployeeGrades.Select(x => new EmployeeGradeInfo()
                {
                    Id = x.Id,
                    GradeId = x.GradeId,
                    GradeName = x.GradeName,
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, designations);
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
        [Route("Grade/{id}")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeGradeById(string id)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var designations = ERPContext.EmployeeGrades.Where(x => x.Id == id).Select(x => new EmployeeGradeInfo()
                {
                    Id = x.Id,
                    GradeId = x.GradeId,
                    GradeName = x.GradeName,
                }).ToList().FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, designations);
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
        [Route("Grade/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteGrade(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from EmployeeGrade where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("SubGrade")]
        [HttpPost]
        public HttpResponseMessage CreateEmployeeSubGrade(EmployeeSubGradeInfo employeeGradeInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var subgrade = new EmployeeSubGrade()
                {
                    Id = Guid.NewGuid().ToString(),
                    SubGradeId = employeeGradeInfo.SubGradeId,
                    Grade_Id = employeeGradeInfo.Grade_Id,
                    SubGradeName = employeeGradeInfo.SubGradeName,
                    EeectiveDate = employeeGradeInfo.EeectiveDate
                };
                ERPContext.EmployeeSubGrades.Add(subgrade);
                ERPContext.SaveChanges();
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
        [Route("SubGrade/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateEmployeeSubGrade(string id, EmployeeSubGradeInfo employeeGradeInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var oSubGrade = ERPContext.EmployeeSubGrades.FirstOrDefault(x => x.Id == employeeGradeInfo.Id);
                if (oSubGrade != null)
                {
                    var subgrade = new EmployeeSubGrade()
                    {
                        Id = oSubGrade.Id,
                        SubGradeId = employeeGradeInfo.SubGradeId,
                        Grade_Id = employeeGradeInfo.Grade_Id,
                        SubGradeName = employeeGradeInfo.SubGradeName,
                        EeectiveDate = employeeGradeInfo.EeectiveDate
                    };
                    ERPContext.EmployeeSubGrades.Add(subgrade);
                    ERPContext.SaveChanges();
                }

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
        [Route("SubGrades")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeSubGradeList()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                List<EmployeeSubGradeInfo> employeeSubGradeInfos = new List<EmployeeSubGradeInfo>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(@"select b.Id,b.SubGradeId,b.SubGradeName,b.Grade_Id,b.EeectiveDate,a.GradeName from EmployeeGrade
                                                    a inner join EmployeeSubGrade b on a.Id=b.Grade_Id", con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        EmployeeSubGradeInfo employeeSubGradeInfo = new EmployeeSubGradeInfo();
                        employeeSubGradeInfo.Id = (rdr["Id"].ToString());
                        employeeSubGradeInfo.SubGradeId = rdr["SubGradeId"] != DBNull.Value ? rdr["SubGradeId"].ToString() : null;
                        employeeSubGradeInfo.SubGradeName = rdr["SubGradeName"] != DBNull.Value ? rdr["SubGradeName"].ToString() : null;
                        employeeSubGradeInfo.Grade_Id = rdr["Grade_Id"] != DBNull.Value ? rdr["Grade_Id"].ToString() : null;
                        employeeSubGradeInfo.GradeName = rdr["GradeName"] != DBNull.Value ? rdr["GradeName"].ToString() : null;
                        if (rdr["EeectiveDate"] != DBNull.Value)
                        {
                            employeeSubGradeInfo.EeectiveDate = Convert.ToDateTime(rdr["EeectiveDate"]);
                        }
                        employeeSubGradeInfos.Add(employeeSubGradeInfo);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, employeeSubGradeInfos);
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
        [Route("SubGrade/{id}")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeSubGradeById(string id)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var designations = ERPContext.EmployeeSubGrades.Where(x => x.Id == id).Select(x => new EmployeeSubGradeInfo()
                {
                    Id = x.Id,
                    SubGradeId = x.SubGradeId,
                    Grade_Id = x.Grade_Id,
                    SubGradeName = x.SubGradeName,
                    EeectiveDate = x.EeectiveDate
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, designations);
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
        [Route("SubGrade/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteSubGrade(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from EmployeeSubGrade where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("SalaryItem")]
        [HttpPost]
        public HttpResponseMessage CreateEmployeeSalaryItem(SalaryItemInfo salaryItemInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var salaryItem = new SalaryItem()
                {
                    Id = Guid.NewGuid().ToString(),
                    ItemId = salaryItemInfo.ItemId,
                    ItemName = salaryItemInfo.ItemName,
                    IsBasic = salaryItemInfo.IsBasic,
                    IsDaily = salaryItemInfo.IsBasic,
                    IsDefault = salaryItemInfo.IsDefault,
                    IsLeave = salaryItemInfo.IsLeave,
                    IsLoan = salaryItemInfo.IsLoan,
                    IsPension = salaryItemInfo.IsPension,
                    IsTax = salaryItemInfo.IsTax,
                    ItemType = salaryItemInfo.ItemType,
                    ItemTypeName = salaryItemInfo.ItemTypeName,
                    DefaultAmount = salaryItemInfo.DefaultAmount
                };
                ERPContext.SalaryItems.Add(salaryItem);
                ERPContext.SaveChanges();
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
        [Route("SalaryItem/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateEmployeeSalaryItem(string id, SalaryItemInfo salaryItemInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var oSalaryItem = ERPContext.SalaryItems.FirstOrDefault(x => x.Id == salaryItemInfo.Id);
                if (oSalaryItem != null)
                {
                    var salaryItem = new SalaryItem()
                    {
                        Id = oSalaryItem.Id,
                        ItemId = salaryItemInfo.ItemId,
                        ItemName = salaryItemInfo.ItemName,
                        IsBasic = salaryItemInfo.IsBasic,
                        IsDaily = salaryItemInfo.IsBasic,
                        IsDefault = salaryItemInfo.IsDefault,
                        IsLeave = salaryItemInfo.IsLeave,
                        IsLoan = salaryItemInfo.IsLoan,
                        IsPension = salaryItemInfo.IsPension,
                        IsTax = salaryItemInfo.IsTax,
                        ItemType = salaryItemInfo.ItemType,
                        ItemTypeName = salaryItemInfo.ItemTypeName,
                        DefaultAmount = salaryItemInfo.DefaultAmount
                    };
                    ERPContext.SalaryItems.Add(salaryItem);
                    ERPContext.SaveChanges();
                }

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
        [Route("SalaryItems")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeSalaryItemList()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var salaryItemList = ERPContext.SalaryItems.Select(x => new SalaryItemInfo()
                {
                    Id = x.Id,
                    ItemId = x.ItemId,
                    ItemName = x.ItemName,
                    IsBasic = x.IsBasic,
                    IsDaily = x.IsBasic,
                    IsDefault = x.IsDefault,
                    IsLeave = x.IsLeave,
                    IsLoan = x.IsLoan,
                    IsPension = x.IsPension,
                    IsTax = x.IsTax,
                    ItemType = x.ItemType,
                    ItemTypeName = x.ItemTypeName,
                    DefaultAmount = x.DefaultAmount
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, salaryItemList);
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
        [Route("SalaryItem/{id}")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeSalaryItemById(string id)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var salaryItem = ERPContext.SalaryItems.Where(x => x.Id == id).Select(x => new SalaryItemInfo()
                {
                    Id = x.Id,
                    ItemId = x.ItemId,
                    ItemName = x.ItemName,
                    IsBasic = x.IsBasic,
                    IsDaily = x.IsBasic,
                    IsDefault = x.IsDefault,
                    IsLeave = x.IsLeave,
                    IsLoan = x.IsLoan,
                    IsPension = x.IsPension,
                    IsTax = x.IsTax,
                    ItemType = x.ItemType,
                    ItemTypeName = x.ItemTypeName,
                    DefaultAmount = x.DefaultAmount
                }).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, salaryItem);
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
        [Route("SalaryItem/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteSalaryItem(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from SalaryItem where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
	}
}