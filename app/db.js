const expenses = []
let spendLimit = 0

function get() {
    return [...expenses]
}

function add(expense) {
    expenses.push(expense)
}

function setLimit(limit) {
    spendLimit = limit
}

function getLimit() {
    return spendLimit
}

module.exports = {
    get,
    add,
    setLimit,
    getLimit,
}