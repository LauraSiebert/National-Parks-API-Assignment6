'use strict';

const apiKey = 'Zs41bFMswmMsPYPGzgCRL14gss9PjL7GKYYmReke';

// This function gets the parks information by searching tfor the state. 
function getParks(stateInput) {
    console.log(`User searched for '${stateInput}'. Function getUser ran.`);
    const maxResults = parseInt($('#js-max-results').val());
    fetch(`https://developer.nps.gov/api/v1/parks?q=${stateInput}&api_key=${apiKey}`)
      .then(response => response.json())
      .then(searchResults => 
        displayResults(searchResults, maxResults))
      .catch(error => alert(`Something went wrong when getParks ran. Please try again.`));
}

// This function displays the result by slicing the the data array to match the user requested maxResults and then iterates over the array to display matches.
function displayResults(searchResults, maxResults){
    $('#results-list').empty();
    $('#results').removeClass('hidden');
    console.log(`this is maxResults ${maxResults}`);
    let infoArrayData = searchResults.data;
    let infoArray = infoArrayData.slice(0,maxResults);
    return infoArray.forEach(item => {
        let name = item.fullName;
        let description = item.description;
        let website = item.url;
        $('#results-list').append(
            `<h1>Park Name: ${name}</h1>
            <li><strong>Description:</strong> ${description}</li>
            <li><strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></li><br>`
        );
        console.log(`For each on infoArray ran.`)
        });
}

//=======In progress - Trying to get the address to show =================
// function getAddress(parkCode) {
//     console.log(`The parkCode is: '${parkCode}'. Function getAddress ran.`)
//     fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${apiKey}`)
//       .then(response => response.json())
//       .then(codeSearch => 
//         console.log(codeSearch))
//       .catch(error => alert(`Something went wrong when getParks ran. Please try again.`));
// }

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const stateInput = $('#js-search-term').val();
      getParks(stateInput);
    });
  }
  
  $(function() {
      console.log('App loaded! Waiting for submit!');
      watchForm();
  });