using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using FindGolfBackend.Services;

namespace FindGolfBackend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class GetCourseDetailsController : ControllerBase
  {
    private readonly IGolfDetailsService _golfDetailsService;

    public GetCourseDetailsController(IGolfDetailsService golfDetailsService)
    {
      _golfDetailsService = golfDetailsService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCourseDetails(string zip, string name)
    {
      try
      {
        var courseDetails = await _golfDetailsService.GetCourseDetails(zip, name);
        return Ok(courseDetails);
      }
      catch (Exception ex)
      {
        // Handle any exceptions that occur during the API call
        return StatusCode(500, $"An error occurred while retrieving golf course details: {ex.Message}");
      }
    }
  }
}
