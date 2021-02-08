using AutoMapper;

using Domain;
using Domain.Safety;

using Application.BstProjects;
using Application.Safety;

namespace Application.Employees
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AdpManager, ManagerDto>();

            CreateMap<ProjectList, ProjectDto>();

            CreateMap<Department, DepartmentDto>();

            CreateMap<User, UserDto>();

            CreateMap<Hazzard, HazzardDto>();
        }
    }
}