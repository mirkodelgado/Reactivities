using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Employees
{
    public class EmpManager
    {
        public class Query : IRequest<List<ManagerDto>> { }

        public class Handler : IRequestHandler<Query, List<ManagerDto>>
        {
            private readonly NhDataContext _context;
            private readonly IMapper _mapper;
            public Handler(NhDataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<ManagerDto>> Handle(Query request,
                    CancellationToken cancellationToken)
            {
                var managers = await _context.AdpManagers.OrderBy(m => m.ManagerName).ToListAsync();

                return _mapper.Map<List<AdpManager>,List<ManagerDto>>(managers);
            }
        }

    }
}