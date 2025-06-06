// Pipe Sizing and Runoff Calculator

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pipeForm");
  const resultDiv = document.getElementById("results");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const flow = parseFloat(document.getElementById("flow").value);
    const slope = parseFloat(document.getElementById("slope").value);
    const n = parseFloat(document.getElementById("n").value);

    if (isNaN(flow) || isNaN(slope) || isNaN(n) || flow <= 0 || slope <= 0 || n <= 0) {
      resultDiv.innerHTML = "<p style='color:red;'>Please enter valid positive numbers for all fields.</p>";
      return;
    }

    const diametersInches = [6, 8, 10, 12, 15, 18, 21, 24, 30, 36];
    let selected = null;

    for (let dInch of diametersInches) {
      const dFeet = dInch / 12;
      const area = Math.PI * Math.pow(dFeet, 2) / 4;
      const rHydraulic = dFeet / 4;
      const capacity = (1 / n) * area * Math.pow(rHydraulic, 2 / 3) * Math.sqrt(slope);

      if (capacity >= flow) {
        selected = {
          diameter: dInch,
          capacity: capacity.toFixed(2),
          area: area.toFixed(3),
          velocity: (flow / area).toFixed(2)
        };
        break;
      }
    }

    if (selected) {
      resultDiv.innerHTML = `
        <h3>✅ Suggested Pipe Size:</h3>
        <p><strong>Diameter:</strong> ${selected.diameter}"</p>
        <p><strong>Flow Capacity:</strong> ${selected.capacity} cfs</p>
        <p><strong>Velocity:</strong> ${selected.velocity} ft/s</p>
      `;
    } else {
      resultDiv.innerHTML = "<p style='color:red;'>❌ No suitable pipe size found. Try adjusting the inputs.</p>";
    }
  });
});
