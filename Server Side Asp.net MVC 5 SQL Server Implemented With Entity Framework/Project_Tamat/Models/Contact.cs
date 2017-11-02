using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_Tamat.Models
{
    public class Contact
    {
        public long Id { get; set; }//primary key
        public long CustomerId { get; set; }//foreign key
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string ProblemType { get; set; }
        public string Message { get; set; }
        public string LastUpdate { get; set; }
        public string Status { get; set; }
    }
}