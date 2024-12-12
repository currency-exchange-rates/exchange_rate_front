function getSavings() {
    return 1;
    //returns savings
}
function concedeMortgage(homeValue) {
    var savings = getSavings();
    return savings / homeValue > 0.2;
}
concedeMortgage(4);
//# sourceMappingURL=api.js.map