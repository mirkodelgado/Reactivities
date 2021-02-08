using Microsoft.EntityFrameworkCore;

using Domain;

namespace Persistence
{
    public class NhDataContext : DbContext
    {
        public NhDataContext(DbContextOptions<NhDataContext> options) : base(options)
        {            
        }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<Location> Locations { get; set; }

        public DbSet<EmployeeType> EmployeeTypes { get; set; }

        public DbSet<Discipline> Disciplines { get; set; }

        public DbSet<SF330Discipline> SF330Disciplines { get; set;}

        public DbSet<BillingTitle> BillingTitles { get; set;}


        public DbSet<Designation> Designations { get; set; }
        
        public DbSet<AdpManager> AdpManagers { get; set; }

        public DbSet<NextEmployeeNumber> NextEmployeeNumbers { get; set;}


        protected override void OnModelCreating(ModelBuilder builder)
        {
            //builder.Entity<Employee>()
            //    .HasKey(e => e.Number);

            //builder.Entity<Location>()
            //    .HasKey(l => l.Id);
        }
    }
}
