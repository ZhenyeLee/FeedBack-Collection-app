const re =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validateEmails = (emails) => {
  emails = emails.trim();
  if (emails.length !== 0 && emails.charAt(emails.length - 1) === ",") {
    emails = emails.substr(0, emails.length - 1);
  }
  const invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => re.test(email) === false);
  if (invalidEmails.length) {
    return `These emails are invalid : ${invalidEmails}`;
  }
  return;
};

export default validateEmails;
