export class PlaneManager {
    constructor(plane) {
        this.plane = plane;
        this.array = [];
        this.randomPoints = [];
        this.type = 0;
        this.listOfDivs = [];
        this.mainData = { startIndex: 0, endIndex: 0, numberOfSteps: 0 };
        this.wallArray = {
            top: [0, 1, 2, 3],
            bottom: [12, 13, 14, 15],
            left: [0, 4, 8, 12],
            right: [3, 7, 11, 15],
        };
    }
    generatePlane() {
        for (let n = 0; n < 3; n++)
            this.randomPoints.push(Math.floor(Math.random() * (14 + 1)));
        for (let x = 0; x < 16; x++) {
            let div = document.createElement("div");
            div.className = x.toString();
            if (this.randomPoints.includes(x)) {
                div.innerHTML = "X";
                this.array.push(69);
            }
            else {
                div.innerHTML = x.toString();
                this.array.push(0);
            }
            div.addEventListener("click", (e) => {
                if ((this.type == 0 || this.type == 1) &&
                    !this.randomPoints.includes(parseInt(div.classList[0])))
                    this.changeStartStop(div);
            });
            this.listOfDivs.push(div);
            this.plane.appendChild(div);
        }
        console.log(this.array, this.randomPoints);
    }
    changeStartStop(div) {
        let numberIndex = parseInt(div.classList[0]);
        if (this.type == 0) {
            div.innerText = "S";
            this.array[numberIndex] = 1337;
            this.mainData.startIndex = numberIndex;
        }
        else if (this.type == 1) {
            div.innerText = "M";
            this.array[numberIndex] = 2137;
            this.mainData.endIndex = numberIndex;
            this.calculateBestTrack();
        }
        this.type += 1;
        console.log(this.array);
    }
    calculateBestTrack() {
        let mapOfDivInsidePlane = this.plane.children;
        console.log(mapOfDivInsidePlane);
        if (this.mainData.numberOfSteps == 0) {
            let indexTolookUp = this.mainData.startIndex;
            if (!this.wallArray.left.includes(indexTolookUp)) {
            }
            if (!this.wallArray.right.includes(indexTolookUp)) {
            }
            if (!this.wallArray.bottom.includes(indexTolookUp)) {
            }
            if (!this.wallArray.top.includes(indexTolookUp)) {
            }
        }
    }
}
//4 Warunki
//0   1   2   3
//4           7
//8           11
//12  13  14  15
