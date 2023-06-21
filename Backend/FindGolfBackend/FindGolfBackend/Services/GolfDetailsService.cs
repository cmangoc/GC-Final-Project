using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace FindGolfBackend.Services
{
  public interface IGolfDetailsService
  {
    Task<string> GetCourseDetails(string zip, string name);
  }

  public class GolfDetailsService : IGolfDetailsService
  {
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;

    public GolfDetailsService(IConfiguration configuration, HttpClient httpClient)
    {
      _configuration = configuration;
      _httpClient = httpClient;
      ConfigureHttpClient();
    }

    private void ConfigureHttpClient()
    {
      string apiHost = _configuration["GolfCourseFinder:ApiHost"];
      string apiKey = _configuration["GolfCourseFinder:ApiKey"];

      _httpClient.BaseAddress = new Uri(apiHost);
      _httpClient.DefaultRequestHeaders.Add("X-RapidAPI-Key", apiKey);
      _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }

    public async Task<string> GetCourseDetails(string zip, string name)
    {
      string apiPath = _configuration["GolfCourseFinder:CourseDetailsApiPath"];
      string requestUri = $"{apiPath}?zip={zip}&name={name}";

      var response = await _httpClient.GetAsync(requestUri);
      response.EnsureSuccessStatusCode();

      return await response.Content.ReadAsStringAsync();
    }
  }
}
