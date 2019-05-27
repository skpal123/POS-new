﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.Model
{
    public class PartyInfo
    {
        public Guid Id { set; get; }
        public string PartyId { set; get; }
        public string ContactPerson { set; get; }
        public string PartyName { set; get; }
        public string PhoneNo { set; get; }
        public string Email { set; get; }
        public string Address { set; get; }
        public Guid? Ledger_Id { set; get; }
        public string LedgerName { set; get; }
        public Guid? SubLedger_Id { set; get; }
        public string SubLedgerName { set; get; }
    }
}