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
    public class WatchListController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/WatchList
        [HttpPut]
        public IHttpActionResult GetAllWatchLists(CustomersSessions strSession)
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
                return Ok(m_db.WatchList.AsEnumerable());
            }
        }

        [HttpGet]
        // GET /api/WatchList/1
        public IHttpActionResult GetCustomerWatchList(long id)
        {
            CustomerWatchList watchList = m_db.WatchList.SingleOrDefault(wList => wList.Id == id);

            if (watchList == null)
            {
                return NotFound();
            }

            return Ok(watchList);
        }

        // simple validation
        bool validationIsOk(CustomerWatchList watchList)
        {
            if (watchList.CustomerIdViewer == 0 || watchList.CustomerIdViewed == 0)
            {
                return false;
            }
            return true;
        }

        // POST /api/WatchList
        [HttpPost]
        public IHttpActionResult CreateCustomersWatchList(CustomerWatchList watchList)
        {
            if (!validationIsOk(watchList))
            {
                return BadRequest();
            }
            m_db.WatchList.Add(watchList);
            m_db.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = watchList.Id }, watchList);           
        }

        // DELETE /api/WatchList/4 -> delete WatchList with id 4
        [HttpDelete]
        public IHttpActionResult DeleteCustomersWatch(long id)
        {
            CustomerWatchList WatchList = m_db.WatchList.Find(id);
            if (WatchList == null)
            {
                return NotFound();
            }

            m_db.WatchList.Remove(WatchList);
            m_db.SaveChanges();

            return Ok(WatchList);
        }

        // PUT /api/WatchList
        //[HttpPut]
        //public IHttpActionResult UpdateCustomerWatchList(CustomerWatchList wList)
        //{
        //    if (!validationIsOk(wList))
        //    {
        //        return BadRequest();
        //    }

        //    CustomerWatchList watchList = m_db.WatchList.Find(wList.Id);

        //    if (watchList == null)
        //    {
        //        return NotFound();
        //    }

        //    watchList.CustomerIdViewer = wList.CustomerIdViewer;
        //    watchList.CustomerIdViewed = wList.CustomerIdViewed;

        //    m_db.SaveChanges();
        //    return StatusCode(HttpStatusCode.NoContent);
        //}


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
