import content from "./content.json";

export const { business, hero, about, services, boatLifts, gallery } = content;

export const telHref = `tel:+1${business.phone.replace(/\D/g, "")}`;
export const mailHref = `mailto:${business.email}`;
export const fullAddress = `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`;

export default content;
