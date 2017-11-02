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
    public class CustomersInterestController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/CustomersInterest
        [HttpGet]
        public IEnumerable<CustomersInterest> GetCustomersInterests()
        {
            return m_db.CustomersInterest.AsEnumerable();
        }

        [HttpGet]
        // GET /api/CustomersInterest/1
        public IHttpActionResult GetCustomerInterest(long id)
        {
            CustomersInterest interest = m_db.CustomersInterest.SingleOrDefault(cus => cus.Id == id);

            if (interest == null)
            {
                return NotFound();
            }

            return Ok(interest);
        }

        // simple validation
        bool validationIsOk(CustomersInterest interest)
        {
            if (interest.CustomerIdInterested == 0 || interest.CustomerIdInteresting == 0 )
            {
                return false;
            }
            return true;
        }

        // POST /api/CustomersInterest
        //[HttpPost]
        //public IHttpActionResult CreateCustomersInterest(CustomersInterest interest, CustomersSessions strSession)
        //{
        //    if (!validationIsOk(interest))
        //    {
        //        return BadRequest();
        //    }
        //    SessionIDManager manager = new SessionIDManager();
        //    CustomersSessions session = m_db.Sessions.SingleOrDefault(x => x.SessionId == strSession.SessionId);

        //    SessionController s = new SessionController();
        //    bool isExpired = s.doesSessionExpired(strSession);
        //    if (isExpired){
        //        manager.RemoveSessionID(HttpContext.Current);
        //        m_db.Sessions.Remove(session);
        //        m_db.SaveChanges();
        //        return BadRequest("Your session expierd");
        //    }
        //    else{
        //        string newSessionTime = DateTime.Now.Hour + ":" + DateTime.Now.Minute + ":" + DateTime.Now.Second;
        //        session.SessionTime = newSessionTime;
        //        m_db.CustomersInterest.Add(interest);
        //        m_db.SaveChanges();
        //        return CreatedAtRoute("DefaultApi", new { id = interest.Id }, interest);
        //    }
        //}

        // POST /api/CustomersInterest
        [HttpPost]
        public IHttpActionResult CreateCustomersInterest1(CustomersInterest interest)
        {
            if (!validationIsOk(interest))
            {
                return BadRequest();
            }
            //CustomersInterest CusInterest = m_db.CustomersInterest.Find(interest.Id);

            //if (CusInterest == null)
            //{
            //    return NotFound();
            //}

            //CusInterest.CustomerIdInterested = interest.CustomerIdInterested;
            //CusInterest.CustomerIdInteresting = interest.CustomerIdInteresting;
            m_db.CustomersInterest.Add(interest);
            m_db.SaveChanges();
            //m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }
    

    // PUT /api/CustomersInterest
    [HttpPut]
        public IHttpActionResult UpdateCustomersInterest(CustomersInterest interest)
        {
            if (!validationIsOk(interest))
            {
                return BadRequest();
            }
            CustomersInterest CusInterest = m_db.CustomersInterest.Find(interest.Id);

            if (CusInterest == null)
            {
                return NotFound();
            }

            CusInterest.CustomerIdInterested = interest.CustomerIdInterested;
            CusInterest.CustomerIdInteresting = interest.CustomerIdInteresting;

            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE /api/CustomersInterest/4 -> delete CustomersInterest with id 4
        [HttpDelete]
        public IHttpActionResult DeleteCustomersInterest(long id)
        {
            CustomersInterest interest = m_db.CustomersInterest.Find(id);

            if (interest == null)
            {
                return NotFound();
            }

            m_db.CustomersInterest.Remove(interest);
            m_db.SaveChanges();

            return Ok(interest);
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
