
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;

using Application.Safety;
using Application.BstProjects;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class SafetyController : ControllerBase
    {
        private readonly IMediator _mediator;
        public SafetyController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]

        // public async Task<IActionResult> List()
        // {
        //     var checklists = await _mediator.Send(new SafetyChecklist.Query());

        //     return Ok(new 
        //     {
        //         checklists
        //     });
        // }

        public async Task<IActionResult> List()
        {
            var departments = await _mediator.Send(new SafetyDepartment.Query());
            var users = await _mediator.Send(new SafetyUser.Query());
            var hazzards = await _mediator.Send(new SafetyHazzard.Query());
            var projects = await _mediator.Send(new BstProject.Query());

            return Ok(new 
            {
                departments,
                users,
                hazzards,
                projects
            });
        }
    }
}