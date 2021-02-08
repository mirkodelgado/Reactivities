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
    public class SafetyUser
    {
        public class Query : IRequest<List<UserDto>> { }

        public class Handler : IRequestHandler<Query, List<UserDto>>
        {
            private readonly SftyDataContext _context;
            private readonly IMapper _mapper;
            public Handler(SftyDataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<UserDto>> Handle(Query request,
                    CancellationToken cancellationToken)
            {
                int sslId = 1310;   // Site Safety Leader Group ID

                var allActiveUsers = from au in _context.AuthUsers
                                     join aug in _context.AuthUserGroups
                                     on au.Id equals aug.UserId
                                     where au.IsActive
                                     select new User(au.Id, au.Firstname + " " + au.Lastname, aug.GroupId, false);

                var allUsers = await allActiveUsers.ToListAsync();

                List<User> users = new List<User>();

                foreach(User user in allUsers) {

                    if (!users.Exists(x => x.Id == user.Id))
                    {
                        if (user.GroupId == sslId)
                            user.IsSSL = true;

                        users.Add(user);       
                    }
                    else
                    {
                        if (user.GroupId == sslId)
                        {
                            users.Where(x => x.Id == user.Id).SetProperty(x => x.IsSSL = true);
                            users.Where(x => x.Id == user.Id).SetProperty(x => x.GroupId = sslId);
                        }
                    }
                }

                var usersToReturn = _mapper.Map<List<User>,List<UserDto>>(users);

                return usersToReturn;
             }
        }    
    }

    public static class Extensions
    {
        public static IEnumerable<T> SetProperty<T>(this IEnumerable<T> list, Action<T> action)
        {
            foreach (var item in list)
            {
                action.Invoke(item);
            }
            return list;
        }
    }
}