export interface ContactForm {
  id: string;
  created: number;

  name: string;
  phone: string;
  email?: string;
  details?: string;

  startDate?: string;
  endDate?: string;

  //stores the page / link that referred submitter
  referrer?: string;

  contactPreference?: string;
}
