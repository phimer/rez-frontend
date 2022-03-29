

const countLinesInTextHelper = (text) => {

    let count = 0;

    for (let char of text) {
        if (char === '\n') {
            count++;
        }
    }

    return count + 1;


}

export default countLinesInTextHelper