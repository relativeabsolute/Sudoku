using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sudoku
{
    public class SudokuGrid
    {
        private Random random;
        private List<List<List<int>>> possibilities;

        private List<List<List<int>>> GenerateInitialPossibilities()
        {
            var result = from row in Enumerable.Range(0, 9)
                         select (from col in Enumerable.Range(0, 9)
                                 select new List<int>(Enumerable.Range(1, 9))).ToList();

            return result.ToList();
        }

        private int[,] GenerateInitialGrid()
        {
            return new int[,]
            {
                { 0, 0, 0, 0, 0, 0, 0, 0, 0 },
                { 0, 0, 0, 0, 0, 0, 0, 0, 0 },
                { 0, 0, 0, 0, 0, 0, 0, 0, 0 },
                { 0, 0, 0, 0, 0, 0, 0, 0, 0 },
                { 0, 0, 0, 0, 0, 0, 0, 0, 0 },
                { 0, 0, 0, 0, 0, 0, 0, 0, 0 },
                { 0, 0, 0, 0, 0, 0, 0, 0, 0 },
                { 0, 0, 0, 0, 0, 0, 0, 0, 0 },
                { 0, 0, 0, 0, 0, 0, 0, 0, 0 }
            };
        }

        public int[,] GridValues
        {
            get;
        }

        public SudokuGrid()
        {
            GridValues = GenerateInitialGrid();
            possibilities = GenerateInitialPossibilities();
            random = new Random();
        }

        private void FillValue(int currentValue, Tuple<int,int> block)
        {
            var coordsInBlock = (from coord in GetAllAvailableCoordinates(currentValue)
                                where GetBlockCoord(coord).Equals(block)
                                select coord).ToList();
            if (coordsInBlock.Count > 0)
            {
                int index = random.Next(coordsInBlock.Count);
                Tuple<int, int> chosenCoord = coordsInBlock[index];
                GridValues[chosenCoord.Item1, chosenCoord.Item2] = currentValue;
                possibilities[chosenCoord.Item1][chosenCoord.Item2].Clear();
                for (int i = 0; i < 9; i++)
                {
                    if (i != chosenCoord.Item2)
                    {
                        possibilities[chosenCoord.Item1][i].Remove(currentValue);
                    }
                    if (i != chosenCoord.Item1)
                    {
                        possibilities[i][chosenCoord.Item2].Remove(currentValue);
                    }
                }
                foreach (var coord in coordsInBlock)
                {
                    possibilities[coord.Item1][coord.Item2].Remove(currentValue);
                }
            }
        }

        /// <summary>
        /// Calculate locations in the grid where the given value would be valid.
        /// </summary>
        /// <param name="currentValue">Value to fill the grid with.</param>
        private void FillValues(int currentValue)
        {
            if (currentValue < 1 || currentValue > 9)
            {
                throw new ArgumentOutOfRangeException("Value must be between 1 and 9 inclusive.");
            }

            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    Tuple<int, int> block = new Tuple<int, int>(i, j);
                    FillValue(currentValue, block);
                }
            }
        }

        private IEnumerable<Tuple<int, int>> GetAllAvailableCoordinates(int value)
        {
            return from row in Enumerable.Range(0, 9)
                   from col in (from col in Enumerable.Range(0, 9)
                                where possibilities[row][col].Contains(value)
                                select col)
                   select new Tuple<int, int>(row, col);
        }

        public static SudokuGrid GeneratePuzzle()
        {
            SudokuGrid result = new SudokuGrid();

            for (int i = 0; i < 9; i++)
            {
                int value = i + 1;
                result.FillValues(value);
            }

            return result;
        }

        /// <summary>
        /// Gets the block row and column the given cell belongs to.
        /// </summary>
        /// <param name="cellCoord">The cell to find the block coordinate of.</param>
        /// <returns>cell.row / 3, cell.col / 3</returns>
        public static Tuple<int,int> GetBlockCoord(Tuple<int,int> cellCoord)
        {
            return new Tuple<int, int>(cellCoord.Item1 / 3, cellCoord.Item2 / 3);
        }
    }
}
