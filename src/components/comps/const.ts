export const planeSize: number = 9;
export const nailing: number = 5;
export const numberOfWalls: number = 5;
export const numberBallsGenerated: number = 3;
export const timeOfDecorater: number = 200;

export interface co_ordinates {
  x: number;
  y: number;
}
export interface start_End {
  start: { x: null; y: null };
  end: { x: null; y: null };
}
export interface ballInter {
  color: String;
  position: co_ordinates;
  div: HTMLElement;
  listenerExist: boolean;
  getColor(): void;
  remove(): void;
}

export const colorBalls = [
  "#f72585",
  "#480ca8",
  "#32e7c8",
  // "#4361ee",
  // "#4cc9f0",
  // "#bde0fe",
  // "#a2d2ff",
];

export const pid = (data: any, lookX: number, lookY: number) => {
  return data.filter((obs: any) => {
    return obs.x === lookX && obs.y === lookY;
  });
};
export const plane = document.getElementById("plane") as HTMLDivElement;
export const nextThree = document.getElementById("nextThree") as HTMLDivElement;
export const points = document.getElementById("points") as HTMLDivElement;
//  "#7209b7",
//   "#4361ee",
//   "#4cc9f0",
//   "#bde0fe",
//   "#a2d2ff",
