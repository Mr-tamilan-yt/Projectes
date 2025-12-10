function convert() {
    // Get the starting and ending readings from the input fields
    let startReading = document.getElementById("startReading").value;
    let endReading = document.getElementById("endReading").value;
    // Convert the input values to numbers
    startReading = Number(startReading);
    endReading = Number(endReading);
    // Check if the inputs are valid
    if (isNaN(startReading) || isNaN(endReading) || startReading < 0 || endReading < 0 || endReading < startReading) {
        document.getElementById('result').innerHTML = "Please enter valid readings.";
        return;
    }
    // Calculate the consumed units
    let units = endReading - startReading;
    let rate = 0;
    // Apply the rate based on the consumed units
    if (units <= 100) {
        rate = 0; // No charge for the first 100 units
    } else if (units <= 200) {
        rate = (units - 100) * 2.35; // ₹2.35 per unit for next 100 units
    } else if (units <= 400) {
        rate = 235 + (units - 200) * 4.70; // ₹4.7 per unit for 200-400 units
    } else if (units <= 500) {
        rate = 1175 + (units - 400) * 6.30; // ₹6.3 per unit for 400-500 units
    } else if (units <= 600) {
        rate = 1805 + (units - 500) * 8.40; // ₹8.4 per unit for 500-600 units
    } else if (units <= 800) {
        rate = 2645 + (units - 600) * 9.45; // ₹9.45 per unit for 600-800 units
    } else if (units <= 1000) {
        rate = 4535 + (units - 800) * 10.50; // ₹10.5 per unit for 800-1000 units
    } else {
        rate = 6635 + (units - 1000) * 11.55; // ₹11.55 per unit above 1000
    }
    // Display the calculated bill amount
    document.getElementById('result').innerHTML = 'Your Amount = ₹' + rate.toFixed(2) + ' Rupees';
}
