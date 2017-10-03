power(3, 2);

function power(base, exponent) {
    return (exponent>0) ? base * power(base, exponent-1) : 1 
}