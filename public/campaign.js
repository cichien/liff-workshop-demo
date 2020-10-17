
// DO NOT CHANGE THIS
let PROFILE = null;

window.onload = function () {
  const useNodeJS = true;   // if you are not using a node server, set this value to false
  const defaultLiffId = "";   // change the default LIFF value if you are not using a node server

  // DO NOT CHANGE THIS
  let myLiffId = "";

  // if node is used, fetch the environment variable and pass it to the LIFF method
  // otherwise, pass defaultLiffId
  if (useNodeJS) {
    fetch('/send-id')
      .then(function (reqResponse) {
        return reqResponse.json();
      })
      .then(function (jsonResponse) {
        myLiffId = jsonResponse.id;
        initializeLiffOrDie(myLiffId);
      })
      .catch(function (error) {
        console.error(error)
      });
  } else {
    myLiffId = defaultLiffId;
    initializeLiffOrDie(myLiffId);
  }
};

/**
* Check if myLiffId is null. If null do not initiate liff.
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiffOrDie(myLiffId) {
  if (myLiffId) {
    initializeLiff(myLiffId);
  } else {
    console.error('please set your liff Id in application!')
  }
}

/**
* Initialize LIFF
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiff(myLiffId) {
  liff
    .init({
      liffId: myLiffId
    })
    .then(() => {
      if (!liff.isLoggedIn()) {
        liff.login();    
        return
      }
      joinCampaign();      
    })
    .catch((err) => {
      console.log(err)
    });
}

function joinCampaign() {
  const params = new URL(location).searchParams;
  const campaignId = params.get('campaignId');
  const isJoin = params.get('isJoin');
  liff.getProfile().then((result) => {
    const uid = result.userId;
    const name = result.displayName;
    fetch('/campaigns/' + campaignId + '/join', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        uid,
        name,
        isJoin
      })
    }).then(function (result) {
      return result.json();
    }).then(function (result){
      if (result.is_join) {
        alert('已參加');
      } else {
        alert('無法參加');
      }
      liff.closeWindow();
    })
      
  });
}
