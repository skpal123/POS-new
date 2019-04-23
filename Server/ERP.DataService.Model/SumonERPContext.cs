﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERP.DataService.Model.Model;
namespace ERP.DataService.Model
{
    public class SumonERPContext : DbContext
    {
        public SumonERPContext()
            : base("SumonPOSContext")
        {

        }
        public DbSet<UserInfo> UserInfos { set; get; }
        public DbSet<Module> Modules { set; get; }
        public DbSet<Menu> Menus { set; get; }
        public DbSet<SubMenu> SubMenus { set; get; }
        public DbSet<Item> Items { set; get; }
        public DbSet<Permission> Permissions { set; get; }
        public DbSet<Role> Roles { set; get; }
        public DbSet<RolePermission> RolePermissions { set; get; }
        public DbSet<UserPermission> UserPermissions { set; get; }

        public DbSet<PasswordChangeHistory> PasswordChangeHistorys { set; get; }
        public DbSet<SessionManagement> SessionManagements { set; get; }
        public DbSet<ApplicatonAccessLog> ApplicatonAccessLogs { set; get; }
        public DbSet<Branch> Branchs { set; get; }
        public DbSet<BranchConfiguration> BranchConfigurations { set; get; }
        public DbSet<RoleControl> RoleControls { set; get; }
        public DbSet<Account> Accounts { set; get; }
        public DbSet<AccountParentChildRelation> AccountParentChildRelations { set; get; }
        public DbSet<Voucher> Vouchers { set; get; }
        public DbSet<VoucherDetails> VoucherDetailList { set; get; }
        public DbSet<FormControlPermssion> FormControlPermssions { set; get; }
        public DbSet<AccountOpening> AccountOpenings { set; get; }
        public DbSet<Subledger> Subledgers { set; get; }
        public DbSet<SubledgerOpening> SubledgerOpenings { set; get; }
        public DbSet<SubledgerTransaction> SubledgerTransactions { set; get; }
        public DbSet<UserFormControl> UserFormControls { set; get; }
        public DbSet<Unit> Units { set; get; }
        public DbSet<Location> Locations { set; get; }
        public DbSet<Category> Categorys { set; get; }
        public DbSet<Subcategory> Subcategorys { set; get; }
        public DbSet<InventoryItem> InventoryItems { set; get; }
        public DbSet<Supplier> Suppliers { set; get; }
        public DbSet<Party> Partys { set; get; }
        public DbSet<Manufacture> Manufactures { set; get; }
        public DbSet<FormInfo> FormInfos { set; get; }
        public DbSet<GroupItem> GroupItems { set; get; }
        public DbSet<ItemTransaction> ItemTransactions { set; get; }
        public DbSet<Customer> Customers { set; get; }
        public DbSet<SettingSellPrice> SettingSellPrices { set; get; }
    }
}
