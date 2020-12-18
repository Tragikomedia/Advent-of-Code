/* 
--- Day 18: Operation Order ---

As you look out the window and notice a heavily-forested continent slowly appear over the horizon, you are interrupted by the child sitting next to you. They're curious if you could help them with their math homework.

Unfortunately, it seems like this "math" follows different rules than you remember.

The homework (your puzzle input) consists of a series of expressions that consist of addition (+), multiplication (*), and parentheses ((...)). Just like normal math, parentheses indicate that the expression inside must be evaluated before it can be used by the surrounding expression. Addition still finds the sum of the numbers on both sides of the operator, and multiplication still finds the product.

However, the rules of operator precedence have changed. Rather than evaluating multiplication before addition, the operators have the same precedence, and are evaluated left-to-right regardless of the order in which they appear.

For example, the steps to evaluate the expression 1 + 2 * 3 + 4 * 5 + 6 are as follows:

1 + 2 * 3 + 4 * 5 + 6
  3   * 3 + 4 * 5 + 6
      9   + 4 * 5 + 6
         13   * 5 + 6
             65   + 6
                 71

Parentheses can override this order; for example, here is what happens if parentheses are added to form 1 + (2 * 3) + (4 * (5 + 6)):

1 + (2 * 3) + (4 * (5 + 6))
1 +    6    + (4 * (5 + 6))
     7      + (4 * (5 + 6))
     7      + (4 *   11   )
     7      +     44
            51

Here are a few more examples:

    2 * 3 + (4 * 5) becomes 26.
    5 + (8 * 3 + 9 + 3 * 4 * 3) becomes 437.
    5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4)) becomes 12240.
    ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2 becomes 13632.

Before you can help with the homework, you need to understand it yourself. Evaluate the expression on each line of the homework; what is the sum of the resulting values?
*/

// Answer = 29839238838303

/* 
--- Part Two ---

You manage to answer the child's questions and they finish part 1 of their homework, but get stuck when they reach the next section: advanced math.

Now, addition and multiplication have different precedence levels, but they're not the ones you're familiar with. Instead, addition is evaluated before multiplication.

For example, the steps to evaluate the expression 1 + 2 * 3 + 4 * 5 + 6 are now as follows:

1 + 2 * 3 + 4 * 5 + 6
  3   * 3 + 4 * 5 + 6
  3   *   7   * 5 + 6
  3   *   7   *  11
     21       *  11
         231

Here are the other examples from above:

    1 + (2 * 3) + (4 * (5 + 6)) still becomes 51.
    2 * 3 + (4 * 5) becomes 46.
    5 + (8 * 3 + 9 + 3 * 4 * 3) becomes 1445.
    5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4)) becomes 669060.
    ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2 becomes 23340.

What do you get if you add up the results of evaluating the homework problems using these new rules?
*/

// Answer = 201376568795521

const fs = require('fs');

const parseInput = data => data.split('\n').map(line => line.split(' ').join(''));

const findClosingParen = (equation, parenInd) => {
    let len = equation.length;
    let control = -1;
    for (let i = parenInd+1; i < len; i++) {
        if (equation[i] === '(') control--;
        else if (equation[i] === ')') {
            control++;
            if (control === 0) return i;
        }
    }
    return -1;
}

const calcEq = (equation, isAdvanced=false) => {
    const smallReg = /(\d+)([+*])(\d+)/;
    const plusReg = /(\d+)\+(\d+)/;
    const multReg = /(\d+)\*(\d+)/;
    let line = equation.slice(0);
    while (smallReg.test(line)) {
        let result, tmp, part, left, op, right;;
        if (!isAdvanced) {
            [ part, left, op, right ] = line.match(smallReg);
            if (op === '+') {
                result = (parseInt(left) + parseInt(right)).toString();
            } else {
                result = (parseInt(left) * parseInt(right)).toString();
            }
        } else {
            if (plusReg.test(line)) {
                [ part, left, right ] = line.match(plusReg);
                result = (parseInt(left) + parseInt(right)).toString();
            } else {
                [ part, left, right ] = line.match(multReg);
                result = (parseInt(left) * parseInt(right)).toString();   
            }
        }
        tmp = line.slice('').split('');
        tmp.splice(line.indexOf(part), part.length, result);
        line = tmp.join('');
    }
    return line;
}

const doMaths = (equation, isAdvanced=false) => {
    let line = equation.slice(0);
    let parenInd;
    let closingParInd;
    while (line.includes('(')) {
        parenInd = line.indexOf('(');
        closingParInd = findClosingParen(line, parenInd);
        let partialResult = doMaths(line.slice(parenInd+1, closingParInd) ,isAdvanced);
        let tmp = line.slice('').split('');
        tmp.splice(parenInd, closingParInd - parenInd + 1, partialResult);
        line = tmp.join('');
    }
    return calcEq(line, isAdvanced);
}

const getResult = (input, isAdvanced=false) => input.map(equation => doMaths(equation, isAdvanced)).reduce((a, b) => a + parseInt(b), 0);

const doTasks = () => {
    fs.readFile('18_input.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let input = parseInput(data);
        let firstResult = getResult(input);
        console.log(`First: ${firstResult}`);
        let secondResult = getResult(input, true);
        console.log(`Second: ${secondResult}`);
    })
}

doTasks();