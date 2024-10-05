import {
  getItemFromSessionStorage,
  renderImage,
  renderLink,
  renderList,
  renderText,
} from "./common.js";

function renderHotelDetails({ imgUrl, name, rating, amenities, description }) {
  const hotelImg = renderImage({ src: imgUrl, alt: `${name}-image` });
  const bookNowWrapper = document.createElement("div");
  const bookNowLink = renderLink({
    href: "../payment.html",
    target: "_self",
    innerText: "Book Now",
  });
  bookNowWrapper.appendChild(bookNowLink);
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
    bookNowWrapper,
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
