import { planeSize, co_ordinates, pid } from "./const";

let grid: Array<Array<Spot>> = new Array(planeSize);

export class AStar {
  private closeList: Array<Spot>;
  private openList: Array<Spot>;
  private start: Spot;
  private end: Spot;
  private endCord: co_ordinates;
  private divs: Array<Array<HTMLDivElement>>;
  public findedPath: Array<Spot> = [];
  private obstacles: Array<co_ordinates>;
  public solution: boolean;
  public completed: boolean;
  constructor(
    divs: Array<Array<HTMLDivElement>>,
    start: co_ordinates,
    end: co_ordinates,
    obstacles: Array<co_ordinates>
  ) {
    grid = new Array(planeSize);
    this.divs = divs;
    this.obstacles = obstacles;
    this.endCord = end;
    this.solution = false;
    this.completed = false;

    this.init();

    this.start = grid[start.y][start.x];
    this.end = grid[end.y][end.x];

    this.closeList = [];
    this.openList = [this.start];
    this.findedPath = null;

    if (this.start != null && this.end != null) this.find();
  }
  init() {
    for (let y = 0; y < grid.length; y++) {
      grid[y] = new Array(planeSize);
      for (let x = 0; x < grid.length; x++) {
        grid[y][x] = new Spot(
          { x: x, y: y },
          { x: this.endCord.x, y: this.endCord.y }
        );
      }
    }

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid.length; x++) {
        grid[y][x].lookAround();
      }
    }
  }
  find() {
    //All Magic Happend Here
    while (this.openList.length > 0) {
      let lowestIndex = 0;
      //Find Lowest F Index (Best Node)
      this.openList.map((i: Spot, index: number) => {
        if (i.f < this.openList[lowestIndex].f) {
          lowestIndex = index;
        }
      });
      let currentNode = this.openList[lowestIndex];

      //Check if node isn't already end
      if (currentNode === this.end) {
        this.solution = true;
        this.completed = true;
        break;
      }

      this.openList = this.removeMe(this.openList, currentNode);
      this.closeList.push(currentNode);
      currentNode.neighbors.forEach((neighbor) => {
        let look = pid(this.obstacles, neighbor.place.x, neighbor.place.y);

        if (!this.closeList.includes(neighbor) && look.length === 0) {
          let G = currentNode.g + 1;
          if (this.openList.includes(neighbor)) {
            if (neighbor.g > G) neighbor.g = G;
          } else {
            neighbor.g = G;
            this.openList.push(neighbor);
          }

          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = currentNode;
          // this.divs[neighbor.place.y][neighbor.place.x].innerText =
          // neighbor.f.toString();
        }
      });

      this.findedPath = [];
      var t = currentNode;
      this.findedPath.push(t);
      while (t.previous) {
        this.findedPath.push(t.previous);
        t = t.previous;
      }
    }
    if (this.solution) {
      this.findedPath.push(this.end);
      this.findedPath.forEach((item) => {
        this.divs[item.place.y][item.place.x].style.backgroundColor = "red";
      });
    } else {
      console.log("No Path");
    }
    this.completed = true;
  }
  removeMe(array: Array<Spot>, el: Spot) {
    array.forEach((i: any, index: number) => {
      if (i === el) {
        array.splice(index, 1);
      }
    });
    return array;
  }
}
class Spot {
  public readonly place: co_ordinates;
  public readonly end?: co_ordinates;
  public f: number;
  public g: number;
  public h: number;
  public neighbors: Array<Spot>;
  public previous: Spot;
  public wall: boolean;
  constructor(place: co_ordinates, end?: co_ordinates) {
    this.place = place;
    this.end = end;
    this.f = 0;
    this.g = 0;
    this.h =
      Math.abs(this.end.x - this.place.x) + Math.abs(this.end.y - this.place.y);
    this.previous = undefined;
    this.neighbors = [];
    this.wall = false;
  }
  lookAround() {
    if (this.place.x - 1 >= 0) {
      this.neighbors.push(grid[this.place.y][this.place.x - 1]);
    }
    if (this.place.x + 1 <= planeSize - 1) {
      this.neighbors.push(grid[this.place.y][this.place.x + 1]);
    }
    if (this.place.y - 1 >= 0) {
      this.neighbors.push(grid[this.place.y - 1][this.place.x]);
    }
    if (this.place.y + 1 <= planeSize - 1) {
      this.neighbors.push(grid[this.place.y + 1][this.place.x]);
    }
  }
}
