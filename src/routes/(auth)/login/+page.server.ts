import type { Actions } from "./$types";

//TODO: max retries on frontend should trigger the ip address save event here.
/**
 * default action only reached after successful login from frontend
 **/
export const actions = {
  default: async (event) => {
    let clientIP = event.getClientAddress();

    const formData = await event.request.formData();

    let formObject: { [key: string]: string } = {};
    for (let [key, value] of formData) {
      formObject[key] = value as string;
    }

    let event_desc = `${formObject.email} logged in from ${clientIP}`;

    return { event_description: event_desc };
  },
} satisfies Actions;
