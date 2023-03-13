using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<TestContext>(options => 
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("TestCS"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS", policy =>
    {
            policy.WithHeaders("Content-Type")
              .WithMethods("GET", "POST", "PUT", "DELETE")
              .WithOrigins("http://localhost:5108", "http://127.0.0.1:5500")
              .AllowCredentials();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("CORS");

app.UseAuthorization();

app.MapControllers();

app.Run();
