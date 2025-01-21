import { type Timestamp } from "firebase/firestore";

/**
 * Object structure of a user of the RMS
 */
export interface User {
  id: string;

  name?: string;

  email?: string;
  last_login?: Timestamp;

  role?: UserRole; // not super important atm.

  settings?: {
    prefers_color_scheme: string; // light | dark
    mobile_quick_links: MobileLink[]; // used to customize the footer of the mobile navigation

    [key: string]: any;
  };

  unit_owner?: boolean;
}

export enum UserRole {
  admin,
  owner,
  manager,
  contributor,
  reviewer,
  limited,
}

interface MobileLink {
  path: string;
  index: number;
  label: string;
}
