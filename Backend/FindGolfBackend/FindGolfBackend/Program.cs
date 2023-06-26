using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using FindGolfBackend.Services;
using System;
using FindGolfBackend.Models;

namespace FindGolfBackend
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);
      builder.Services.AddDbContext<FinalProjectDbContext>();
      // Add services to the container.
      builder.Services.AddScoped<IGolfFinderService, GolfFinderService>();
      builder.Services.AddScoped<IGolfDetailsService, GolfDetailsService>();

      builder.Services.AddControllers();
      builder.Services.AddHttpClient<GolfFinderService>(client =>
      {
        client.BaseAddress = new Uri("https://golf-course-finder.p.rapidapi.com");
        client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "golf-course-finder.p.rapidapi.com");
        client.DefaultRequestHeaders.Add("X-RapidAPI-Key", "166c2d797fmsh28c82b65e687bdap1c7882jsn9874022a5a9b");
      });
      builder.Services.AddHttpClient<GolfDetailsService>(client =>
      {
        client.BaseAddress = new Uri("https://golf-course-finder.p.rapidapi.com");
        client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "golf-course-finder.p.rapidapi.com");
        client.DefaultRequestHeaders.Add("X-RapidAPI-Key", "166c2d797fmsh28c82b65e687bdap1c7882jsn9874022a5a9b");
      });
      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen();

      var app = builder.Build();

      if (app.Environment.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
          c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
        });
      }

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthorization();

      app.MapControllers();

      app.Run();
    }
  }
}
