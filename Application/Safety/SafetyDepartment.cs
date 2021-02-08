using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Safety
{
    public class SafetyDepartment
    {
        public class Query : IRequest<List<DepartmentDto>> { }

        public class Handler : IRequestHandler<Query, List<DepartmentDto>>
        {
            private readonly SftyDataContext _context;
            private readonly IMapper _mapper;
            public Handler(SftyDataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<DepartmentDto>> Handle(Query request,
                    CancellationToken cancellationToken)
            {
                var departments = await _context.Departments.Include(d => d.SafetyCoordinator).ToListAsync();

                var departmentsToReturn = _mapper.Map<List<Department>,List<DepartmentDto>>(departments);

                return departmentsToReturn;
             }
        }        
    }
}