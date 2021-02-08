using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Employees;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class EmployeesController : ControllerBase
    {
       private readonly IMediator _mediator;
        public EmployeesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> List(int? limit, int? offset)
        {
            var employees = await _mediator.Send(new EmpList.Query(limit, offset));
            var locations = await _mediator.Send(new EmpLocation.Query());
            var employeeTypes = await _mediator.Send(new EmpType.Query());
            var disciplines = await _mediator.Send(new EmpDiscipline.Query());
            var sF330Disciplines = await _mediator.Send(new EmpSf330Discipline.Query());
            var billingTitles = await _mediator.Send(new EmpBillingTitle.Query());
            var designations = await _mediator.Send(new EmpDesignation.Query());
            var managersToReturn = await _mediator.Send(new EmpManager.Query());

            return Ok(new 
            {
                //offices,
                employeeTypes,
                disciplines,
                sF330Disciplines,
                billingTitles,
                designations,
                managersToReturn,
                employees,
                locations
            });
        }

        //public async Task<ActionResult<List<Employee>>> List()
        //{
        //    return await _mediator.Send(new EmployeeList.Query());
        //}

        [HttpGet("newEmployeeInfo")]
        public async Task<IActionResult> NewEmployeeInfo()
        {
            var locations = await _mediator.Send(new EmpLocation.Query());
            var employeeTypes = await _mediator.Send(new EmpType.Query());
            var disciplines = await _mediator.Send(new EmpDiscipline.Query());
            var sF330Disciplines = await _mediator.Send(new EmpSf330Discipline.Query());
            var billingTitles = await _mediator.Send(new EmpBillingTitle.Query());
            var designations = await _mediator.Send(new EmpDesignation.Query());
            var managersToReturn = await _mediator.Send(new EmpManager.Query());

            return Ok(new 
            {
                //offices,
                employeeTypes,
                disciplines,
                sF330Disciplines,
                billingTitles,
                designations,
                managersToReturn,
                locations
            });
        }

        [HttpGet("nextEmployeeNumber")]
        public async Task<IActionResult> NextEmployeeNumber()
        {
            var employeeNumber = await _mediator.Send(new EmpNumber.Query());

            return Ok(employeeNumber);
        }

        [HttpGet("{id}")]
        //public async Task<ActionResult<Employee>> Details(string id)
        public async Task<ActionResult> Details(string id)
        {
            //return await _mediator.Send(new EmpDetails.Query{Number = id});


            var employee = await _mediator.Send(new EmpDetails.Query{Number = id});
            var locations = await _mediator.Send(new EmpLocation.Query());
            var employeeTypes = await _mediator.Send(new EmpType.Query());
            var disciplines = await _mediator.Send(new EmpDiscipline.Query());
            var sF330Disciplines = await _mediator.Send(new EmpSf330Discipline.Query());
            var billingTitles = await _mediator.Send(new EmpBillingTitle.Query());
            var designations = await _mediator.Send(new EmpDesignation.Query());
            var managersToReturn = await _mediator.Send(new EmpManager.Query());

            return Ok(new 
            {
                employee,
                employeeTypes,
                disciplines,
                sF330Disciplines,
                billingTitles,
                designations,
                managersToReturn,
                locations
            });



        }
        
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(EmpCreate.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(string id, EmpEdit.Command command)
        {
            command.Number = id;

            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await _mediator.Send(new EmpDelete.Command {Number = id});
        }
    }
}