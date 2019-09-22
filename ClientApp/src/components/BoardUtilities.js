export const SIDE_LENGTH = 9;
export const BLOCK_LENGTH = 3;

export const CellStatus = {
    UNFILLED: 0,
    PROVIDED: 1,
    USERFILLED: 2
};

export function gridValuesToArrayIndex(cell) {
    return cell.row * SIDE_LENGTH + cell.col;
}

export function isInBounds(cell) {
    return cell.row >= 0 && cell.row < SIDE_LENGTH && cell.col >= 0 && cell.col < SIDE_LENGTH;
}

export function gridIndicesToBlockIndices(cell) {
    return {
        row: Math.floor(cell.row / BLOCK_LENGTH),
        col: Math.floor(cell.col / BLOCK_LENGTH)
    };
}

export function blocksMatch(first_cell, second_cell) {
    const first_block = gridIndicesToBlockIndices(first_cell);
    const second_block = gridIndicesToBlockIndices(second_cell);
    return cellsMatch(first_block, second_block);
}

export function cellsMatch(first_cell, second_cell) {
    return first_cell.row === second_cell.row && first_cell.col === second_cell.col;
}