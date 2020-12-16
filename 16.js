/* 
--- Day 16: Ticket Translation ---

As you're walking to yet another connecting flight, you realize that one of the legs of your re-routed trip coming up is on a high-speed train. However, the train ticket you were given is in a language you don't understand. You should probably figure out what it says before you get to the train station after the next flight.

Unfortunately, you can't actually read the words on the ticket. You can, however, read the numbers, and so you figure out the fields these tickets must have and the valid ranges for values in those fields.

You collect the rules for ticket fields, the numbers on your ticket, and the numbers on other nearby tickets for the same train service (via the airport security cameras) together into a single document you can reference (your puzzle input).

The rules for ticket fields specify a list of fields that exist somewhere on the ticket and the valid ranges of values for each field. For example, a rule like class: 1-3 or 5-7 means that one of the fields in every ticket is named class and can be any value in the ranges 1-3 or 5-7 (inclusive, such that 3 and 5 are both valid in this field, but 4 is not).

Each ticket is represented by a single line of comma-separated values. The values are the numbers on the ticket in the order they appear; every ticket has the same format. For example, consider this ticket:

.--------------------------------------------------------.
| ????: 101    ?????: 102   ??????????: 103     ???: 104 |
|                                                        |
| ??: 301  ??: 302             ???????: 303      ??????? |
| ??: 401  ??: 402           ???? ????: 403    ????????? |
'--------------------------------------------------------'

Here, ? represents text in a language you don't understand. This ticket might be represented as 101,102,103,104,301,302,303,401,402,403; of course, the actual train tickets you're looking at are much more complicated. In any case, you've extracted just the numbers in such a way that the first number is always the same specific field, the second number is always a different specific field, and so on - you just don't know what each position actually means!

Start by determining which tickets are completely invalid; these are tickets that contain values which aren't valid for any field. Ignore your ticket for now.

For example, suppose you have the following notes:

class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12

It doesn't matter which position corresponds to which field; you can identify invalid nearby tickets by considering only whether tickets contain values that are not valid for any field. In this example, the values on the first nearby ticket are all valid for at least one field. This is not true of the other three nearby tickets: the values 4, 55, and 12 are are not valid for any field. Adding together all of the invalid values produces your ticket scanning error rate: 4 + 55 + 12 = 71.

Consider the validity of the nearby tickets you scanned. What is your ticket scanning error rate?
*/

// Answer = 26988

/* 
--- Part Two ---

Now that you've identified which tickets contain invalid values, discard those tickets entirely. Use the remaining valid tickets to determine which field is which.

Using the valid ranges for each field, determine what order the fields appear on the tickets. The order is consistent between all tickets: if seat is the third field, it is the third field on every ticket, including your ticket.

For example, suppose you have the following notes:

class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9

Based on the nearby tickets in the above example, the first position must be row, the second position must be class, and the third position must be seat; you can conclude that in your ticket, class is 12, row is 11, and seat is 13.

Once you work out which field is which, look for the six fields on your ticket that start with the word departure. What do you get if you multiply those six values together?
*/

// Answer = 426362917709

const fs = require('fs');

const parseInput = data => {
    let obj = {attributes: undefined, yourKey: undefined, otherKeys: undefined};
    let inp = data.split('\n');
    let attrReg = /^([\w\s]+): (\d+-\d+) or (\d+-\d+)$/
    let keyReg = /^(\d+,)+\d+$/
    let attributes = [];
    let otherKeys = [];
    inp.forEach((line, index, arr) => {
        if (attrReg.test(line)) {
            let attrs = {};
            let matchData = line.match(attrReg);
            let firstRange = matchData[2].split('-').map(num => parseInt(num));
            let secondRange = matchData[3].split('-').map(num => parseInt(num));
            attrs['name'] = matchData[1];
            attrs['firstRange'] = firstRange;
            attrs['secondRange'] = secondRange;
            attributes.push(attrs);
        } else if (keyReg.test(line) && arr[index-1] === 'your ticket:') {
            obj['yourKey'] = line.split(',').map(num => parseInt(num));
        } else if (keyReg.test(line)) {
            otherKeys.push(line.split(',').map(num => parseInt(num)));
        }
    });
    obj['attributes'] = attributes;
    obj['otherKeys'] = otherKeys
    return obj;
}

const addToRange = (ranges, range) => {
    for (let i = range[0]; i <= range[1]; i++) {
        if (!ranges.has(i)) ranges.add(i);
    }
}

const doFirst = input => {
    let attributes = input.attributes;
    let nearbyKeys = input.otherKeys;
    let ranges = new Set();
    attributes.forEach(({firstRange, secondRange}) => {
        addToRange(ranges, firstRange);
        addToRange(ranges, secondRange);
    });
    let naughtyNumbers = [];
    let validKeys = [];
    nearbyKeys.forEach(key => {
        let isOK = true;
        key.forEach(num => {
            if (!ranges.has(num)) {
                naughtyNumbers.push(num);
                isOK = false;
            }
        });
        if (isOK) validKeys.push(key);
    });
    return {result: naughtyNumbers.reduce((a,b) => a + b), validKeys: validKeys};
}

const doSecond = (input, validKeys) => {
    let attributes = input.attributes;
    let len = attributes.length;
    let attNames = attributes.map(el => el.name);
    let attRanges = attributes.map(el => {
        let ranges = new Set();
        addToRange(ranges, el.firstRange);
        addToRange(ranges, el.secondRange);
        return ranges;
    });
    let possibles = {};
    let values = {};
    for (let i = 0; i < len; i++) {
        possibles[i] = [...attNames];
        values[i] = [];
    }
    validKeys.forEach(key => {
        for (let i = 0; i < len; i++) {
            values[i].push(key[i]);
        }
    });
    while (Object.keys(possibles).some(key => possibles[key].length > 1)) {
        for (let i = 0; i < len; i++) {
            attRanges.forEach((range, index) => {
                let name = attNames[index];
                if (possibles[i].indexOf(name) === -1) return;
                if (values[i].some(val => !range.has(val))) {
                    possibles[i].splice(possibles[i].indexOf(name), 1);
                }
            });
            if (possibles[i].length === 1) {
                for (let j = 0; j < len; j++) {
                    let index = possibles[j].indexOf(possibles[i][0]);
                    if (j !== i && index !== -1) {
                        possibles[j].splice(index, 1);
                    }
                }
            }
        }
    }
    return Object.keys(possibles).filter(key => /^departure /.test(possibles[key])).map(el => parseInt(el)).reduce((a, b) => a * input.yourKey[b], 1);
}

const doTasks = () => {
    fs.readFile('16_input.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const input = parseInput(data);
        let {result, validKeys} = doFirst(input);
        console.log(`First: ${result}`);
        console.log(`Second: ${doSecond(input, validKeys)}`);
    })
}

doTasks();