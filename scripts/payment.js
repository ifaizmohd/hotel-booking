import {
  capitalizeFirstLetter,
  getItemFromSessionStorage,
  renderImage,
  renderLink,
  renderText,
} from "./common.js";

const userDetails = {
  name: "John Doe",
  number_of_Adults: 2,
  check_In_Date: "06/06/2020",
  check_Out_Date: "08/06/2020",
  tarrif_Breakdown: "Rs. 1000 x 2 Adults x 5 Nights",
  total_Amount: "Rs. 10000",
};

function renderUserDetails() {
  const userDetailsContainer = document.createElement("div");
  Object.keys(userDetails).forEach((key) => {
    const container = document.createElement("p");
    container.append(
      renderText({ text: `${capitalizeFirstLetter(key)}: `, component: "b" }),
      renderText({ text: userDetails[key], component: "span" })
    );
    userDetailsContainer.append(container);
  });
  return userDetailsContainer;
}

export function renderPaymentContent() {
  const contentContainer = document.getElementById("content-div");
  const currentHotel = getItemFromSessionStorage("currentHotel");
  contentContainer.append(
    renderImage({
      src: currentHotel.imgUrl,
      alt: `${currentHotel.name}-image`,
    }),
    renderText({ text: currentHotel?.name, component: "h3" }),
    renderText({ text: currentHotel?.ranking, component: "p" }),
    renderText({ text: currentHotel?.address, component: "p" }),
    renderUserDetails(),
    renderLink({ href: "#", target: "_self", innerText: "Pay Now" })
  );
}
