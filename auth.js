const { JWT } = require('google-auth-library');
const path = require('path');

async function getAuthentication() {
  try {
    let serviceAccount = require(path.join(__dirname, 'credential.json'));
    const client = new JWT(
      serviceAccount.client_email,
      null,
      serviceAccount.private_key,
      ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/firebase.messaging']
    );
    const token = await client.authorize();
    return { access_token: token.access_token, project_id: serviceAccount.project_id };
  } catch (err) {
    console.log('#Err, Google Auth,', err);
  }
}

module.exports = { getAuthentication };
