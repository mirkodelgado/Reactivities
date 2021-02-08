using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Employees
{
    public class EmpSf330Discipline
    {
        public class Query : IRequest<List<SF330Discipline>> { }

        public class Handler : IRequestHandler<Query, List<SF330Discipline>>
        {
            private readonly NhDataContext _context;
            public Handler(NhDataContext context)
            {
                _context = context;
            }

            public async Task<List<SF330Discipline>> Handle(Query request,
                    CancellationToken cancellationToken)
            {
                var sf330Disciplines = await _context.SF330Disciplines.ToListAsync();

                return sf330Disciplines;
             }
        }        
    }
}