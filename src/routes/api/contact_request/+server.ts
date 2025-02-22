import { json, error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { emailHandler } from "$lib/email";
import type { ContactForm } from "$lib/types/ContactForm";

interface RequestData {
  [key: string]: string | null;
}

export const POST = (async ({ request }) => {
  const requestData = (await request.json()) as ContactForm;

  console.log("Server received a contact request form to the API : ", requestData);

  let responseJson = {
    error: false,
    code: "",
  };

  try {
    await emailHandler("contact", requestData);
  } catch (e) {
    responseJson.error = true;
    responseJson.code = e as string;
  }

  return json(responseJson);
}) satisfies RequestHandler;
