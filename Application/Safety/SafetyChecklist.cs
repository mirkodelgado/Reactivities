using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using MediatR;
using AutoMapper;

using Persistence;

using Domain;
using Domain.Safety;

namespace Application.Safety
{
    public class SafetyChecklist
    {
        public class Query : IRequest<List<Checklist>> { }

        public class Handler : IRequestHandler<Query, List<Checklist>>
        {
            private readonly SftyDataContext _context;
            private readonly IMapper _mapper;
            public Handler(SftyDataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<Checklist>> Handle(Query request,
                    CancellationToken cancellationToken)
            {
                var checklists = await _context.Checklists.Include(c => c.SiteSafetyLeader).Include(c => c.JobProjectManager).Take(100).ToListAsync();
                return checklists;
            }
        }    
    }

}