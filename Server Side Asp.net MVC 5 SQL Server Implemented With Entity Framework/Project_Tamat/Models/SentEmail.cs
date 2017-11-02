using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_Tamat.Models
{
    public class SentEmail
    {
        public string From { get; set; }
        public string RecipientEmail { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
    }
}