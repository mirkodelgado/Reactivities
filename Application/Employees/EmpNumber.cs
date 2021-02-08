using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Employees
{
    public class EmpNumber
    {
                public class Query : IRequest<String> { }
        
                public class Handler : IRequestHandler<Query, String>
                {
                    private readonly NhDataContext _context;
                    private readonly IMapper _mapper;
                    public Handler(NhDataContext context, IMapper mapper)
                    {
                        _mapper = mapper;
                        _context = context;
                    }
        
                    public async Task<String> Handle(Query request,
                            CancellationToken cancellationToken)
                    {
                        var nextNumber = new NextEmployeeNumber();

                        await _context.NextEmployeeNumbers.AddAsync(nextNumber);

                        await _context.SaveChangesAsync();

                        return nextNumber.Id.ToString();
                    }
                }
        
    }
}