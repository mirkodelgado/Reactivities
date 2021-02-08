using Microsoft.EntityFrameworkCore;

using Domain;

namespace Persistence
{
    public class BstDataContext : DbContext
    {
        public BstDataContext(DbContextOptions<BstDataContext> options) : base(options)
        {            
        }

        public DbSet<ProjectList> ProjectList { get; set;}

        public DbSet<TaskList> TaskList { get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
        }
    }
}
