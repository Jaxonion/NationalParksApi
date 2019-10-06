function submitButtonPressed() {
    $('body').on('click', '.submitButton', event => {
      console.log('submit button clicked')
      $('.itemsList').empty()
      createUrl()
    })
  }
  
  function createUrl() {
    let baseUrl = 'https://developer.nps.gov/api/v1/parks?api_key=tbhr79aQkGtHtigjDIKAKFJni441qh0kGlbUehPg'
    let searchValue = 'stateCode=' + $('.searchBox').val()
    let searchValue2 = 'stateCode=' + $('.searchBox2').val()
    let fullSearchValue = searchValue + '&' + searchValue2
    
    let searchLimit = 'limit=' + $('.maxResults').val()
    let fullUrl = baseUrl + '&' + fullSearchValue + '&' + searchLimit
    console.log(fullUrl)
  
    fetchUrl(fullUrl)
  }
  
  function fetchUrl(fullUrl) {
    console.log(`'fetchUrl' function ran`)
    fetch(fullUrl)
    .then(response => {
      if (response.ok) {
        return response
      }
      else {
        throw new Error('error')
      }
    })
    .then(response => response.json())
    .then(responseJson => displayResponse(responseJson))
  
    }
  
    function displayResponse(responseJson) {
      console.log(responseJson);
      console.log(`'displayResponse' function ran`)
      let maxLimit = $('.maxResults').val()
      console.log(maxLimit)
      $('h1').removeClass('hidden')
      //console.log(responseJson)
      for (i = 0; i < maxLimit; i++){
        //console.log(i);
        //console.log(responseJson.data[i].fullName)
        $('.itemsList').append(`<li class='listItem'><a href='${responseJson.data[i].url}'>${responseJson.data[i].fullName}</a><p>Description: ${responseJson.data[i].description}</p><p>Directions: ${responseJson.data[i].directionsInfo}</p></li>`)
      }
    }
      
  
    submitButtonPressed();