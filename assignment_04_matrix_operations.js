// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function readMatrix(rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        let row;
        while (true) {
            row = readlineSync.question(`Enter row ${i + 1}: `).trim().split(/\s+/).map(Number);
            if (row.length === cols && row.every(n => !isNaN(n))) {
                break;
            }
            console.log(`Please enter exactly ${cols} numbers.`);
        }
        matrix.push(row);
    }
    return matrix;
}

function displayMatrix(matrix, label) {
    console.log(`\n${label}:`);
    for (let i = 0; i < matrix.length; i++) {
        let line = '';
        for (let j = 0; j < matrix[i].length; j++) {
            line += String(matrix[i][j]).padStart(5);
        }
        console.log(line);
    }
}

function transposeMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];
    for (let j = 0; j < cols; j++) {
        const newRow = [];
        for (let i = 0; i < rows; i++) {
            newRow.push(matrix[i][j]);
        }
        result.push(newRow);
    }
    return result;
}

function addMatrices(a, b) {
    const rows = a.length;
    const cols = a[0].length;
    const result = [];
    for (let i = 0; i < rows; i++) {
        const newRow = [];
        for (let j = 0; j < cols; j++) {
            newRow.push(a[i][j] + b[i][j]);
        }
        result.push(newRow);
    }
    return result;
}

function multiplyMatrices(a, b, m, n, p) {
    const result = [];
    for (let i = 0; i < m; i++) {
        const newRow = [];
        for (let j = 0; j < p; j++) {
            let sum = 0;
            for (let k = 0; k < n; k++) {
                sum += a[i][k] * b[k][j];
            }
            newRow.push(sum);
        }
        result.push(newRow);
    }
    return result;
}

function doTranspose() {
    const rows = readlineSync.questionInt("Enter number of rows: ");
    const cols = readlineSync.questionInt("Enter number of columns: ");

    console.log("Enter the matrix:");
    const matrix = readMatrix(rows, cols);

    displayMatrix(matrix, "Original Matrix");
    const result = transposeMatrix(matrix);
    displayMatrix(result, "Transposed Matrix");
}

function doAddition() {
    const rows = readlineSync.questionInt("Enter number of rows: ");
    const cols = readlineSync.questionInt("Enter number of columns: ");

    console.log("Enter Matrix A:");
    const a = readMatrix(rows, cols);
    console.log("Enter Matrix B (same size):");
    const b = readMatrix(rows, cols);

    displayMatrix(a, "Matrix A");
    displayMatrix(b, "Matrix B");

    const result = addMatrices(a, b);
    displayMatrix(result, "Sum (A + B)");
}

function doMultiplication() {
    console.log("Matrix A dimensions:");
    const m = readlineSync.questionInt("Enter number of rows (M): ");
    const n = readlineSync.questionInt("Enter number of columns (N): ");

    console.log("Enter Matrix A:");
    const a = readMatrix(m, n);

    console.log("\nMatrix B dimensions:");
    const n2 = readlineSync.questionInt(`Enter number of rows (must equal ${n}): `);
    const p = readlineSync.questionInt("Enter number of columns (P): ");

    if (n2 !== n) {
        console.log(`Error: Columns of A (${n}) must equal rows of B (${n2}).`);
        return;
    }

    console.log("Enter Matrix B:");
    const b = readMatrix(n, p);

    displayMatrix(a, "Matrix A");
    displayMatrix(b, "Matrix B");

    const result = multiplyMatrices(a, b, m, n, p);
    displayMatrix(result, "Product (A x B)");
}

function main() {
    let choice;

    do {
        console.log("\n===== Matrix Operations Menu =====");
        console.log("1. Transpose a Matrix");
        console.log("2. Add Two Matrices");
        console.log("3. Multiply Two Matrices");
        console.log("4. Exit");
        choice = readlineSync.questionInt("Enter choice: ");

        if (choice === 1) {
            doTranspose();
        } else if (choice === 2) {
            doAddition();
        } else if (choice === 3) {
            doMultiplication();
        } else if (choice === 4) {
            console.log("Exiting program.");
        } else {
            console.log("Invalid choice. Please try again.");
        }
    } while (choice !== 4);
}

main();
