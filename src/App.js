import './App.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

function App() {
  const [dimension, setDimension] = useState(1)
  const [matrix, setMatrix] = useState([[1]]);
  const [resolved, setResolved] = useState(false)
  const [visitedGrid, setVisitedGrid] = useState(
    Array.from({length: dimension},()=> Array.from({length: dimension}, () => 0))
  );

  const createMatrix = () => {
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

  const findPath = () => {

    const move = (row, col) => {

      // visitedGrid[row][col] = 1;

      const updatedVisitedGrid = [...visitedGrid];
      updatedVisitedGrid[row][col] = 1;


      console.log("from MOVE", visitedGrid)
      console.log("from MOVE", dimension)
      if(row === dimension - 1 && col === dimension - 1) {
        console.log(row, col);
        setResolved(true);
        return;
      }
      if(resolved) return;

      if (col < matrix[row].length-1 && matrix[row][col+1] === 1 && !visitedGrid[row][col+1]) move(row, col + 1);
      if (row < matrix.length-1 && matrix[row+1][col] === 1 && !visitedGrid[row+1][col]) move(row+1, col);
      if (col > 0 && matrix[row][col-1] === 1  && !visitedGrid[row][col-1]) move(row, col-1);
      if (row > 0 && matrix[row-1][col] === 1 && !visitedGrid[row-1][col]) move(row-1, col);
    }

    move(0, 0)
    if(resolved) {
      alert("maze solved!")
      console.log("maze solved!")
    } else {
      alert("Has no solution, please reset.")
      console.log("not solved")
    }
  }
  const newMaze = () => {
    setDimension(Math.floor(Math.random() * (6 -  3 + 1) + 3));
  }
  
  useEffect(() => {
    console.log("from useEffect", dimension);
    setMatrix(createMatrix());
    setVisitedGrid(
      Array.from({length: dimension},()=> Array.from({length: dimension}, () => 0))
    );
    setResolved(false);
  }, [dimension])
  
  return (
    <div className="App">
      {
        console.log(visitedGrid)
      }
      {
        console.log(matrix)
      }
      <Box sx={{
        flexGrow: 1,
        width: dimension * (41),
        height: dimension * (39),
        p: 1,
        borderRadius: 2,
        marginBottom: 2,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main'
        }
      }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
        >
          {
            matrix.map((row, ind1) => (
              <Grid
                key = {ind1}
                container
                justifyContent="center"
                alignItems="center"
              >
                {row.map((col, ind2) => (
                  <Grid
                    key={ind1 + ind2}
                    item
                    style={{width: '35px'}}
                  >
                    {console.log(visitedGrid[ind1][ind2])}
                    <Paper
                      style={{
                        backgroundColor: (resolved && visitedGrid[ind1][ind2] === 1 ? "#008000" : "#fff"),
                        padding: '9px',
                        textAlign: 'center',
                        color: 'black',
                      }}
                    >
                      {col}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ))
          }
        </Grid>
      </Box>
      <Button onClick={newMaze} variant="contained" color="primary">Reset Matrix</Button>
      <Button onClick={findPath} variant="contained" color="primary">Solve</Button>
    </div>
  );
}

export default App;
