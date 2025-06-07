// Pipe Sizing and Runoff Calculator
// Waits for page to load
// Columbus-Compliant Pipe Sizing Tool
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pipeForm");
  const resultDiv = document.getElementById("results");

  // Listens for form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get inputs
    const flow = parseFloat(document.getElementById("flowRate").value);  // cfs
    const slope = parseFloat(document.getElementById("slope").value);    // ft/ft
    const n = parseFloat(document.getElementById("manningN").value);     // Manning's n

    // Get and sanitize percent full
    let percentFullRaw = document.getElementById("percentFull").value;
    let percentFull = parseFloat(percentFullRaw);
    if (isNaN(percentFull) || percentFull <= 0 || percentFull > 100) percentFull = 100;
    percentFull = percentFull / 100;

    // Check for valid input
    if (isNaN(flow) || isNaN(slope) || isNaN(n) || flow <= 0 || slope <= 0 || n <= 0) {
      resultDiv.innerHTML = "<p style='color:red;'>❌ Please enter valid positive numbers for all fields.</p>";
      return;
    }

    // List of standard pipe sizes (inches)
    const diametersInches = [8, 10, 12, 15, 18, 21, 24, 30, 36];
    const minVelocity = 3.0;
    const maxVelocity = 15.0;
    let selected = null;

    // Try each pipe size
    for (let dInch of diametersInches) {
      const dFeet = dInch / 12;
      const area = Math.PI * Math.pow(dFeet, 2) / 4;
      const rHydraulic =  area / (Math.PI * dFeet);

      // Calculate full-flow capacity (Manning’s equation)
      const capacity = (1 / n) * area * Math.pow(rHydraulic, 2 / 3) * Math.sqrt(slope);

      // Adjust velocity to percent full
      const velocity = flow / (area * percentFull);

      // Debug output
      console.log(`🔍 ${dInch}" pipe: A=${area.toFixed(3)}, R=${rHydraulic.toFixed(3)}, cap=${capacity.toFixed(3)}, vel=${velocity.toFixed(2)}`);

      // If capacity and velocity both valid
      if (capacity >= flow * 0.97 && velocity >= minVelocity && velocity <= maxVelocity) {
        selected = {
          diameter: dInch,
          capacity: capacity.toFixed(2),
          velocity: velocity.toFixed(2),
          area: area.toFixed(3)
        };
        break;
      }
    }

    // Output result
    if (selected) {
      resultDiv.innerHTML = `
        <h3>✅ Suggested Pipe Size (Columbus Standard):</h3>
        <p><strong>Diameter:</strong> ${selected.diameter}"</p>
        <p><strong>Flow Capacity:</strong> ${selected.capacity} cfs</p>
        <p><strong>Velocity:</strong> ${selected.velocity} ft/s</p>
      `;
    } else {
      resultDiv.innerHTML = "<p style='color:red;'>❌ No suitable pipe size found using Columbus standards. Try adjusting slope or flow.</p>";
    }
  });
});
