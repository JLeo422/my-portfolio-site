<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pipe Sizing Tool</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>🛠 Pipe Sizing Tool</h1>

  <form id="pipeForm">
    <label>Flow rate (Q) [cfs]: <input type="number" id="flowRate" step="0.01" required /></label><br>
    <label>Slope (S) [ft/ft]: <input type="number" id="slope" step="0.0001" required /></label><br>
    <label>Manning's n:
      <select id="manningN">
        <option value="0.013">Concrete (0.013)</option>
        <option value="0.015">PVC (0.015)</option>
        <option value="0.012">Steel (0.012)</option>
      </select>
    </label><br>
    <label>Pipe Diameter [in]: <input type="number" id="diameter" required /></label><br>
    <button type="submit">Calculate</button>
  </form>

  <div id="results"></div>

  <script src="script.js"></script>
</body>
</html>
