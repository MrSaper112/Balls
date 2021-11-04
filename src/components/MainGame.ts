import { PlaneManager } from "./GeneratePlane";
import { co_ordinates, pid, plane, planeSize } from "./comps/const";
import { AStar } from "./comps/AStarFind";
import { SingleBall } from "./comps/SingleBall";
import { PointManager } from "./comps/PointManager";
import { Decorators } from "./comps/Decorator";

/** Main class where magic is happend!*/
export class MainGame extends PlaneManager {
  /** Construct
   * @params aStar PathFinding algorythm
   */
  private aStar: AStar;
  /**@params Ball Selected each click */
  private selected: SingleBall;
  /** @params Check if is anything selected */
  private boolSelect: boolean;
  /** @params Point Counter, reader and calulator for them */
  private pointManager: PointManager;
  constructor() {
    super(plane);
    this.selected = null;
    this.boolSelect = false;
    this.initialize();
    // this.render();
  }
  /**
   * First Invoke, load the data
   */
  initialize() {
    this.generatePlane();
    this.addEventListenerToBalls();
    this.operateOnDivsWeb();
    this.pointManager = new PointManager(this.listOfBalls);
  }
  /**
   * This function is called when the new ball are generated and add them click listener
   */
  async addEventListenerToBalls() {
    this.listOfBalls.flat().forEach((ball) => {
      if (ball !== undefined && ball && !ball.listenerExist) {
        ball.div.addEventListener("click", (e) => {
          //1. Click on the same ball
          //2. Click on the other ball but one was selected
          //3. Nothing are selected
          console.log(e.target, ball);
          console.warn("", "y: " + ball.position.y, "x: " + ball.position.x);
          this.listOfBalls.map((ball) => {
            console.warn(ball);
          });
          console.log(this.selected, this.boolSelect);
          if (
            this.selected != null &&
            this.boolSelect &&
            this.selected.position.x === ball.position.x &&
            this.selected.position.y === ball.position.y
          ) {
            this.selected = null;
            this.boolSelect = false;
            ball.makeMeSmall();
          } else if (
            this.selected != null &&
            this.boolSelect &&
            (this.selected.position.x !== ball.position.x ||
              this.selected.position.y !== ball.position.y)
          ) {
            this.selected.makeMeSmall();
            this.selected = ball;
            this.boolSelect = true;
            ball.makeMeBig();
          } else if (!this.boolSelect || this.selected == null) {
            console.log(ball, ball.position.y, ball.position.x);
            this.selected = ball;
            this.boolSelect = true;
            ball.makeMeBig();
          }
        });
        ball.listenerExist = true;
      }
    });
  }
  /**
   *
   * @param cord Remove balls on specified coordinates
   */
  removeBalls(cord: co_ordinates) {
    console.log(cord.y, this.listOfBalls);
    this.listOfBalls[cord.y][cord.x].removeMe();
    this.listOfBalls[cord.y][cord.x] = null;
  }
  /**
   * This function allow player to click on each block and move mouse around them, with generated path!
   */
  async operateOnDivsWeb() {
    for (let y = 0; y < planeSize; y++) {
      for (let x = 0; x < planeSize; x++) {
        let div = this.listOfDivs[y][x];
        /**
         * Mouse Enter function call AStart algorithm to find path between start and end points
         */
        div.addEventListener("mouseenter", () => {
          if (this.selected && this.boolSelect) {
            this.clearOutColors();
            this.aStar = new AStar(
              this.listOfDivs,
              this.selected.position,
              { x: x, y: y },
              this.generateListOfPositionBalls()
            );
          }
        });
        /**
         * Accept new position to ball which we selected before and check if is not the endgame
         */
        div.addEventListener("click", () => {
          console.log(
            [...this.listOfBalls].flat().filter((x) => x != null).length
          );
          if (!this.pointManager.blockPrev && !this.blockPrev) {
            let first: boolean = false;
            if (this.aStar != undefined) {
              first = true;
            }
            if (
              this.selected &&
              this.boolSelect &&
              (this.aStar.solution || !first)
            ) {
              let find = pid(this.generateListOfPositionBalls(), x, y);
              if (find.length == 0) {
                this.clearOutColorsAfter();
                // console.log("MACIEKKKKKKK", { y: y, x: x });
                this.findAndSlice({ x: x, y: y });
                this.pointManager.updateBalls(this.listOfBalls);
                this.pointManager.lookup();
                if (!this.pointManager.compacted) {
                  if (!this.blockPrev && !this.pointManager.blockPrev) {
                    this.generateAndAppend3Balls();
                    this.addEventListenerToBalls();
                    this.pointManager.lookup();
                  } else {
                    console.error("GRA SKONCZONA");
                    alert(
                      "Gra Skończona, Twój wynik: " + this.pointManager.points
                    );
                  }
                } else {
                  console.log("Next Turn");
                  this.pointManager.compacted = false;
                  let find = () => {
                    let x = false;
                    this.listOfBalls.map((b) => {
                      b.forEach((c) => {
                        if (c != null) x = true;
                      });
                    });
                    return x;
                  };
                  if (
                    [...this.listOfBalls].flat().filter((x) => x != null)
                      .length ==
                    planeSize ** 2
                  ) {
                    this.blockPrev = true;
                    console.error("GRA SKONCZONA");
                    alert(
                      "Gra Skończona, Twój wynik: " + this.pointManager.points
                    );
                  }
                  if (
                    !find &&
                    !this.blockPrev &&
                    !this.pointManager.blockPrev
                  ) {
                    this.generateAndAppend3Balls();
                    this.addEventListenerToBalls();
                  }
                }
              }
            }
          }
        });
      }
    }
  }
  /**
   *
   * @param nw Change cordinates of old ball to new position and slice them from last position
   */
  async findAndSlice(nw: co_ordinates) {
    for (let y = 0; y < planeSize; y++) {
      let copy = this.listOfBalls[y];
      for (let x = 0; x < planeSize; x++) {
        while (!this.aStar.completed) {
          console.log("Waiting For Result");
        }
        if (!(nw.x === x && nw.y === y) && copy[x] !== undefined) {
          this.listOfBalls[y][x] = copy[x];
        } else if (nw.x === x && nw.y === y && this.aStar.solution) {
          console.log(this.listOfBalls);
          let sliced =
            this.listOfBalls[this.selected.position.y][
              this.selected.position.x
            ];
          this.listOfBalls[this.selected.position.y][this.selected.position.x] =
            null;
          this.listOfBalls[nw.y][nw.x] = sliced;
          console.log(sliced);
          this.boolSelect = false;
          this.selected.updatePosition(nw, this.listOfDivs[y][x]);
          this.selected = null;
        }
      }
    }
  }
  /**
   * Clear out blocks to gray
   */
  clearOutColors() {
    this.listOfDivs.forEach((l1) => {
      l1.forEach((l2) => {
        l2.style.backgroundColor = "#69696969";
      });
    });
  }
  /**
   * Clear out blocks to gray with delay by decorator
   */
  @Decorators.timeout
  clearOutColorsAfter() {
    this.listOfDivs.forEach((l1) => {
      l1.forEach((l2) => {
        l2.style.backgroundColor = "#69696969";
      });
    });
  }
}

// listOfBalls - change index in array, slice
// SingleBall - Pos, changeDiv
// for (let y = 0; y < planeSize; y++) {
//   let copy = this.listOfBalls[y].copyWithin();
//   this.listOfBalls[y] = new Array(planeSize);
//   for (let x = 0; x < planeSize; x++) {
//     while (!this.aStar.completed) {
//     }
//     if (!(nw.x === x && nw.y === y) && copy[x] !== undefined) {
//       this.listOfBalls[y][x] = copy[x];
//     } else if (nw.x === x && nw.y === y && this.aStar.solution) {
//       this.boolSelect = false;
//       this.selected.updatePosition(nw, this.listOfDivs[y][x]);
//       this.selected = null;
//       this.generateAndAppend3Balls();
//       this.addEventListenerToBalls();
//     }
//   }
// }

// function timeout(ob: Object, name: string, desc: PropertyDescriptor) {
//   let oryg = desc.value;
//   console.log("MEEEEE");
//   desc.value = function (...args: any[]) {
//     console.log("Noszkurwa ");
//     setTimeout(() => {
//       console.log(this, args);
//       console.log("DEKORUJEĘ!!!!");
//       return oryg.apply(this, args);
//     }, 200);
//   };
// }
