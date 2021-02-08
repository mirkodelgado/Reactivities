using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Employees
{
    public class EmpDesignation
    {
        public class Query : IRequest<List<Designation>> { }

        public class Handler : IRequestHandler<Query, List<Designation>>
        {
            private readonly NhDataContext _context;
            public Handler(NhDataContext context)
            {
                _context = context;
            }

            public async Task<List<Designation>> Handle(Query request,
                    CancellationToken cancellationToken)
            {
                var designations = await _context.Designations.ToListAsync();

                return designations;
             }
        }        
    }
}