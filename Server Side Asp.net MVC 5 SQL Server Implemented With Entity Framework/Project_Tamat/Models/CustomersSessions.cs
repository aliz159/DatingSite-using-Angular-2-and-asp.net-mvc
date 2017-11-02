using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_Tamat.Models
{
    public class CustomersSessions
    {
        public long Id { get; set; }//primary key
        public long CustomerId{ get; set; }//foreign key        
        public string SessionId { get; set; }
        public string SessionDate { get; set; }
        public string SessionTime { get; set; }
    }
}