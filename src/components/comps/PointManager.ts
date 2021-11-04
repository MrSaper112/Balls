import { planeSize, nailing, points, co_ordinates } from "./const";
import { SingleBall } from "./SingleBall";

export class PointManager {
  private balls: Array<Array<SingleBall>>;
  private possibleMoves: Array<SingleBall>;
  public function: any;
  public points: number;
  public listOfBalls: Array<Array<SingleBall>>;
  public compacted: boolean;
  public blockPrev: boolean;
  constructor(listOfBalls: Array<Array<SingleBall>>) {
    this.points = 0;
    this.listOfBalls = listOfBalls;
    this.compacted = false;
    this.blockPrev = false;
  }
  updateBalls(newBalls: Array<Array<SingleBall>>) {
    this.balls = newBalls;
  }
  lookup() {
    let endles = [];
    for (let y = planeSize - 1; y >= 0; y -= 1) {
      for (let x = planeSize - 1; x >= 0; x -= 1) {
        // In left
        if (this.balls[y][x] != undefined) {
          //   console.log({ x: x, y: y });
          let ballColor = this.balls[y][x];
          //   for (let g = x; g >= nailing; g -= 1) {

          //   }
          let g = x;
          let u = y;
          let c = 0;
          let d = 0;
          let tabG = [];
          let tabU = [];
          let tabC = [];
          let tabD = [];

          while (true) {
            // console.log(y, g);
            let nextBall = this.balls[y][g];
            if (nextBall != null) {
              if (nextBall.getColor() === ballColor.getColor()) {
                tabG.push(nextBall);
              } else {
                break;
              }
            } else {
              break;
            }
            if (g !== 0) g--;
            else break;
          }
          //Up
          while (true) {
            // console.log(u, x);
            let nextBall = this.balls[u][x];
            if (nextBall != null) {
              if (nextBall.getColor() === ballColor.getColor()) {
                tabU.push(nextBall);
              } else {
                break;
              }
            } else {
              break;
            }
            if (u !== 0) u--;
            else break;
          }

          while (true) {
            // console.log(y - c, x - c);

            let nextBall = this.balls[y - c][x - c];
            if (nextBall != null) {
              if (nextBall.getColor() === ballColor.getColor()) {
                tabC.push(nextBall);
              } else {
                break;
              }
            } else {
              break;
            }
            if (y - c > 0 && x - c > 0) c++;
            else break;
          }

          while (true) {
            // console.log(y + d, x + d);

            let nextBall = this.balls[y - d][x + d];

            if (nextBall != null) {
              // console.log(nextBall.div, y - d, x + d, y, x, d);
              if (nextBall.getColor() === ballColor.getColor()) {
                tabD.push(nextBall);
              } else {
                break;
              }
            } else {
              break;
            }
            if (y - d > 0 && x + d < planeSize - 1) d++;
            else break;
          }

          if (tabC.length >= nailing) {
            console.warn(tabC.length);
            endles.push(tabC);
            this.compacted = true;
          }
          if (tabG.length >= nailing) {
            console.warn(tabG);
            endles.push(tabG);
            this.compacted = true;
          }
          if (tabU.length >= nailing) {
            console.warn(tabU);
            endles.push(tabU);
            this.compacted = true;
          }
          if (tabD.length >= nailing) {
            console.warn(tabD);
            endles.push(tabD);
            this.compacted = true;
          }

          // console.log("Lewa", tabG, tabU, tabC);
        }
      }
    }
    let clearedEndles: Array<SingleBall> = [];

    endles.flat().forEach((ball) => {
      let x = clearedEndles.filter((e) => {
        return (
          e.position.x === ball.position.x && e.position.y === ball.position.y
        );
      });
      if (x.length == 0) {
        this.addPoints(1);
        console.log(x);
        clearedEndles.push(ball);
        this.removeBalls(ball.position);
      }
    });
    if (
      [...this.listOfBalls].flat().filter((x) => x != null).length ==
      planeSize ** 2
    ) {
      this.blockPrev = true;
      console.error("GRA SKONCZONA");
      alert("Gra Skończona, Twój wynik: " + this.points);
    }

    // endles.forEach((row) => {
    //   this.addPoints(row.length);
    //   row.forEach((point) => {
    //     // let ball = this.listOfBalls.flat().filter((b) => {
    //     //   return (
    //     //     b != null &&
    //     //     b.position.x === point.position.x &&
    //     //     b.position.y === point.position.y
    //     //   );
    //     // });
    //     // console.log(ball[0]);
    //     // if (!removed.includes(ball[0])) {
    //     //   this.listOfBalls[ball[0].position.y][ball[0].position.x] = null;
    //     //   removed.push(ball[0]);
    //     // }
    //     // point.removeMe();
    //   });
    // });
  }
  removeBalls(cord: co_ordinates) {
    console.log(cord.y, this.listOfBalls);
    if (this.listOfBalls[cord.y][cord.x] !== null) {
      this.listOfBalls[cord.y][cord.x].removeMe();
      this.listOfBalls[cord.y][cord.x] = null;
    }
  }
  addPoints(howMuch: number) {
    this.points += howMuch;
    points.innerText = this.points.toString();
  }
}

//Up, Down, Na skos
