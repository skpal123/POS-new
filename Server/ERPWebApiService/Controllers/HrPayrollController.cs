﻿using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
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
using ViewModel.Model.HrPayroll;

namespace ERPWebApiService.Controllers
{
    [RoutePrefix("api/HrPayrollService")]
    public class HrPayrollController : ApiController
    {
        public ActionLogger actionLogger = new ActionLogger();
        SumonERPContext ERPContext = new SumonERPContext();
        [Route("Desigantion")]
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
        [Route("Desigantion/{id}")]
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
        [Route("Desigantions")]
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
        [Route("Desigantion/{id}")]
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
        [Route("Desigantion/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteDesigantion(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from Desigantion where id=@id", paramlist, null);
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
        [Route("Grade/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateEmployeeGrade(string id, EmployeeGradeInfo gradeInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var oGrade = ERPContext.Designations.FirstOrDefault(x => x.Id == gradeInfo.Id);
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
        public HttpResponseMessage CreateEmployeeSubGrade(EmployeeGradeInfo employeeGradeInfo)
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
        public HttpResponseMessage UpdateEmployeeSubGrade(string id, EmployeeGradeInfo gradeInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var oGrade = ERPContext.Designations.FirstOrDefault(x => x.Id == gradeInfo.Id);
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
        [Route("SubGrades")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeSubGradeList()
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
	}
}