import sgMail from "@sendgrid/mail";
import { dev } from "$app/environment";
import { sendgridConfig } from "../config";
import type { ContactForm } from "./types/ContactForm";

const newRequestTemplateId = "d-175f5868c7c640dead3cc98eba598d87";
// update for vercel env variables. git push required.

let msg: MessageObject = {
  from: {
    name: "South Texas Software",
    email: "notifications@southtexas.software",
  },
  to: ["notifications@southtexas.software"],

  // FOR DEBUG
  // to: ["notifications@southtexas.software"],
};

/**
 * Simple helper function to match the email type to it's template ID - Async
 * @param type template/name of email.
 * @param payload object who's keys match what is expected by it's template.
 */
export async function emailHandler(type: string, payload: ContactForm) {
  //build 'msg' object based on the type and payload details
  switch (type) {
    case "contact":
      msg.templateId = newRequestTemplateId;
      msg.dynamicTemplateData = payload as ContactForm;
      break;
  }

  // d: change to dev if testing other features
  if (dev) {
    console.log("****************** SIMULATING EMAIL PAYLOAD *********************");
    console.error(msg);
  } else {
    sgMail.setApiKey(sendgridConfig.apiKey);
    try {
      //@ts-ignore
      let sgResponse = await sgMail.send(msg);
      console.log(sgResponse);
    } catch (e) {
      console.error(e);
    }
  }
}

// uses typescripts generics to allow for assigning a payload type at the Message level
interface MessageObject<T = { [key: string]: any }> {
  from: { name: string; email: string };
  to: string | string[];
  templateId?: string;
  dynamicTemplateData?: T;
}
