using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_Tamat.Models
{
    public class Customer
    {
        public long Id { get; set; }//primary key
        public string Name { get; set; }
        public int Age { get; set; }
        public string Birthday { get; set; }
        public string Gender { get; set; }
        public string InterestedInGender { get; set; }
        public string City { get; set; }
        public string Area { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string WorkField { get; set; }
        public int MinAgeRangeInterest { get; set; }
        public int MaxAgeRangeInterest { get; set; }
        public string WorkFieldInterest { get; set; }
        public string Education { get; set; }
        public string EducationInterest { get; set; }
        public string Hobbies { get; set; }
        public string Music { get; set; }
        public string Movies { get; set; }
        public string Religion { get; set; }
        public string PoliticalView { get; set; }
        public string AboutYou { get; set; }
        public string Quotes { get; set; }
        public string Sport { get; set; }
        public string Smoking { get; set; }
        public int Likes { get; set; }
        public string Image { get; set; }
        public string LastSeenDate { get; set; }
        public string LastSeenTime { get; set; }
        public bool IsVerified { get; set; }
    }
}