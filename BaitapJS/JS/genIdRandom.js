let arrayId = [];

let randomId = function(length) {
    return Math.random().toString(36).substring(2, length + 2)
};

let checkId = function(id, array) {
    let lap = array.find(function(con) {
        return con === id;
    })
    return lap;
}

let genId = function(length) {
    let id = randomId(length);
    while (checkId(id, arrayId)) {
        id = randomId(length);
    }
    arrayId.push(id);
    return id;
}
