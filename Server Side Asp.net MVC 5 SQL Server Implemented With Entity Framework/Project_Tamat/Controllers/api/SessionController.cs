using Project_Tamat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.SessionState;

namespace Project_Tamat.Controllers.api
{
    public class SessionController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/CustomersSessions
        [HttpGet]
        public IEnumerable<CustomersSessions> GetSessions()
        {
            return m_db.Sessions.AsEnumerable();
        }

        [HttpPatch]
        public bool doesSessionExpired(CustomersSessions strSession)
        {
            bool isExpired = false;
            CustomersSessions session = m_db.Sessions.SingleOrDefault(x => x.SessionId == strSession.SessionId);

            char[] delimiterChars = { ':', '/' };

            string[] date = session.SessionDate.Split(delimiterChars);
            string[] Time = session.SessionTime.Split(delimiterChars);

            DateTime CurrentTime = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day,
                DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second);

            DateTime sessionTime = new DateTime(Int32.Parse(date[2]), Int32.Parse(date[1]),
                Int32.Parse(date[0]), Int32.Parse(Time[0]), Int32.Parse(Time[1]), Int32.Parse(Time[2]));

            int timeBetween = CurrentTime.Subtract(sessionTime).Minutes;

            if (timeBetween > 20)
            {
                isExpired = true;
            }
            else
            {
                isExpired = false;
            }
            return isExpired;
        }






        [HttpPut]
        public IHttpActionResult DeleteSessions(CustomersSessions strSession)
        {
            SessionIDManager manager = new SessionIDManager();
            CustomersSessions session = m_db.Sessions.SingleOrDefault(x => x.SessionId == strSession.SessionId);

            bool isExpired = doesSessionExpired(strSession);

            if (isExpired)
            {
                manager.RemoveSessionID(HttpContext.Current);
                m_db.Sessions.Remove(session);
                m_db.SaveChanges();
                return BadRequest("Your session expierd");
            }

            if (manager.Validate(strSession.SessionId))
            {
                Customer customer = m_db.Customers.SingleOrDefault(x => x.Id == session.CustomerId);

                if (session == null || customer == null)
                {
                    return BadRequest();
                }
                customer.LastSeenDate = session.SessionDate;
                customer.LastSeenTime = session.SessionTime;

                manager.RemoveSessionID(HttpContext.Current);
                m_db.Sessions.Remove(session);
                m_db.SaveChanges();

                //return Ok(session);
                return Ok("session deleted succesfully");
            }
            return BadRequest();

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                m_db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
