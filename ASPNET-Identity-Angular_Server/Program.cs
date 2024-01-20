using ASPNET_Identity_Angular.Server.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddDbContextFactory<ApplicationDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("ApplicationDbContext")));

builder.Services
    .AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.ConfigureApplicationCookie(configure =>
{
    configure.Cookie.Name = "authCookie";
    configure.Cookie.IsEssential = true;
    configure.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    configure.Cookie.HttpOnly = true;
    configure.Cookie.SameSite = SameSiteMode.Strict;
});

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.MapIdentityApi<User>();

app.MapPost("/logout", async (ClaimsPrincipal user, SignInManager<User> signInManager) =>
{
    await signInManager.SignOutAsync();
    return TypedResults.Ok();
});

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseHttpsRedirection();
    app.UseHsts();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
