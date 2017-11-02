using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_Tamat.Models
{
    public class CustomerWatchList
    {
        public long Id { get; set; }//primary key
        public long CustomerIdViewer { get; set; }//foreign key        
        public long CustomerIdViewed { get; set; }//foreign key
    }
}