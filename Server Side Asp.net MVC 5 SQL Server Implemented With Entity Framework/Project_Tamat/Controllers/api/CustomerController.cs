using Project_Tamat.classes;
using Project_Tamat.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.SessionState;
 

namespace Project_Tamat.Controllers.api
{
    public class CustomerController : ApiController
    {
        ApplicationDbContext m_db = new ApplicationDbContext();

        // /api/Customer
        [HttpGet]
        public IEnumerable<Customer> GetCustomers()
        {
            return m_db.Customers.AsEnumerable();
        }


        [HttpPatch]
        public IHttpActionResult UpdateLikesField(Customer cus,bool UpOrDown)
        {
            Customer customer = m_db.Customers.Find(cus.Id);
           //delete => Like like =  m_db.Customers.SingleOrDefault(cus => cus.Id == id);

            if (customer == null)
            {
                return NotFound();
            }
            if(UpOrDown == true)
            {
                cus.Likes++;
            }
            else
            {
                cus.Likes--;
            }
            customer.Likes = cus.Likes;
            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }


       





        [HttpGet]
        public HttpResponseMessage CustomerConfirmation(string email,string password)
        {
            if(string.IsNullOrEmpty(email)&& string.IsNullOrEmpty(password))
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden, "user name or password is invalid");
            }

            if (email== "theone.datingsite@gmail.com" && password == "theone123456")
            {
                return Request.CreateResponse(HttpStatusCode.OK, "This is Admin");
            }
            else
            {
                Customer customer = m_db.Customers.SingleOrDefault(x => x.Email == email);
                CustomersSessions sessionNew = new CustomersSessions();

                if (customer != null)
                {
                    Encryption encryption = new Encryption();

                    if (encryption.ValidatePassword(password, customer.Password))
                    {
                        SessionIDManager manager = new SessionIDManager();
                        string newSessionId = manager.CreateSessionID(HttpContext.Current);

                        string CurrentTime = DateTime.Now.Hour + ":" + DateTime.Now.Minute + ":" + DateTime.Now.Second;
                        string CurrentDate = DateTime.Now.Day + "/" + DateTime.Now.Month + "/" + DateTime.Now.Year;

                        sessionNew.CustomerId = customer.Id;
                        sessionNew.SessionId = newSessionId;
                        sessionNew.SessionDate = CurrentDate;
                        sessionNew.SessionTime = CurrentTime;
                        m_db.Sessions.Add(sessionNew);
                        m_db.SaveChanges();

                        return Request.CreateResponse(HttpStatusCode.OK, sessionNew);
                    }
                }
            }
            return  Request.CreateResponse(HttpStatusCode.Forbidden, "user name or password is invalid");
        }

        [HttpGet]
        // GET /api/Customer/1
        public IHttpActionResult GetCustomer(long id)
        {
            SessionIDManager manager = new SessionIDManager();
            string newSessionId = manager.CreateSessionID(HttpContext.Current);

            Customer customer = m_db.Customers.SingleOrDefault(cus => cus.Id == id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // simple validation
        bool validationIsOk(Customer cus)
        {
            return !string.IsNullOrEmpty(cus.Name) && !string.IsNullOrEmpty(cus.Phone) &&
                !string.IsNullOrEmpty(cus.Birthday) && !string.IsNullOrEmpty(cus.WorkField) &&
                !string.IsNullOrEmpty(cus.Gender) && 
                !string.IsNullOrEmpty(cus.InterestedInGender) || !string.IsNullOrEmpty(cus.WorkFieldInterest) &&
                !string.IsNullOrEmpty(cus.City) && !string.IsNullOrEmpty(cus.Education) &&
                !string.IsNullOrEmpty(cus.Area) && !string.IsNullOrEmpty(cus.EducationInterest) &&
                !string.IsNullOrEmpty(cus.Email) && !string.IsNullOrEmpty(cus.Hobbies) &&
                !string.IsNullOrEmpty(cus.Password) && !string.IsNullOrEmpty(cus.Music) &&
                !string.IsNullOrEmpty(cus.Religion) && !string.IsNullOrEmpty(cus.Movies) &&
                !string.IsNullOrEmpty(cus.PoliticalView) && !string.IsNullOrEmpty(cus.Quotes) 
                 && !string.IsNullOrEmpty(cus.AboutYou) && !string.IsNullOrEmpty(cus.Image);
        }

        
        // POST /api/movies
        [HttpPost]
        public HttpResponseMessage CreateCustomer(Customer cus)
        {
            if (cus.Age < 25 || cus.Age == 0 || !validationIsOk(cus))
            {
                return Request.CreateResponse(HttpStatusCode.Forbidden, "user details are invalid");
            }

            IEnumerable<Customer> custList = GetCustomers();

            foreach (var item in custList)
            {
                if (item.Image == cus.Image)
                {
                    return Request.CreateResponse(HttpStatusCode.Forbidden, "img name already exist");
                }
            }

            //System.Guid ActivationCode = Guid.NewGuid();
            //EmailVerificationController a = new EmailVerificationController();
            //a.sendVerificationLinkEmail(cus.Email, cus.Id);

            Encryption encryption = new Encryption();       
            string hashedPassword = encryption.CreatrHash(cus.Password);
            cus.Password = hashedPassword;
            cus.IsVerified = false;
            m_db.Customers.Add(cus);
            m_db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, cus);
        }


        // PUT /api/Customer
        [HttpPut]
        public IHttpActionResult UpdateCustomer(Customer cus)
        {
            if (cus.Age < 25 || cus.Age == 0 || !validationIsOk(cus))
            {
                return BadRequest();
            }

            Customer customer = m_db.Customers.Find(cus.Id);

            if (customer == null)
            {
                return NotFound();
            }
            customer.Name = cus.Name;
            customer.Age = cus.Age;
            customer.Birthday = cus.Birthday;
            customer.Gender = cus.Gender;
            customer.InterestedInGender = cus.InterestedInGender;
            customer.City = cus.City;
            customer.Area = cus.Area;
            customer.Email = cus.Email;
            //customer.Password = cus.Password;


            //Encryption encryption = new Encryption();
            //string hashedPassword = encryption.CreatrHash(cus.Password);
            //customer.Password = hashedPassword;


            customer.Phone = cus.Phone;
            customer.WorkField = cus.WorkField;
            customer.MaxAgeRangeInterest = cus.MaxAgeRangeInterest;
            customer.MinAgeRangeInterest = cus.MinAgeRangeInterest;
            customer.WorkFieldInterest = cus.WorkFieldInterest;
            customer.Education = cus.Education;
            customer.EducationInterest = cus.EducationInterest;
            customer.Hobbies = cus.Hobbies;
            customer.Music = cus.Music;
            customer.Movies = cus.Movies;
            customer.Religion = cus.Religion;
            customer.PoliticalView = cus.PoliticalView;
            customer.AboutYou = cus.AboutYou;
            customer.Quotes = cus.Quotes;
            customer.Sport = cus.Sport;
            customer.Smoking = cus.Smoking;
            customer.Image = cus.Image;

            m_db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

    
        // DELETE /api/customer/4 -> delete customer with id 4
        [HttpDelete]
        public IHttpActionResult DeleteCustomer(long id)
        {
            Customer customer = m_db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }
            m_db.Customers.Remove(customer);
            m_db.SaveChanges();

            return Ok(customer);
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
