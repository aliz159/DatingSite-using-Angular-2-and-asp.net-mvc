using Project_Tamat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;

namespace Project_Tamat.Controllers.api
{
    public class MailController : ApiController
    {

        [HttpPost]
        public IHttpActionResult CreateNewEmail(SentEmail email)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls;
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

            mail.From = new MailAddress(email.From);
            mail.To.Add(email.RecipientEmail);
            mail.Subject = email.Title;
            mail.Body = email.Body;

            SmtpServer.Port = 587;
            SmtpServer.Credentials = new NetworkCredential("theone.datingsite@gmail.com", "theone123456");
            SmtpServer.EnableSsl = true;

            SmtpServer.Send(mail);

            return Ok();
        }

    }
}
