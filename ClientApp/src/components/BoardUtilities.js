function gridValuesToArrayIndex(row, col) {
    return row * 9 + col;
}

function isInBounds(row, col) {
    return row >= 0 && row < 9 && col >= 0 && col < 9;
}

export { gridValuesToArrayIndex, isInBounds };