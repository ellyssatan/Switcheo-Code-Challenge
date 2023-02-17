// Using a for loop
var sum_to_n_a = function(n) {
    // Declare a variable named sum and initialize it to 0
    let sum = 0;
    // Use a for loop to iterate from 1 up to and including n
    for (let i = 1; i <= n; i++) {
        // Add the current value of i to the variable sum
        sum += i;
    }
    // Return the final value of sum
    return sum;
};

// Using recursion
var sum_to_n_b = function(n) {
    // Check if n is less than or equal to 1
    if (n <= 1) {
        // If n is less than or equal to 1, return n
        return n;
    }
    // If n is greater than 1, return the sum of n and the result of calling 
    // sum_to_n_b with n-1 as argument, which calculates the sum of all integers 
    // from 1 to n-1 recursively
    return n + sum_to_n_b(n - 1);
};

// Using the arithmetic progression formula
var sum_to_n_c = function(n) {
    return (n * (n + 1)) / 2;
};