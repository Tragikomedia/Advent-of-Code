/* 
--- Day 17: Conway Cubes ---

As your flight slowly drifts through the sky, the Elves at the Mythical Information Bureau at the North Pole contact you. They'd like some help debugging a malfunctioning experimental energy source aboard one of their super-secret imaging satellites.

The experimental energy source is based on cutting-edge technology: a set of Conway Cubes contained in a pocket dimension! When you hear it's having problems, you can't help but agree to take a look.

The pocket dimension contains an infinite 3-dimensional grid. At every integer 3-dimensional coordinate (x,y,z), there exists a single cube which is either active or inactive.

In the initial state of the pocket dimension, almost all cubes start inactive. The only exception to this is a small flat region of cubes (your puzzle input); the cubes in this region start in the specified active (#) or inactive (.) state.

The energy source then proceeds to boot up by executing six cycles.

Each cube only ever considers its neighbors: any of the 26 other cubes where any of their coordinates differ by at most 1. For example, given the cube at x=1,y=2,z=3, its neighbors include the cube at x=2,y=2,z=2, the cube at x=0,y=2,z=3, and so on.

During a cycle, all cubes simultaneously change their state according to the following rules:

    If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
    If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.

The engineers responsible for this experimental energy source would like you to simulate the pocket dimension and determine what the configuration of cubes should be at the end of the six-cycle boot process.

For example, consider the following initial state:

.#.
..#
###

Even though the pocket dimension is 3-dimensional, this initial state represents a small 2-dimensional slice of it. (In particular, this initial state defines a 3x3x1 region of the 3-dimensional space.)

Simulating a few cycles from this initial state produces the following configurations, where the result of each cycle is shown layer-by-layer at each given z coordinate (and the frame of view follows the active cells in each cycle):

Before any cycles:

z=0
.#.
..#
###


After 1 cycle:

z=-1
#..
..#
.#.

z=0
#.#
.##
.#.

z=1
#..
..#
.#.


After 2 cycles:

z=-2
.....
.....
..#..
.....
.....

z=-1
..#..
.#..#
....#
.#...
.....

z=0
##...
##...
#....
....#
.###.

z=1
..#..
.#..#
....#
.#...
.....

z=2
.....
.....
..#..
.....
.....


After 3 cycles:

z=-2
.......
.......
..##...
..###..
.......
.......
.......

z=-1
..#....
...#...
#......
.....##
.#...#.
..#.#..
...#...

z=0
...#...
.......
#......
.......
.....##
.##.#..
...#...

z=1
..#....
...#...
#......
.....##
.#...#.
..#.#..
...#...

z=2
.......
.......
..##...
..###..
.......
.......
.......

After the full six-cycle boot process completes, 112 cubes are left in the active state.

Starting with your given initial configuration, simulate six cycles. How many cubes are left in the active state after the sixth cycle?
*/

// Answer = 218

/* 
--- Part Two ---

For some reason, your simulated results don't match what the experimental energy source engineers expected. Apparently, the pocket dimension actually has four spatial dimensions, not three.

The pocket dimension contains an infinite 4-dimensional grid. At every integer 4-dimensional coordinate (x,y,z,w), there exists a single cube (really, a hypercube) which is still either active or inactive.

Each cube only ever considers its neighbors: any of the 80 other cubes where any of their coordinates differ by at most 1. For example, given the cube at x=1,y=2,z=3,w=4, its neighbors include the cube at x=2,y=2,z=3,w=3, the cube at x=0,y=2,z=3,w=4, and so on.

The initial state of the pocket dimension still consists of a small flat region of cubes. Furthermore, the same rules for cycle updating still apply: during each cycle, consider the number of active neighbors of each cube.

For example, consider the same initial state as in the example above. Even though the pocket dimension is 4-dimensional, this initial state represents a small 2-dimensional slice of it. (In particular, this initial state defines a 3x3x1x1 region of the 4-dimensional space.)

Simulating a few cycles from this initial state produces the following configurations, where the result of each cycle is shown layer-by-layer at each given z and w coordinate:

Before any cycles:

z=0, w=0
.#.
..#
###


After 1 cycle:

z=-1, w=-1
#..
..#
.#.

z=0, w=-1
#..
..#
.#.

z=1, w=-1
#..
..#
.#.

z=-1, w=0
#..
..#
.#.

z=0, w=0
#.#
.##
.#.

z=1, w=0
#..
..#
.#.

z=-1, w=1
#..
..#
.#.

z=0, w=1
#..
..#
.#.

z=1, w=1
#..
..#
.#.


After 2 cycles:

z=-2, w=-2
.....
.....
..#..
.....
.....

z=-1, w=-2
.....
.....
.....
.....
.....

z=0, w=-2
###..
##.##
#...#
.#..#
.###.

z=1, w=-2
.....
.....
.....
.....
.....

z=2, w=-2
.....
.....
..#..
.....
.....

z=-2, w=-1
.....
.....
.....
.....
.....

z=-1, w=-1
.....
.....
.....
.....
.....

z=0, w=-1
.....
.....
.....
.....
.....

z=1, w=-1
.....
.....
.....
.....
.....

z=2, w=-1
.....
.....
.....
.....
.....

z=-2, w=0
###..
##.##
#...#
.#..#
.###.

z=-1, w=0
.....
.....
.....
.....
.....

z=0, w=0
.....
.....
.....
.....
.....

z=1, w=0
.....
.....
.....
.....
.....

z=2, w=0
###..
##.##
#...#
.#..#
.###.

z=-2, w=1
.....
.....
.....
.....
.....

z=-1, w=1
.....
.....
.....
.....
.....

z=0, w=1
.....
.....
.....
.....
.....

z=1, w=1
.....
.....
.....
.....
.....

z=2, w=1
.....
.....
.....
.....
.....

z=-2, w=2
.....
.....
..#..
.....
.....

z=-1, w=2
.....
.....
.....
.....
.....

z=0, w=2
###..
##.##
#...#
.#..#
.###.

z=1, w=2
.....
.....
.....
.....
.....

z=2, w=2
.....
.....
..#..
.....
.....

After the full six-cycle boot process completes, 848 cubes are left in the active state.

Starting with your given initial configuration, simulate six cycles in a 4-dimensional space. How many cubes are left in the active state after the sixth cycle?
*/

// Answer = 1908

const getNeighbours = (a, b, c, d) => {
    let x = parseInt(a), y = parseInt(b), z = parseInt(c);
    let neighbours = [];
    let index = 0;
    if (d === undefined) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                for (let g = -1; g < 2; g++) {
                    if (!(j === 0 && i === 0 && g ===0)) {
                        neighbours[index] = `${x+i} ${y+j} ${z+g}`;
                        index++;
                    }
                }
            }
        }
    } else {
        let w = parseInt(d);
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                for (let g = -1; g < 2; g++) {
                    for (let h = -1; h < 2; h++) {
                        if (!(j === 0 && i === 0 && g === 0 && h === 0)) {
                            neighbours[index] = `${x+i} ${y+j} ${z+g} ${w+h}`;
                            index++;
                        }
                    }
                }
            }
        }
    }

    return neighbours;
}


class Cell {
    constructor(x, y, z, w, neighbours) {
        this.id = w === undefined ? `${x} ${y} ${z}` : `${x} ${y} ${z} ${w}`;
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.neighbours = neighbours === undefined ? getNeighbours(x, y, z, w) : neighbours;
    }

    checkNeighbours(activeOnes, deadOnes) {
        let living = 0;
        for (let neigh of this.neighbours) {
            if (activeOnes.has(neigh)) living++;
            else if (deadOnes.has(neigh)) deadOnes.set(neigh, deadOnes.get(neigh) + 1);
            else deadOnes.set(neigh, 1);
        }
        if (living === 2 || living === 3) return new Cell(this.x, this.y, this.z, this.w, this.neighbours);
        else return null;
    }
}

const reviveDead = deadOnes => {
    let toBeRisen = [];
    for (let [id, value] of deadOnes.entries()) {
        if (value === 3) {
            toBeRisen.push(id);
        }
    }
    return toBeRisen;
}

const fs = require('fs');

const getInitialActiveTiles = (data, isExtended=false) => {
    let lines = data.split('\n');
    let mY = lines.length;
    let mX = lines[0].length;
    let activeOnes = new Map();
    for (let x = 0; x < mX; x++) {
        for (let y = 0; y < mY; y++) {
            if (lines[y][x] === '#') activeOnes.set(!isExtended ? `${x} ${y} 0` : `${x} ${y} 0 0`, !isExtended ? new Cell(x, y, 0) : new Cell(x, y, 0, 0));
        }
    }
    return activeOnes;
}

const countLiving = (initialState, iterations, isExtended=false) => {
    let currentState = new Map(initialState);
    let deadOnes = new Map();
    for (let gen = 0; gen < iterations; gen++) {
        let newState = new Map();
        for (let [id, cell] of currentState) {
            let outcome = cell.checkNeighbours(currentState, deadOnes);
            if (outcome !== null) newState.set(id, outcome);
        }
        let toBeRisen = reviveDead(deadOnes);
        toBeRisen.forEach(id => {
            if (!isExtended) {
                let [x, y, z] = id.split(' ');
                newState.set(id, new Cell(x, y, z));
            } else {
                let [x, y, z, w] = id.split(' ');
                newState.set(id, new Cell(x, y, z, w));
            }

        })
        currentState = newState;
        deadOnes = new Map();
    }
    return Array.from(currentState.keys()).length;
}

const doTasks = () => {
    fs.readFile('17_input.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const initialState = getInitialActiveTiles(data);
        console.log(`First: ${countLiving(initialState, 6)}`);
        const extendedData = getInitialActiveTiles(data, true);
        console.log(`Second: ${countLiving(extendedData,6, true)}`);
    })
}

doTasks();