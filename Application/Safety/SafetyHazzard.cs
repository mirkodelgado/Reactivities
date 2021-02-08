using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

using Domain.Safety;

namespace Application.Safety
{
    public class SafetyHazzard
    {
        public class Query : IRequest<List<HazzardDto>> { }

        public class Handler : IRequestHandler<Query, List<HazzardDto>>
        {
            private readonly SftyDataContext _context;
            private readonly IMapper _mapper;
            public Handler(SftyDataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<HazzardDto>> Handle(Query request,
                    CancellationToken cancellationToken)
            {
                var hazzards = await _context.Hazzards.Where(h => h.JobNumberId == null).OrderBy(h => h.Situation).ToListAsync();

                var hazzardsToReturn = _mapper.Map<List<Hazzard>,List<HazzardDto>>(hazzards);

                return hazzardsToReturn;
             }
        }        
    }
}