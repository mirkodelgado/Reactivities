using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Employees
{
    public class EmpBillingTitle
    {
        public class Query : IRequest<List<BillingTitle>> { }

        public class Handler : IRequestHandler<Query, List<BillingTitle>>
        {
            private readonly NhDataContext _context;
            public Handler(NhDataContext context)
            {
                _context = context;
            }

            public async Task<List<BillingTitle>> Handle(Query request,
                    CancellationToken cancellationToken)
            {
                var billingTitles = await _context.BillingTitles.ToListAsync();

                return billingTitles;
             }
        }        
    }
}