using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_Tamat.Models
{
    public class CustomersInterest
    {
        public long Id { get; set; }//primary key
        public long CustomerIdInterested { get; set; }//foreign key        
        public long CustomerIdInteresting { get; set; }//foreign key
    }
}