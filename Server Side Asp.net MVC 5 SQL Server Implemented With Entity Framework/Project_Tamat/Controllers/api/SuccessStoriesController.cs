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
    public class SuccessStoriesController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/CustomersInterest
        [HttpGet]
        public IEnumerable<SuccessStories> GetSuccessStories()
        {
            return m_db.SuccessStories.AsEnumerable();
        }

        // /api/SuccessStories
        [HttpPatch]
        public IHttpActionResult GetSuccessStories(CustomersSessions strSession)
        {
            SessionIDManager manager = new SessionIDManager();
            CustomersSessions session = m_db.Sessions.SingleOrDefault(x => x.SessionId == strSession.SessionId);

            SessionController s = new SessionController();
            bool isExpired = s.doesSessionExpired(strSession);

            if (isExpired)
            {
                manager.RemoveSessionID(HttpContext.Current);
                m_db.Sessions.Remove(session);
                m_db.SaveChanges();
                return BadRequest("Your session expierd");
            }
            else
            {
                string newSessionTime = DateTime.Now.Hour + ":" + DateTime.Now.Minute + ":" + DateTime.Now.Second;
                session.SessionTime = newSessionTime;
                return Ok(m_db.SuccessStories.AsEnumerable());
            }
        }

        [HttpGet]
        // GET /api/SuccessStories/1
        public IHttpActionResult GetSuccessStory(long id)
        {
            SuccessStories story = m_db.SuccessStories.SingleOrDefault(st => st.Id == id);

            if (story == null)
            {
                return NotFound();
            }

            return Ok(story);
        }

        // simple validation
        bool validationIsOk(SuccessStories story)
        {
            var ValidationIsOk  =  !string.IsNullOrEmpty(story.Story) && !string.IsNullOrEmpty(story.Cities)
                && !string.IsNullOrEmpty(story.ShortStory) && !string.IsNullOrEmpty(story.Image)
                && !string.IsNullOrEmpty(story.FirstCustomerName) && !string.IsNullOrEmpty(story.SecondCustomerName);
            return ValidationIsOk;
        }

        //POST /api/SuccessStories
        [HttpPost]
        public IHttpActionResult CreateContact(SuccessStories story)
        {
            if (story.CustomerIdFirst == 0 || story.CustomerIdSecond == 0 || !validationIsOk(story))
            {
                return BadRequest();
            }
            m_db.SuccessStories.Add(story);
            m_db.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = story.Id }, story);
        }

       // PUT /api/SuccessStories
       [HttpPut]
        public IHttpActionResult UpdateSuccessStory(SuccessStories story)
        {
            if (story.CustomerIdFirst == 0 || story.CustomerIdSecond == 0 || !validationIsOk(story))
            {
                return BadRequest();
            }
            SuccessStories CusStory = m_db.SuccessStories.Find(story.Id);

            if (CusStory == null)
            {
                return NotFound();
            }

            CusStory.CustomerIdFirst = story.CustomerIdFirst;
            CusStory.CustomerIdSecond = story.CustomerIdSecond;
            CusStory.FirstCustomerName = story.FirstCustomerName;
            CusStory.SecondCustomerName = story.SecondCustomerName;
            CusStory.ShortStory = story.ShortStory;
            CusStory.Story = story.Story;
            CusStory.Cities = story.Cities;
            CusStory.Image = story.Image;

            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE /api/SuccessStories/4 -> delete SuccessStories with id 4
        [HttpDelete]
        public IHttpActionResult DeleteSuccessStory(long id)
        {
            SuccessStories CusStory = m_db.SuccessStories.Find(id);
            if (CusStory == null)
            {
                return NotFound();
            }
            m_db.SuccessStories.Remove(CusStory);
            m_db.SaveChanges();
            return Ok(CusStory);
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
