/**
 * Canonical contact data source for PDC Valve & Actuators.
 *
 * All contact information used across the site should import from here.
 * Only verified information already present in the project is included.
 * Unavailable fields are null — do not invent values.
 */

export interface ContactData {
  companyName: string;
  generalEmail: string;
  engineeringEmail: string | null;
  salesEmail: string | null;
  phone: string;
  fax: string | null;
  streetAddress: string;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  businessHours: string | null;
  mapUrl: string | null;
  directionsUrl: string | null;
}

export const contactData: ContactData = {
  companyName: 'PDC Valve & Actuators',
  generalEmail: 'sales@pdcvalve.com',
  engineeringEmail: null,
  salesEmail: 'sales@pdcvalve.com',
  phone: '+1 724-695-3440',
  fax: '+1 724-695-8635',
  streetAddress: '1075 Montour West Industrial Park',
  city: 'Coraopolis',
  state: 'PA',
  postalCode: '15108',
  country: 'United States',
  businessHours: null,
  mapUrl: null,
  directionsUrl: null,
};