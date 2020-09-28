// generate mental math updating array
// determine correct response
function number_update(array1, array2) {
    var array_output = [];
    var str_output = '';
    for (i = 0; i < array1.length; i++) {
        if (array2.length < array1.length) {
            if (array2[0] > 9) throw "number in array2 must be < 10";
            if (array2[0] < -9) throw "number in array2 must be > -10";
            var correct_num = array1[i] + array2[0]; // if array2 is shorter than array1, always add the first element of array2 to each element in array1
        } else if (array1.length == array2.length) {
            if (array2[i] > 9) throw "number in array2 must be < 10";
            if (array2[i] < -9) throw "number in array2 must be > -10";
            var correct_num = array1[i] + array2[i];
        };
        if (correct_num < 0) {
            correct_num += 10;
        } else if (correct_num > 9) {
            correct_num -= 10;
        }
        str_output = str_output.concat(correct_num.toString()); // concat string integers
        array_output.push(correct_num);
    }
    return [array_output, str_output]
}

// create distractors/wrong responses
function generate_similar_numbers(array, n_distractors) {
    var result = [];
    var v = 1; // distractor's difference from correct answer, changes with each additional distractor
    while (result.length < n_distractors) { // loop stops when the result array is full
        for (i = 0; i < array.length; i++) { // iterate through the different indeces of different distractors
            result.push(array.slice(0, array.length));
            result.push(array.slice(0, array.length)); // append two copies of the correct answer into the result
            var y = array[i] // y is a copy of the correct answer's digit at different indeces
            var y_plus = y + v;
            var y_minus = y - v;
            if (y_plus > 9) {
                y_plus -= 10;
            };
            if (y_minus < 0) {
                y_minus += 10;
            };
            result[result.length - 1][i] = y_plus;
            result[result.length - 2][i] = y_minus; // the two copies undergo different changes at the same index.
            // in the next iteration, newly pushed distractors change at the next index, but the same locations for the previous iteration's distractors do not change.
        };
        v += 1;
    };
    return [array].concat(shuffle(result.slice(0, n_distractors))); // [array + distractors]
}