using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    public class AuthorizeController : ControllerBase
    {
        public IActionResult IsCurrentUser(int id, int currentUser)
        {
            if(id != currentUser)
            {
                 return Unauthorized();
            }
            return Ok();
        }
    }
}