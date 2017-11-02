using Project_Tamat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Project_Tamat.Controllers.api
{
    public class LikeController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/CustomersInterest
        [HttpGet]
        public IEnumerable<CustomerLike> GetCustomersInterests()
        {
            return m_db.Likes.AsEnumerable();
        }

        [HttpGet]
        // GET /api/CustomersInterest/1
        public IHttpActionResult GetCustomerInterest(long id)
        {
            CustomerLike interest = m_db.Likes.SingleOrDefault(cus => cus.Id == id);

            if (interest == null)
            {
                return NotFound();
            }

            return Ok(interest);
        }

        // simple validation
        bool validationIsOk(CustomerLike interest)
        {
            if (interest.CustomerIdILike== 0 || interest.CustomerIdLiked == 0)
            {
                return false;
            }
            return true;
        }

        // POST /api/CustomersInterest

        

        [HttpPost]
        public IHttpActionResult CreateCustomersInterest1(CustomerLike interest)
        {
            if (!validationIsOk(interest))
            {
                return BadRequest();
            }
            //CustomersInterest CusInterest = m_db.CustomersInterest.Find(interest.Id);

            m_db.Likes.Add(interest);
            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }


        // PUT /api/CustomersInterest
        [HttpPut]
        public IHttpActionResult UpdateCustomersInterest(CustomerLike interest)
        {
            if (!validationIsOk(interest))
            {
                return BadRequest();
            }
            CustomerLike CusInterest = m_db.Likes.Find(interest.Id);

            if (CusInterest == null)
            {
                return NotFound();
            }

            CusInterest.CustomerIdLiked = interest.CustomerIdLiked;
            CusInterest.CustomerIdILike = interest.CustomerIdILike;

            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE /api/CustomersInterest/4 -> delete CustomersInterest with id 4
        [HttpDelete]
        public IHttpActionResult DeleteCustomersInterest(long id)
        {
            CustomerLike interest = m_db.Likes.Find(id);

            if (interest == null)
            {
                return NotFound();
            }

            m_db.Likes.Remove(interest);
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
