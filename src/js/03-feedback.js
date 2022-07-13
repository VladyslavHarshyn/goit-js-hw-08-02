import throttle from "lodash.throttle";

const CONTACT_FORM_LOCAL_STORAGE_KEY = "formData";
const feedbackForm = document.querySelector(".feedback-form");
const formData = {};

console.dir(localStorage);

const fillContactForm = () => {
  const formDataLclEl = JSON.parse(
    localStorage.getItem(CONTACT_FORM_LOCAL_STORAGE_KEY)
  );
  const formUnit = feedbackForm.elements;

  for (const key in formDataLclEl) {
    if (formDataLclEl.hasOwnProperty(key)) {
      formUnit[key].value = formDataLclEl[key];
    }
  }
};

const onContactFocusChange = throttle((event) => {
  const { target } = event;

  const formTargetName = target.name;

  const formTarget = target.value;

  formData[formTargetName] = formTarget;
  localStorage.setItem("formData", JSON.stringify(formData));
}, 500);

const submit = (event) => {
  event.preventDefault();

  const { email, message } = event.target;

  if (email.value === "" || message.value === "") {
    return alert("Oopsie, you missed some info. Complete the form to submit");
  }

  const obj = {
    email: feedbackForm.email.value,
    message: feedbackForm.message.value,
  };

  console.log(obj);
  localStorage.removeItem("formData");
  event.currentTarget.reset();
};

feedbackForm.addEventListener("submit", submit);

feedbackForm.addEventListener("input", onContactFocusChange);

fillContactForm(feedbackForm);
