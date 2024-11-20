
  
 fetch('predictions.json')
  .then(response => response.json())
  .then(data => {
    // Clear previous content (if any)
    document.getElementById('matches-container').innerHTML = '';

    // Loop through each match in the JSON data
    data.forEach(matchData => {
      const matchDiv = document.createElement('div');
      matchDiv.innerHTML = `
        <div>${matchData.match}</div>
        <div class="table-responsive mt-2">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Shots on target</th>
                <th>Corner-Kick</th>
                <th>Fouls</th>
                <th>Yellow Card</th>
                <th>Throw-ins</th>
                <th>Saves</th>
                <th>Offsides</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><select>${Object.entries(matchData.stats.ShotsOnTarget).map(([key, value]) => `<option>${key} = ${value}</option>`).join('')}</select></td>
                <td><select>${Object.entries(matchData.stats.CornerKick).map(([key, value]) => `<option>${key} = ${value}</option>`).join('')}</select></td>
                <td><select>${Object.entries(matchData.stats.Fouls).map(([key, value]) => `<option>${key} = ${value}</option>`).join('')}</select></td>
                <td><select>${Object.entries(matchData.stats.YellowCard).map(([key, value]) => `<option>${key} = ${value}</option>`).join('')}</select></td>
                <td><select>${Object.entries(matchData.stats.ThrowIns).map(([key, value]) => `<option>${key} = ${value}</option>`).join('')}</select></td>
                <td><select>${Object.entries(matchData.stats.Saves).map(([key, value]) => `<option>${key} = ${value}</option>`).join('')}</select></td>
                <td><select>${Object.entries(matchData.stats.Offsides).map(([key, value]) => `<option>${key} = ${value}</option>`).join('')}</select></td>
              </tr>
            </tbody>
          </table>
        </div>
      `;

      // Append matchDiv to the container
      document.getElementById('matches-container').appendChild(matchDiv);
    });
  })
  .catch(error => console.error('Error fetching data:', error));

  // Check if the user is logged in by looking for the token
const authToken = localStorage.getItem("authToken");

if (!authToken) {
  // If there's no token, redirect the user to the login page
  window.location.href = "/login.html";  // Modify the path as needed
} else {
  // The user is logged in, proceed with showing the dashboard, etc.
  console.log("User is logged in");
}


document.getElementById("logoutButton").addEventListener("click", () => {
    // Clear the token from LocalStorage
    localStorage.removeItem("authToken");
  
    // Redirect to the login page
    window.location.href = "/login.html";
  });
  
