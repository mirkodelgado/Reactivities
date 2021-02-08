using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Employees
{
    public class EmpDelete
    {
        public class Command : IRequest
        {
            public string Number { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly NhDataContext _context;
            public Handler(NhDataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var employee = await _context.Employees.FindAsync(request.Number);

                if (employee == null)
                    throw new Exception("Could Not Find Employee");

                _context.Remove(employee);

                // handler login 
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }

    }
}