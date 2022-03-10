function maze(matrix) {

  const visited = [];
  let found = false;
  for(let i = 0; i < matrix.length; i++) {
      let row = [];
      for(let j = 0; j < matrix[0].length; j++) {
          row.push(0);
      }
      visited.push(row);
  }
  
  function move(row, col) {
      visited[row][col] = 1;
      if (row === matrix.length - 1 && col === matrix[row].length - 1) {
          console.log(row, col);
          found = true;
          return;
      }
      if (found) return;
      if (col < matrix[row].length-1 && matrix[row][col+1] === 1 && !visited[row][col+1]) move(row, col + 1);
      if (row < matrix.length-1 && matrix[row+1][col] === 1 && !visited[row+1][col]) move(row+1, col);
      if (col > 0 && matrix[row][col-1] === 1  && !visited[row][col-1]) move(row, col-1);
      if (row > 0 && matrix[row-1][col] === 1 && !visited[row-1][col]) move(row-1, col);
      
      if (found) {
          console.log(row, col);
      }
  }

  print(matrix);
  move(0, 0);
  if (found) {
      console.log('Maze solved.')
  } else {
      console.log('Maze not solved.')
  }
}

function print(matrix) {
  for(let i = 0; i < matrix.length; i++) {
      console.log(matrix[i])
  }
}

// const dimension = Math.floor(Math.random() * (10 - 5 + 1) + 5)

function createMatrix(dimension) {
    const result = [];
    for(let i = 0; i < dimension; i++) {
        const row = [];
        for(let j = 0; j < dimension; j++) {
            const number = Math.round(Math.random() + 0.2);
            row.push(number);
        }
        result.push(row);
    }
    return result;
}

const matrix = createMatrix(dimension);
maze(matrix);
