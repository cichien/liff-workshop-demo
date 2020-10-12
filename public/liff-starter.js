 // DO NOT CHANGE THIS
let REDIRECT_URI = "";

window.onload = function() {
    const useNodeJS = true;   // if you are not using a node server, set this value to false
    const defaultLiffId = "";   // change the default LIFF value if you are not using a node server

    // DO NOT CHANGE THIS
    let myLiffId = "";

    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                REDIRECT_URI = jsonResponse.redirectUri;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
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
    if (!myLiffId) {
        document.getElementById("liffIdErrorMessage").classList.remove('hidden');
    } else {
        initializeLiff(myLiffId);
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
            // start to use LIFF's api
            initializeApp();
        })
        .catch((err) => {
            console.log(err)
            // document.getElementById("liffInitErrorMessage").classList.remove('hidden');
        });
}

/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    displayLiffData();
    displayIsInClientInfo();
    registerButtonHandlers();
    // check if the user is logged in/out, and disable inappropriate button
    if (liff.isLoggedIn()) {
        document.getElementById('liffLoginButton').disabled = true;
    } else {
        document.getElementById('liffLogoutButton').disabled = true;
    }
}

/**
* Display data generated by invoking LIFF methods
*/
function displayLiffData() {
    document.getElementById('isInClient').textContent = liff.isInClient();
    document.getElementById('isLoggedIn').textContent = liff.isLoggedIn();
}

/**
* Toggle the login/logout buttons based on the isInClient status, and display a message accordingly
*/
function displayIsInClientInfo() {
    if (liff.isInClient()) {
        document.getElementById('liffLoginButton').classList.toggle('hidden');
        document.getElementById('liffLogoutButton').classList.toggle('hidden');
        document.getElementById('isInClientMessage').textContent = 'You are opening the app in the in-app browser of LINE.';
    } else {
        document.getElementById('shareTargetPicker').classList.toggle('hidden');
    }
}

/**
* Register event handlers for the buttons displayed in the app
*/
function registerButtonHandlers() {
    document.getElementById('shareTargetPicker').addEventListener('click', function () {
        const memeContent = {
            "type": "bubble",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "image",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip3.jpg",
                  "size": "full",
                  "aspectMode": "cover",
                  "aspectRatio": "1:1",
                  "gravity": "center"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [],
                  "position": "absolute",
                  "background": {
                    "type": "linearGradient",
                    "angle": "0deg",
                    "endColor": "#00000000",
                    "startColor": "#00000099"
                  },
                  "width": "100%",
                  "height": "40%",
                  "offsetBottom": "0px",
                  "offsetStart": "0px",
                  "offsetEnd": "0px"
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "box",
                          "layout": "horizontal",
                          "contents": [
                            {
                              "type": "text",
                              "text": "Brown Grand Hotel",
                              "size": "xl",
                              "color": "#ffffff"
                            }
                          ]
                        }
                      ],
                      "spacing": "xs"
                    }
                  ],
                  "position": "absolute",
                  "offsetBottom": "0px",
                  "offsetStart": "0px",
                  "offsetEnd": "0px",
                  "paddingAll": "20px"
                }
              ],
              "paddingAll": "0px"
            }
          };
        if (liff.isApiAvailable('shareTargetPicker')) {
            liff.shareTargetPicker([{
                "type": "flex",
                "altText": "Flex Message",
                "contents": {
                  "type": "bubble",
                  "body": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "md",
                    "contents": [
                      {
                        "type": "text",
                        "text": "BROWN'S ADVENTURE",
                        "size": "xl",
                        "gravity": "center",
                        "weight": "bold",
                        "wrap": true
                      },
                      {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "sm",
                        "margin": "lg",
                        "contents": [
                          {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                              {
                                "type": "text",
                                "text": "Date",
                                "flex": 1,
                                "size": "sm",
                                "color": "#AAAAAA"
                              },
                              {
                                "type": "text",
                                "text": "Monday 25, 9:00PM",
                                "flex": 4,
                                "size": "sm",
                                "color": "#666666",
                                "wrap": true
                              }
                            ]
                          },
                          {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                              {
                                "type": "text",
                                "text": "Place",
                                "flex": 1,
                                "size": "sm",
                                "color": "#AAAAAA"
                              },
                              {
                                "type": "text",
                                "text": "LINE Thailand",
                                "flex": 4,
                                "size": "sm",
                                "color": "#666666",
                                "wrap": true
                              }
                            ]
                          },
                          {
                            "type": "box",
                            "layout": "vertical",
                            "margin": "xxl",
                            "contents": [
                              {
                                "type": "spacer"
                              },
                              {
                                "type": "image",
                                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/linecorp_code_withborder.png",
                                "size": "xl",
                                "aspectMode": "cover"
                              },
                              {
                                "type": "text",
                                "text": "You can enter the theater by using this code instead of a ticket",
                                "margin": "xxl",
                                "size": "xs",
                                "color": "#AAAAAA",
                                "wrap": true
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                }
              }]).then(function(res) {
                alert(`[${result.status}] Message sent!`)
            }).catch(function (res) {
                console.error(res)
            });
        }
    });

    // login call, only when external browser is used
    document.getElementById('liffLoginButton').addEventListener('click', function() {
        if (!liff.isLoggedIn()) {
            if (!REDIRECT_URI) {
                liff.login();
            } else {
                liff.login({ redirectUri: REDIRECT_URI });
            }            
        }
    });

    // logout call only when external browse
    document.getElementById('liffLogoutButton').addEventListener('click', function() {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });
}

/**
* Toggle specified element
* @param {string} elementId The ID of the selected element
*/
function toggleElement(elementId) {
    const elem = document.getElementById(elementId);
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = 'none';
    } else {
        elem.style.display = 'block';
    }
}
