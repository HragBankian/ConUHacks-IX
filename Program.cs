using fl_backend;
using fl_backend.Services;
using MySql.Data.MySqlClient;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEmailValidator, EmailValidator>();
builder.Services.AddScoped<IPasswordHash, PasswordHash>();
builder.Services.AddScoped<IFHSAService, FHSAService>();
builder.Services.AddScoped<ITFSAService, TFSAService>();
builder.Services.AddScoped<IRRSPService, RRSPService>();
builder.Services.AddScoped<IUnregisteredService, UnregisteredService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173") // Frontend URL
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend"); // Enable CORS

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
