using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Employees
{
    public class EmpList
    {
        public class EmployeeEnvelope
        {
            public List<Employee> Employees { get; set; }

            public int EmployeeCount { get; set; }
        }

        //public class Query : IRequest<List<Employee>> { }
        public class Query : IRequest<EmployeeEnvelope>
        {
            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;

            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }

        //public class Handler : IRequestHandler<Query, List<Employee>>
        public class Handler : IRequestHandler<Query, EmployeeEnvelope>
        {
            private readonly NhDataContext _context;
            public Handler(NhDataContext context)
            {
                _context = context;
            }

            //public async Task<List<Employee>> Handle(Query request,
            //        CancellationToken cancellationToken)
            public async Task<EmployeeEnvelope> Handle(Query request,
                    CancellationToken cancellationToken)
            {
                var queryable = _context.Employees.AsQueryable();

                queryable = queryable.Include(et => et.EmployeeTraining);
                queryable = queryable.Include(ei => ei.EmployeeIt);
                queryable = queryable.Include(eh => eh.EmployeeHr);

                queryable = queryable.OrderByDescending(e => e.CreateDate);

                var employees = await queryable.Skip(request.Offset ?? 0).Take(request.Limit ?? 3).ToListAsync();

                return new EmployeeEnvelope
                {
                    Employees = employees,
                    EmployeeCount = queryable.Count()
                };
            }
        }

    }
}