using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_Tamat
{
    public class CustomerLike
    {
        public long Id { get; set; }//primary key
        public long CustomerIdLiked { get; set; }//foreign key        
        public long CustomerIdILike { get; set; }//foreign key
        //public int NumberOfLikes { get; set; }//foreign key
    }
}