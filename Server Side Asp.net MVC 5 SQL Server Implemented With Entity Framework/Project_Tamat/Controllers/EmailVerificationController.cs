using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace Project_Tamat.Controllers
{
    public class EmailVerificationController : Controller
    {

        // GET: EmailVerification
        [NonAction]
        public void sendVerificationLinkEmail(string emailID, long UserId)
        {
            //var verifyUrl = "/Verification/" + UserId;
            //var link = Request.Url.AbsoluteUri.Replace(Request.Url.PathAndQuery, verifyUrl);

            var link = "http://" + "localhost:3000/#/login/" + UserId;

            var fromEmail = new MailAddress("theone.datingsite@gmail.com", "The One");
            var toEmail = new MailAddress(emailID);
            var fromEmailPassword = "theone123456";
            string subject = "Your account is successfully created";
            string body = "<br/><br/>We are excited to tel you that your TheOne account is" +
                "successfully created. Please click on the below link to verify your account" +
                "<br/><br/> <a href='" + link + "'>" + link + "</a>";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword)
            };


            using (var message = new MailMessage()
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            })
                smtp.Send(message);
        }
    }
}