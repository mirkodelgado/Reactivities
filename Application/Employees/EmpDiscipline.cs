using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Employees
{
    public class EmpDiscipline
    {
        public class Query : IRequest<List<Discipline>> { }

        public class Handler : IRequestHandler<Query, List<Discipline>>
        {
            private readonly NhDataContext _context;
            public Handler(NhDataContext context)
            {
                _context = context;
            }

            public async Task<List<Discipline>> Handle(Query request,
                    CancellationToken cancellationToken)
            {
                var disciplines = await _context.Disciplines.ToListAsync();

                return disciplines;
             }
        }        
    }
}