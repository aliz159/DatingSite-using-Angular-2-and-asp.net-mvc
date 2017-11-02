using Project_Tamat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Project_Tamat.Controllers.api
{
    public class CustomersSessionsController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/CustomersSessions
        [HttpGet]
        public IEnumerable<CustomersSessions> GetSessions()
        {
            return m_db.Sessions.AsEnumerable();
        }

        // DELETE /api/CustomersSessions/4 -> delete CustomersSessions with spesific session
        [HttpDelete]
        public HttpResponseMessage DeleteSessions(long id)
        {
            CustomersSessions session = m_db.Sessions.Find(id);
            Customer customer = m_db.Customers.SingleOrDefault(x => x.Id == session.CustomerId);

            if (session == null || customer == null)
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden, "invalid");
            }

            customer.lastseenDate = session.SessionDate;
            customer.lastseenTime = session.SessionTime;

            m_db.Sessions.Remove(session);
            m_db.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK);
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
