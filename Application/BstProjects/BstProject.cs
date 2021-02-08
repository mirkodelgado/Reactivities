using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.BstProjects
{
    public class BstProject
    {
        public class Query : IRequest<List<ProjectDto>> { }

        public class Handler : IRequestHandler<Query, List<ProjectDto>>
        {
            private readonly BstDataContext _context;
            private readonly IMapper _mapper;
            public Handler(BstDataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<ProjectDto>> Handle(Query request,
                    CancellationToken cancellationToken)
            {
                var projects = await _context.ProjectList.Where(pt => pt.ProjectStatus.Equals("0")).ToListAsync();

                var projectsToReturn = _mapper.Map<List<ProjectList>,List<ProjectDto>>(projects);

                return projectsToReturn;
             }
        }        
    }
}