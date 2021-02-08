using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain;
using MediatR;
using Persistence;

namespace Application.Employees
{
    public class EmpDetails
    {
        public class Query : IRequest<Employee>
        {
            public string Number { get; set; }
        }

        public class Handler : IRequestHandler<Query, Employee>
        {
            private readonly NhDataContext _context;
            public Handler(NhDataContext context)
            {
                _context = context;
            }

            public async Task<Employee> Handle(Query request,
                    CancellationToken cancellationToken)
            {
                var employee = await _context.Employees.Include(t => t.EmployeeTraining)
                                                    .Include(i => i.EmployeeIt)
                                                    .Include(i => i.EmployeeHr)
                                                    .FirstOrDefaultAsync(e => e.Number.Equals(request.Number));
                return employee;
            }
        }
    }
}