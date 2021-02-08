using Microsoft.EntityFrameworkCore;

using Domain;
using Domain.Safety;

namespace Persistence
{
    public class SftyDataContext : DbContext
    {
        public SftyDataContext(DbContextOptions<SftyDataContext> options) : base(options)
        {            
        }

        public DbSet<Checklist> Checklists { get; set; }
        public DbSet<JobNumber> JobNumbers { get; set; }

        public DbSet<AuthUserGroup> AuthUserGroups { get; set; }
        public DbSet<AuthUser> AuthUsers { get; set; }

        public DbSet<Department> Departments { get; set;}

        public DbSet<Hazzard> Hazzards { get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {

            // builder.Entity<AuthUser>()
            //     .HasKey(a => a.Id);

            // builder.Entity<Checklist>()
            //     .HasKey(c => c.Id);
                
            // builder.Entity<Checklist>()
            //     .HasOne(c => c.SiteSafetyLeader)
            //     .HasForeignKey(c => c.SiteSafetyLeaderId);


            // builder.Entity<Checklist>(checklist => 
            // {
            //     checklist.HasOne(c => c.SiteSafetyLeader)
            //         .HasForeignKey(c => c.SiteSafetyLeaderId)
            //         .IsRequired();

            // });

        }
    }
}
