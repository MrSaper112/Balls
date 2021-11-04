import {
  co_ordinates,
  numberOfWalls,
  planeSize,
  colorBalls,
  pid,
  nextThree,
  numberBallsGenerated,
  start_End,
} from "./comps/const";
import { AStar } from "./comps/AstarFind";
import { SingleBall } from "./comps/SingleBall";

export class PlaneManager {
  private plane: HTMLDivElement;
  public listOfDivs: Array<Array<HTMLDivElement>>;
  public listOfBalls: Array<Array<SingleBall>>;
  public cords: start_End;
  private nextThree: Array<string>;
  private AStar: AStar;
  public blockPrev: boolean;
  constructor(plane: HTMLDivElement) {
    this.plane = plane;
    this.listOfDivs = new Array(planeSize);
    this.listOfBalls = new Array(planeSize);
    this.cords;
    this.nextThree = [];
    this.blockPrev = false;
  }
  randomPoint() {
    return Math.floor(Math.random() * planeSize);
  }
  generateBall(color?: Array<string>) {
    let point: co_ordinates;
    let createdColor: string;
    if (color === undefined) {
      createdColor = colorBalls[Math.floor(Math.random() * colorBalls.length)];
    } else {
      createdColor = this.nextThree.shift();
    }
    let find: any;
    do {
      point = { x: this.randomPoint(), y: this.randomPoint() };
      find = pid(this.generateListOfPositionBalls(), point.x, point.y);
      if (
        [...this.listOfBalls].flat().filter((x) => x != null).length ===
        planeSize ** 2
      ) {
        this.blockPrev = true;
        break;
      }
    } while (find.length > 0);
    this.listOfBalls[point.y][point.x] = new SingleBall(createdColor, point);
  }
  generatePlane() {
    //Generate Plane!
    for (let y = 0; y < planeSize; y++) {
      this.listOfDivs[y] = new Array(planeSize).fill(null);
      this.listOfBalls[y] = new Array(planeSize).fill(null);
      for (let x = 0; x < planeSize; x++) {
        // this.listOfBalls[y][x] = null;
        let div: HTMLDivElement = document.createElement("div");
        this.listOfDivs[y][x] = div;
        this.plane.appendChild(div);
      }
    }

    this.nextThree = Array.from(
      { length: numberBallsGenerated },
      () => colorBalls[Math.floor(Math.random() * colorBalls.length)]
    );

    this.generateAndAppend3Balls();
  }
  generateAndAppend3Balls() {
    let x = new Array(numberBallsGenerated).fill(0).forEach(() => {
      this.generateBall(this.nextThree);
    });

    this.listOfBalls.forEach((item) => {
      item.forEach((item2) => {
        if (
          item2 != null &&
          this.listOfDivs[item2.position.y][item2.position.x].children
            .length === 0
        )
          this.listOfDivs[item2.position.y][item2.position.x].appendChild(
            item2.div
          );
      });
    });
    this.nextThree = Array.from(
      { length: numberBallsGenerated },
      () => colorBalls[Math.floor(Math.random() * colorBalls.length)]
    );
    nextThree.innerHTML = "";
    this.nextThree.forEach((color) => {
      let x = new SingleBall(color);
      nextThree.appendChild(x.div);
    });
    // if (fun != undefined) fun();
  }
  containsObject(obj: any, list: any) {
    return list.map((i: any) => {
      return JSON.stringify(i) === JSON.stringify(obj);
    });
  }
  generateListOfPositionBalls() {
    let listOfPoints: Array<co_ordinates> = [];
    this.listOfBalls.forEach((l1) => {
      l1.forEach((l2) => {
        if (l2 != null) listOfPoints.push(l2.position);
      });
    });
    return listOfPoints;
  }
}
