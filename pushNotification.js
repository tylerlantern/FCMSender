const path = require('path');
const fetch = require('node-fetch');
const { getAuthentication } = require('./auth');

async function pushNotification() {
  try {
    const { access_token, project_id } = await getAuthentication();
    let payloadJSON = require(path.join(__dirname, 'payload.json'));
    const payloadData = {
      ...payloadJSON
    };
    console.log('#FCM:!', JSON.stringify(payloadData));
    console.log(payloadData)
    const response = await fetch(`https://fcm.googleapis.com/v1/projects/${project_id}/messages:send`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`
      },
      method: "POST",
      body: JSON.stringify(payloadData),
    });

    const result = await response.json();
    console.log('Push Notification Response:', result);

  } catch (err) {
    console.log('#Err, Push Notification,', err);
  }
}

module.exports = { pushNotification };
