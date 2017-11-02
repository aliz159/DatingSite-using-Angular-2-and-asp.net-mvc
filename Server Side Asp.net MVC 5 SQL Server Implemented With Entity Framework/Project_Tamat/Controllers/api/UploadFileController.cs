using Project_Tamat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Project_Tamat.Controllers.api
{
    public class UploadFileController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        [HttpPost]
        public HttpResponseMessage UploadJsonFile()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    // var filePath = HttpContext.Current.Server.MapPath
                    //("C:\\Users\\user\\Desktop\\rar_Angular\\Yesterday_project_14_9_2017\\final_project_in_angular_8_9_17\\src\\img\\"
                    //+ postedFile.FileName);
                    // postedFile.SaveAs("C:\\Users\\user\\Desktop\\rar_Angular\\Yesterday_project_14_9_2017\\final_project_in_angular_8_9_17\\src\\img\\"
                    //C: \Users\TC14\Desktop\1 - 10 - 2017\final_project_in_angular_27_9_17-yaffa\src\img
                    postedFile.SaveAs("C:\\Users\\יפה בלטה\\Desktop\\27-9-17\\final_project_in_angular_8_9_17\\src\\img\\"
                    + postedFile.FileName);
                }
            }
            return response;
        }

        [HttpPatch]
        public IHttpActionResult IsVerifiedUpdate(Customer cust)
        {
            Customer customer = m_db.Customers.Find(cust.Id);

            if (customer == null)
            {
                return NotFound();
            }

            customer.IsVerified = true;
            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
