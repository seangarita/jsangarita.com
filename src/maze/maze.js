const {Cell, constants} = require("./cell.js");

// Dictates how quickly the maze will be populated. The higher the number,
// the faster it will be populated, at the risk of reducing browser
// responsiveness.
const PopulationConstant = 15;

/**
 * Constructs a random maze-like structure which may have 0-any number of exits
 * depending on the chosen root.
 */
class Maze {
  constructor(width, height, center) {
    if (width < 3 || height < 3) throw new Error("Invalid Maze dimensions");

    this.width = width;
    this.height = height;
    this.center = center;
    this.data = this.createEmptyMaze();
  }

  /**
   * Creates an a maze filled with walls.
   */
  createEmptyMaze() {
    const data = [];

    for (let y = 0; y < this.height; y++) {
      const row = [];
      for (let x = 0; x < this.width; x++) {
        row.push(new Cell(this, constants.WALL, x, y));
      }
      data.push(row);
    }

    return data;
  }

  /**
   * Populates the maze with spaces using random traversal.
   */
  populateMaze() {
    return new Promise((resolve) => {
      const root = this.data[this.center.y][this.center.x];

      root.kind = constants.SPACE;
      const frontierCellSet = new Set();
      root.getFrontierCells().forEach((cell) => frontierCellSet.add(cell));

      this.populateRoutineWrapper(frontierCellSet, resolve);
    })
  }

  /**
   * A wrapper routine that helps the maze populate quicker.
   */
  populateRoutineWrapper(frontierCellSet, resolve) {
    if (frontierCellSet.size !== 0) {
      for (let i = 0; i < PopulationConstant; i++) {
        this.populateRoutine(frontierCellSet);
      }
      setTimeout(() => this.populateRoutineWrapper(frontierCellSet, resolve), 0);
    } else {
      resolve();
    }
  }

  /**
   * The actual maze population routine.
   */
  populateRoutine(frontierCellSet) {
    if (frontierCellSet.size !== 0) {
      const selectedFrontierCellIndex =
        Math.floor(Math.random() * frontierCellSet.size);
      const frontierCell =
        Array.from(frontierCellSet.values())[selectedFrontierCellIndex];

      const frontierNeighbors = frontierCell.getFrontierNeighbors();

      if (frontierNeighbors.length === 0) return;

      const selectedFrontierNeighborIndex =
        Math.floor(Math.random() * frontierNeighbors.length);
      const selectedFrontierNeighbor =
        frontierNeighbors[selectedFrontierNeighborIndex];
      const newPassageCell = frontierCell.cellBetween(selectedFrontierNeighbor);

      frontierCell.kind = constants.SPACE;
      newPassageCell.kind = constants.SPACE;

      frontierCell.getFrontierCells().forEach((cell) => {
        frontierCellSet.add(cell)
      });

      frontierCellSet.delete(frontierCell);
    }
  }

  /**
   * Draws the maze using a canvas context.
   */
  draw(context, width, height) {
    const xScale = width / this.width;
    const yScale = height / this.height;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (!this.data[y][x].drawn) {
          this.data[y][x].draw(context, xScale, yScale);
        }
      }
    }
  }

  /**
   * A crude string representation of the maze.
   */
  toString() {
    let str = "\n";
    for (let y = 0; y < this.height; y++) {
      let line = "";
      for (let x = 0; x < this.width; x++) {
        if (this.data[y][x].kind === constants.WALL) line += "█";
        else line += "░";
      }
      str += line + "\n";
    }
    return str;
  }
}

module.exports = Maze;
