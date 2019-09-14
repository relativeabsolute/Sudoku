using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sudoku.SudokuModel
{
    public class SudokuGrid
    {
        private static Random random = new Random();

        public static int SIDE_LENGTH
        {
            get => 9;
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
            get; private set;
        }

        public SudokuGrid()
        {
            GridValues = GenerateInitialGrid();
            random = new Random();
        }

        private static bool _baseGridInitialized = false;
        private static SudokuGrid _baseGrid = null;

        private static SudokuGrid BaseGrid
        {
            get
            {
                if (!_baseGridInitialized)
                {
                    _baseGridInitialized = true;
                    _baseGrid = new SudokuGrid();

                    int[,] values = new int[,]
                    {
                        { 1,2,3,4,5,6,7,8,9 },
                        { 4,5,6,7,8,9,1,2,3 },
                        { 7,8,9,1,2,3,4,5,6 },
                        { 2,3,1,5,6,4,8,9,7 },
                        { 5,6,4,8,9,7,2,3,1 },
                        { 8,9,7,2,3,1,5,6,4 },
                        { 3,1,2,6,4,5,9,7,8 },
                        { 6,4,5,9,7,8,3,1,2 },
                        { 9,7,8,3,1,2,6,4,5 }
                    };

                    _baseGrid.GridValues = values;
                }
                return _baseGrid;
            }
        }

        /// <summary>
        /// Generates a puzzle according to the following algorithm:
        /// <list type="number">
        /// <item>Start with valid canonical Soduku solution
        /// <see cref="https://en.wikipedia.org/wiki/Mathematics_of_Sudoku#Automorphic_Sudokus"/></item>
        /// <item>Perform valid permutations of the solution.</item>
        /// <item>Remove a number of numbers from the grid</item>
        /// </list>
        /// 
        /// </summary>
        /// <returns>The Sudoku puzzle resulting from the above steps.</returns>
        public static SudokuGrid GeneratePuzzle()
        {
            int totalCells = SIDE_LENGTH * SIDE_LENGTH;
            SudokuGrid result = new SudokuGrid();
            Array.Copy(BaseGrid.GridValues, 0, result.GridValues, 0, totalCells);

            // Step 1: shuffle around elements in the grid
            var perm = Permutation<int>.GetRandomPermutation(Enumerable.Range(1, 9).ToHashSet());
            perm.SwapValues(result.GridValues);
            // TODO: add row and column swaps as well

            // Step 2: remove elements randomly
            // minimum number of filled in cells to remain solvable is 17
            // maximum number of filled in cells to be a meaningful puzzle is 40
            // TODO: minRemove and maxRemove depend on the number of cells in the grid
            const int minKeep = 17;
            const int maxKeep = 40;

            foreach (int index in Enumerable.Range(0, totalCells)
                .OrderBy(item => random.Next()).Skip(random.Next(minKeep, maxKeep + 1)))
            {
                result.GridValues[index / SIDE_LENGTH, index % SIDE_LENGTH] = 0;
            }

            return result;
        }
    }
}
