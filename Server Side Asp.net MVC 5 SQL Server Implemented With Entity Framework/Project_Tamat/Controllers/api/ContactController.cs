using Project_Tamat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Project_Tamat.Controllers.api
{
    public class ContactController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/Contact
        [HttpGet]
        public IEnumerable<Contact> GetContacts()
        {
            return m_db.Contacts.AsEnumerable();
        }

        [HttpGet]
        // GET /api/Contact/1
        public IHttpActionResult GetContact(long id)
        {
            Contact contact = m_db.Contacts.SingleOrDefault(cus => cus.Id == id);

            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        // simple validation
        bool validationIsOk(Contact con)
        {
            return !string.IsNullOrEmpty(con.Name) && !string.IsNullOrEmpty(con.Phone) &&
                !string.IsNullOrEmpty(con.ProblemType) &&!string.IsNullOrEmpty(con.Email) &&
                !string.IsNullOrEmpty(con.Message);
        }

        // POST /api/Contact
        [HttpPost]
        public IHttpActionResult CreateContact(Contact con)
        {
            if (con.CustomerId == 0 || !validationIsOk(con))
            {
                return BadRequest();
            }
            con.LastUpdate = DateTime.Now.ToString();           
            con.Status = "New";
            m_db.Contacts.Add(con);
            m_db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = con.Id }, con);
        }

        // PUT /api/Contact
        [HttpPut]
        public IHttpActionResult UpdateContact(Contact con)
        {
            if (con.CustomerId == 0 || !validationIsOk(con))
            {
                return BadRequest();
            }

            Contact contact = m_db.Contacts.Find(con.Id);

            if (contact == null)
            {
                return NotFound();
            }
            contact.Name = con.Name;
            contact.CustomerId = con.CustomerId;
            contact.Phone = con.Phone;
            contact.Email = con.Email;
            contact.ProblemType = con.ProblemType;
            contact.Message = con.Message;
            contact.LastUpdate = DateTime.Now.ToString();
            contact.Status = con.Status;

            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE /api/Contact/4 -> delete Contact with id 4
        [HttpDelete]
        public IHttpActionResult DeleteContact(long id)
        {
            Contact contact = m_db.Contacts.Find(id);
            if (contact == null)
            {
                return NotFound();
            }

            m_db.Contacts.Remove(contact);
            m_db.SaveChanges();

            return Ok(contact);
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
