using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{

    [ApiController]
    public class QuestionController : ControllerBase
    {
        [HttpGet]
        [Route("questions/count")]
        public int M1()
        {
            HajosTesztContext context = new HajosTesztContext();
            int kérdésekszáma = context.Questions.Count();
            return kérdésekszáma;
        }

        [HttpGet]
        [Route("questions/{sorszam}")]
        public ActionResult M2(int sorszam)
        {
            HajosTesztContext context = new HajosTesztContext();
            var kérdés = (from x in context.Questions
                          where x.QuestionID == sorszam
                          select x).FirstOrDefault();
            if (kérdés == null) return BadRequest("Nincs ilyen kérdés!");
            return new JsonResult(kérdés);
        }
    }
}
