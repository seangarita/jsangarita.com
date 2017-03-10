const StyleConstants = require("../styles/styleConstants.js");

const constants = {
  // Cell kinds.
  WALL: "WALL",
  SPACE: "SPACE",
  BEDROCK: "BEDROCK",

  // Directions.
  LEFT: "LEFT",
  TOP: "TOP",
  RIGHT: "RIGHT",
  BOTTOM: "BOTTOM",
};

constants.DIRECTIONS = [
  constants.LEFT,
  constants.TOP,
  constants.RIGHT,
  constants.BOTTOM
];

Object.freeze(constants);

/**
 * A Cell in a maze which has a kind and a coordinate.
 */
class Cell {
  /**
   * Constructs a Cell with a maze, a type (wall, space, or bedrock),
   * a coordinate (x, y), and a color.
   */
  constructor(maze, kind, x, y) {
    if (maze === undefined || kind === undefined || x === undefined ||
      y === undefined) {
      throw new Error("Missing parameter for Cell constructor");
    }

    this.maze = maze;
    this.kind = kind;
    this.x = x;
    this.y = y;

    // Determine cell color.
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    // These numbers come from the RGB equivilants of the colors in
    // SharedStyles.
    const R = 204 - Math.floor((this.x / this.maze.width) * 204);
    const G = 24 + Math.floor((this.x / this.maze.width) * 134);
    const B = Math.floor((this.x / this.maze.width) * 255);

    this.color = rgbToHex(R, G, B);
  }

  /**
   * Returns neighboring cells which are of distance 2 and of kind WALL.
   */
  getFrontierCells() {
    const perimiterCells = constants.DIRECTIONS.map((direction) => {
      return this.getPerimiterCell(direction, 2)
    });

    return perimiterCells.filter((cell) => cell.kind === constants.WALL);
  }

  /**
   * Returns neighboring cells which are of distance 2 and of kind SPACE.
   */
  getFrontierNeighbors() {
    const perimiterCells = constants.DIRECTIONS.map((direction) => {
      return this.getPerimiterCell(direction, 2)
    });

    return perimiterCells.filter((cell) => cell.kind === constants.SPACE);
  }

  /**
   * Returns cell in a given direction with a given distance.
   */
  getPerimiterCell(direction, distance) {
    const bedrockCell = new Cell(this.maze, constants.BEDROCK, null, null);

    switch (direction) {
      case constants.LEFT:
        if (this.x < distance) {
          return bedrockCell;
        } else {
          return this.maze.data[this.y][this.x - distance];
        }
      case constants.TOP:
        if (this.y > this.maze.height - 1 - distance) {
          return bedrockCell;
        } else {
          return this.maze.data[this.y + distance][this.x];
        }
      case constants.RIGHT:
        if (this.x > this.maze.width - 1 - distance) {
          return bedrockCell;
        } else {
          return this.maze.data[this.y][this.x + distance];
        }
      case constants.BOTTOM:
        if (this.y < distance) {
          return bedrockCell;
        } else {
          return this.maze.data[this.y - distance][this.x];
        }
      default:
        throw new Error("Invalid direction for getPerimiterCell()");
    }
  }

  /**
   * Returns the cell between two cell which are distance 2 appart and in the
   * same line.
   */
  cellBetween(otherCell) {
    const cellsInDifferentMaze = this.maze !== otherCell.maze;
    const cellsNotInLine = (this.x !== otherCell.x && this.y !== otherCell.y);
    const eitherCellIsBedrock = (
      this.kind === constants.BEDROCK || otherCell.kind === constants.BEDROCK
    )

    if (eitherCellIsBedrock || cellsInDifferentMaze || cellsNotInLine) {
      throw new Error("Invalid cells: ", this, otherCell);
    }

    let x, y;
    if (this.x === otherCell.x) {
      x = this.x;
      y = (this.y + otherCell.y) / 2;
    } else {
      x = (this.x + otherCell.x) /2;
      y = this.y;
    }

    if (x !== Math.floor(x) || y !== Math.floor(y)) {
      throw new Error("Invalid cells: ", this, otherCell);
    }

    return this.maze.data[y][x];
  }

  /**
   * Draws the cell using a canvas context.
   */
  draw(context, xScale, yScale) {
    if (this.kind === constants.SPACE) {
      context.fillStyle = this.color;
      context.fillRect(this.x * xScale, this.y * yScale, xScale, yScale);
      this.drawn = true;
    }
  }
}

module.exports = {Cell, constants};
