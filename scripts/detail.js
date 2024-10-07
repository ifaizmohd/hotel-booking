import {
  getItemFromSessionStorage,
  renderButton,
  renderForm,
  renderFormField,
  renderImage,
  renderLink,
  renderList,
  renderText,
} from "./common.js";

const onClick = (e) => {
  e.preventDefault();
  const noOfAdults = document.getElementById("adults").value;
  const name = document.getElementById("name").value;
  const fromDate = document.getElementById("from-date").value;
  const toDate = document.getElementById("to-date").value;
  if (noOfAdults && name && fromDate && toDate) {
    const redirectedUrl = `payment.html?adults=${noOfAdults}&name=${name}&fromDate=${fromDate}&toDate=${toDate}`;
    window.location.href = redirectedUrl;
  }
};

function renderBookingForm() {
  const noOfAdults = renderFormField({
    labelText: "Adults: ",
    fieldName: "adults",
    type: "number",
    required: true,
    min: 1,
    value: 1,
  });
  const name = renderFormField({
    labelText: "Name: ",
    fieldName: "name",
    type: "text",
    required: true,
  });
  const fromDate = renderFormField({
    labelText: "From Date: ",
    fieldName: "from-date",
    type: "date",
    required: true,
  });
  const toDate = renderFormField({
    labelText: "To Date: ",
    fieldName: "to-date",
    type: "date",
    required: true,
  });
  const total = renderFormField({
    labelText: "Total: ",
    fieldName: "total",
    type: "number",
    required: true,
    disabled: true,
  });
  const bookNowButton = renderButton({ label: "Book Now", type: "submit" });
  const form = renderForm({ action: onClick });
  form.append(noOfAdults, name, fromDate, toDate, total, bookNowButton);
  return form;
}

function renderHotelDetails({ imgUrl, name, rating, amenities, description }) {
  const hotelImg = renderImage({ src: imgUrl, alt: `${name}-image` });
  const hotelName = renderText({ text: name, component: "h3" });
  const ratingLabel = renderText({ text: "RATING", component: "div" });
  const hotelRating = renderText({ text: rating, component: "p" });
  const amenitiesLabel = renderText({ text: "AMENITIES", component: "div" });
  const amenitiesList = renderList(amenities, "ul");
  const descriptionLabel = renderText({
    text: "DESCRIPTION",
    component: "div",
  });
  const hotelDescription = renderText({ text: description, component: "p" });
  const detailContainer = document.createElement("div");
  detailContainer.append(
    hotelImg,
    renderBookingForm(),
    hotelName,
    ratingLabel,
    hotelRating,
    amenitiesLabel,
    amenitiesList,
    descriptionLabel,
    hotelDescription
  );
  return detailContainer;
}

export function renderDetailsPageContent() {
  const hotel = getItemFromSessionStorage("currentHotel");
  if (hotel) {
    const contentContainer = document.getElementById("content-div");
    contentContainer.appendChild(renderHotelDetails({ ...hotel }));
  }
}
