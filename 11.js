/* 
--- Day 11: Seating System ---

Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!

By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL

Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:

    If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
    If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
    Otherwise, the seat's state does not change.

Floor (.) never changes; seats don't move, and nobody sits on the floor.

After one round of these rules, every seat in the example layout becomes occupied:

#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##

After a second round, the seats with four or more occupied adjacent seats become empty again:

#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##

This process continues for three more rounds:

#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##

#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##

#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##

At this point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied?
*/

// Answer = 2238

/* 
--- Part Two ---

As soon as people start to arrive, you realize your mistake. People don't just care about adjacent seats - they care about the first seat they can see in each of those eight directions!

Now, instead of considering just the eight immediately adjacent seats, consider the first seat in each of those eight directions. For example, the empty seat below would see eight occupied seats:

.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....

The leftmost empty seat below would only see one empty seat, but cannot see any of the occupied ones:

.............
.L.L.#.#.#.#.
.............

The empty seat below would see no occupied seats:

.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.

Also, people seem to be more tolerant than you expected: it now takes five or more visible occupied seats for an occupied seat to become empty (rather than four or more from the previous rules). The other rules still apply: empty seats that see no occupied seats become occupied, seats matching no rule don't change, and floor never changes.

Given the same starting layout as above, these new rules cause the seating area to shift around as follows:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL

#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##

#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#

#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#

#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##LL.LL.L#
L.LL.LL.L#
#.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLL#.L
#.L#LL#.L#

#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.#L.L#
#.L####.LL
..#.#.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#

#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#

Again, at this point, people stop shifting around and the seating area reaches equilibrium. Once this occurs, you count 26 occupied seats.

Given the new visibility method and the rule change for occupied seats becoming empty, once equilibrium is reached, how many seats end up occupied?
*/

// Answer = 2013

const fs = require('fs');

const parseInput = data => data.split('\n').map(line => [...line]);

const determineNeighbours = (curGen, i, j) => {
    let neighbours = [];
    if (i-1 >= 0) {
        neighbours = [curGen[i-1][j-1],curGen[i-1][j],curGen[i-1][j+1]];
    }
    if (i+1 < curGen.length) {
        neighbours = [...neighbours, curGen[i+1][j-1],curGen[i+1][j],curGen[i+1][j+1]]
    }
    neighbours = [...neighbours, curGen[i][j-1],curGen[i][j+1]];
    return neighbours.filter(seat => seat !== undefined);
}

const determineDumbNeighbours = (curGen, i, j) => {
    let height = curGen.length;
    let width = curGen[0].length;

    let topLeft, topMid, topRight;
    let k = i - 1;
    let jLeft = j - 1;
    let jRight = j + 1;
    while (k >= 0) {
        if (jLeft >= 0 && topLeft === undefined) {
            if (curGen[k][jLeft] !== '.') topLeft = curGen[k][jLeft];
        }
        if (topMid === undefined) {
            if (curGen[k][j] !== '.') topMid = curGen[k][j];
        }
        if (jRight < width && topRight === undefined) {
            if (curGen[k][jRight] !== '.') topRight = curGen[k][jRight];
        }
        k--;
        jLeft--;
        jRight++;
    }

    let midLeft, midRight;
    let jMid = j - 1;
    while (jMid >= 0 && midLeft === undefined) {
        if (curGen[i][jMid] !== '.') midLeft = curGen[i][jMid];
        jMid--;
    }
    jMid = j + 1;
    while (jMid < width && midRight === undefined) {
        if (curGen[i][jMid] !== '.') midRight = curGen[i][jMid];
        jMid++;
    }

    let botLeft, botMid, botRight;
    let h = i + 1;
    let bLeft = j - 1;
    let bRight = j + 1;
    while (h < height) {
        if (bLeft >= 0 && botLeft === undefined) {
            if (curGen[h][bLeft] !== '.') botLeft = curGen[h][bLeft];
        }
        if (botMid === undefined) {
            if (curGen[h][j] !== '.') botMid = curGen[h][j];
        }
        if (bRight < width && botRight === undefined) {
            if (curGen[h][bRight] !== '.') botRight = curGen[h][bRight];
        }
        h++;
        bLeft--;
        bRight++;
    }
    return [topLeft, topMid, topRight,midLeft, midRight, botLeft, botMid, botRight].filter(seat => seat !== undefined);
}

const forwardGeneration = (curGen, height, width, occNeighSeats) => {
    let tmp = [];
    let wasChanged = false;
    for (let i = 0; i < height; i++) {
        tmp.push([]);
        for (let j = 0; j < width; j++) {
            let neighbours = occNeighSeats === 4 ? determineNeighbours(curGen, i, j) : determineDumbNeighbours(curGen, i, j);
            if (curGen[i][j] === 'L') {
                if (neighbours.every(seat => seat === 'L' || seat === '.')) {
                    tmp[i].push('#');
                    wasChanged = true;
                } else {
                    tmp[i].push('L');
                }
            } else if (curGen[i][j] == '#') {
                let occupiedNeigh = neighbours.filter(seat => seat === '#').length;
                if (occupiedNeigh >= occNeighSeats) {
                    tmp[i].push('L');
                    wasChanged = true;
                } else {
                    tmp[i].push('#');
                }
            } else {
                tmp[i].push('.');
            }
        }
    }
    return JSON.parse(JSON.stringify({
        newGen: tmp,
        wasChanged: wasChanged
    }));
}

const finishTask = (input, isSightImportant) => {
    let current = input;
    let wasChanged = true;
    const height = input.length;
    const width = input[0].length;
    while (wasChanged) {
        let data = forwardGeneration(current, height, width, isSightImportant ? 5 : 4);
        current = data.newGen;
        wasChanged = data.wasChanged; 
    }
    return current.reduce((a, b) => a + b.filter(seat => seat === '#').length, 0);
}

const doTasks = () => {
    fs.readFile('11_input.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const input = parseInput(data);
        console.log(`First task: ${finishTask(input, false)}`);
        console.log(`Second task: ${finishTask(input, true)}`);
    })
}

doTasks();