using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_Tamat.Models
{
    public class SuccessStories
    {
        public long Id { get; set; }//primary key
        public long CustomerIdFirst { get; set; }//foreign key
        public long CustomerIdSecond { get; set; }//foreign key
        public string Cities { get; set; }
        public string ShortStory { get; set; }
        public string Story { get; set; }
        public string FirstCustomerName { get; set; }
        public string SecondCustomerName { get; set; }
        public string Image { get; set; }

    }
}