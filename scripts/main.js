import { PlaneManager } from "./GeneratePlane.js";
const plane = document.getElementById("plane");
let planeManager = new PlaneManager(plane);
window.addEventListener("DOMContentLoaded", () => {
    console.log("Dupa");
    planeManager.generatePlane();
});
