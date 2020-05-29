import fetch from "node-fetch";
import { encode } from "base-64";
import { MD5 } from "crypto-js";
const queryString = require('querystring');

// API VARIABLES
const { MCAPIKEY, MCLIST } = process.env;
const MCREGION = MCAPIKEY.split("-")[1];

// HANDLER METHOD
exports.handler = async (event, context) => {
  
  // ERROR OUT IF API VARIABLES NOT PROVIDED
  if(!MCAPIKEY) {
    console.log(`missing API key`);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'missing API key' })
    }    
  }

  if(!MCLIST) {
    console.log(`missing audience or list ID`);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'missing audience or list ID' })
    }    
  }
  
  // PARSE OUT DATA RECEIVED
  let body = {};
  try {
    body = queryString.parse(event.body);
  } catch (error) {
    body = { error };
  }
  
  // CHECK FOR ERRORS WITH DATA RECEIVED
  if(body.error) {
    console.log(`Parsing error: ${body.error}`);
    return {
      statusCode: 400,
      body: JSON.stringify(body.error)
    }
  }
  
  if(!body.email) {
    console.log(`missing email`);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'missing email' })
    }
  }
  
  const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if(!emailRegex.test(body.email.trim())){
    console.log(`email in wrong format`);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'value entered must be formatted as an email address' })
    }
  }
  
  // DATA TO SEND MAILCHIMP
  // status: "pending" because the list uses double-opt-in, user must confirm
  const subscriberData = {
    email_address: body.email,
    status: "pending",
    merge_fields: {}
  };
  
  // Mailchimp documentation notes username can be a string of anything, i.e. 'anystring'
  const headers = {
    'Authorization': 'Basic ' + encode('anystring' + ":" + MCAPIKEY),
    'Content-Type': 'application/json'
  };
  
  // API ENDPOINT
  const API_ENDPOINT = `https://${MCREGION}.api.mailchimp.com/3.0/lists/${MCLIST}/members`
  
  // FLAG: FORM SUBMITTED WITHOUT JS
  const noJS = event.headers["content-type"] === "application/x-www-form-urlencoded";
  
  // SUBSCRIBE
  try {
    const response = await fetch(API_ENDPOINT, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(subscriberData)}
         )
    const json = await response.json();
    
    if(response.status === 400) {
      if(noJS) {
        let responseHeaders = { Location: '/error.html', 'Cache-Control': 'no-cache'}
        return {statusCode: 302, headers: responseHeaders, body: JSON.stringify({})}
      }
      let responseBody = { emailAdded: false };
      return {statusCode: 200, body: JSON.stringify(responseBody)};
    }
    if(response.status === 200) {
      if(noJS) {
        let responseHeaders = { Location: '/thanks.html', 'Cache-Control': 'no-cache'}
        return {statusCode: 302, headers: responseHeaders, body: JSON.stringify({})}
      }
      let responseBody = { emailAdded: true, email: json.email };
      return {statusCode: 200, body: JSON.stringify(responseBody)};
    }
  }
  catch(error) {
    console.log(error);
    return {statusCode: 422, body: JSON.stringify({ error: String(error) })}
  }
};
