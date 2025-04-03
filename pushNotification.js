const path = require('path');
const fetch = require('node-fetch');
const { getAuthentication } = require('./auth');

async function pushNotification() {
  const { access_token, project_id } = await getAuthentication();
  let input = require(path.join(__dirname, 'input.json'));
  const { tokens, title, body } = input

  for (const token of tokens) {
    const payloadJSON = {
      message: {
        token: token,
        data: {
          voucherRedemption: "{\"placeId\":1716,\"placeName\":\"Prae Jecko Gecko Lover\",\"firstName\":\"Tyler\",\"lastName\":\"Lantern\",\"voucherId\":3220,\"status\":\"valid\",\"alertId\":32860,\"voucherCode\":\"VC-Y7D6-JZ42\",\"savedDate\":\"2024-12-11T11:11:47.000Z\",\"usedDate\":\"2024-12-12T04:26:33.000Z\",\"rejectedDate\":null,\"expiredDate\":\"2024-12-31T16:59:59.000Z\",\"voucherTitle\":\"Eat\",\"createdAt\":\"1733977594\"}"
        },
        notification: {
          title: "Star light",
          body: "FCKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK"
        },
        apns: {
          payload: {
            aps: {
              "mutable-content": 1,
              "content-available": 1
            }
          }
        }
      }
    }
    console.log('#FCM:', JSON.stringify(payloadJSON));
    const response = await fetch(`https://fcm.googleapis.com/v1/projects/${project_id}/messages:send`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`
      },
      method: "POST",
      body: JSON.stringify(payloadJSON),
    });
    const result = await response.json();
    console.log('Push Notification Response:', result);
    console.log('------------------------------------------------------------------------------')
  }

}

module.exports = { pushNotification };
