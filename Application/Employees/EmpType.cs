using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Employees
{
    public class EmpType
    {
        public class Query : IRequest<List<EmployeeType>> { }

        public class Handler : IRequestHandler<Query, List<EmployeeType>>
        {
            private readonly NhDataContext _context;
            public Handler(NhDataContext context)
            {
                _context = context;
            }

            public async Task<List<EmployeeType>> Handle(Query request,
                    CancellationToken cancellationToken)
            {
                var employeeTypes = await _context.EmployeeTypes.ToListAsync();

                return employeeTypes;
             }
        }        
    }
}