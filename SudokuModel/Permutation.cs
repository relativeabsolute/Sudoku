using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sudoku.SudokuModel
{
    /// <summary>
    /// A permutation represents a mapping of elements such that each occurrence of a certain
    /// element value in the original collection will be replaced by a specific element, and vice versa.
    /// </summary>
    public class Permutation<TKey>
    {
        private static readonly Random rand = new Random();
        private Dictionary<TKey, TKey> forwardMapping = new Dictionary<TKey, TKey>();
        private Dictionary<TKey, TKey> backwardMapping = new Dictionary<TKey, TKey>();

        public void Add(TKey first, TKey second)
        {
            if (forwardMapping.ContainsKey(first) || backwardMapping.ContainsKey(second))
            {
                throw new ArgumentException("First or element already present.");
            }

            forwardMapping.Add(first, second);
            backwardMapping.Add(second, first);
        }

        public int Count
        {
            get => forwardMapping.Count;
        }

        public TKey this[TKey key]
        {
            get {
                return forwardMapping[key];                
            }
        }

        public static Permutation<TKey> GetRandomPermutation(HashSet<TKey> elements)
        {
            Permutation<TKey> result = new Permutation<TKey>();
            var shuffled = elements.OrderBy(item => rand.Next()).ToArray();
            for (int i = 0; i < shuffled.Length - 1; i++)
            {
                result.Add(shuffled[i], shuffled[i + 1]);
            }
            result.Add(shuffled[shuffled.Length - 1], shuffled[0]);
            return result;
        }

        public bool IsDimensionConforming<T>(T[,] inputArray, int dimension)
        {
            int dimMin = inputArray.GetLowerBound(dimension);
            int dimMax = inputArray.GetUpperBound(dimension);
            int dimLen = dimMax - dimMin + 1;

            return Count == dimLen;
        }


        public void SwapValues(TKey[,] inputArray)
        {
            if (!IsDimensionConforming(inputArray, 0) ||
                !IsDimensionConforming(inputArray, 1))
            {
                throw new ArgumentOutOfRangeException("Permutation length " +
                    "must match row length and column length");
            }

            for (int row = inputArray.GetLowerBound(0); row <= inputArray.GetUpperBound(0); row++)
            {
                for (int col = inputArray.GetLowerBound(1); col <= inputArray.GetUpperBound(1); col++)
                {
                    inputArray[row, col] = this[inputArray[row, col]];
                }
            }
        }

    }
}
