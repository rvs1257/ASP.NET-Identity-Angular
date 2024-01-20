# AspNetIdentityAngularServer

Add the following to the `Program.cs` file after `var builder = WebApplication.CreateBuilder(args);`:

```csharp
builder.Services
    .AddDbContextFactory<ApplicationDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("ApplicationDbContext")));

builder.Services
    .AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.ConfigureApplicationCookie(configure =>
{
    configure.Cookie.IsEssential = true;
    configure.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    configure.Cookie.HttpOnly = true;
    configure.Cookie.SameSite = SameSiteMode.None;
});
```

And after `var app = builder.Build();`:

```csharp
app.MapIdentityApi<User>();

app.MapPost("/logout", async (ClaimsPrincipal user, SignInManager<User> signInManager) =>
{
    await signInManager.SignOutAsync();
    return TypedResults.Ok();
});
```

Add `app.UseAuthentication();` before `app.UseAuthorization();`
```csharp
app.UseAuthentication();
app.UseAuthorization();
```

Add a migration by running the following command in the `AspNetIdentityAngularServer` directory:

```pwsh
dotnet ef migrations add Initial
dotnet ef database update
```