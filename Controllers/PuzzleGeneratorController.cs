﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sudoku.SudokuModel;

namespace Sudoku.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PuzzleGeneratorController : Controller
    {
        [HttpGet("[action]")]
        public JsonResult Generate()
        {
            SudokuGrid grid = SudokuGrid.GeneratePuzzle();

            return Json(grid.GridValues);
        }
    }
}