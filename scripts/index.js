import {
  renderImage,
  renderLink,
  renderText,
  setSessionStorage,
} from "./common.js";

const HomePageContent = document.createElement("div");
const locations = {
  delhi: {
    imgUrl:
      "https://media-cdn.tripadvisor.com/media/photo-s/15/33/fe/a2/new-delhi.jpg",
  },
  goa: {
    imgUrl:
      "https://media-cdn.tripadvisor.com/media/photo-s/15/33/fc/f0/goa.jpg",
  },
  hyderabad: {
    imgUrl:
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/98/f7/df/charminar.jpg",
  },
  kolkata: {
    imgUrl:
      "https://media-cdn.tripadvisor.com/media/photo-s/15/33/fe/ac/kolkata-calcutta.jpg",
  },
};

function renderLocationsList() {
  const ImageContainer = document.createElement("div");
  Object.keys(locations).forEach((location) => {
    if (location === "delhi") {
      const link = renderLink({
        href: "",
        target: "_self",
        innerText: "",
      });
      link.appendChild(
        renderImage({
          src: locations[location]?.imgUrl,
          height: "300",
          width: "300",
          alt: `${location}-img`,
        })
      );
      link.addEventListener("click", (e) => {
        e.preventDefault();
        setSessionStorage({ key: "currentLocation", value: location });
        const origin = window?.location?.origin;
        window.location.href = `${origin}/list.html`;
      });
      ImageContainer.appendChild(link);
    } else {
      ImageContainer.appendChild(
        renderImage({
          src: locations[location]?.imgUrl,
          height: "300",
          width: "300",
          alt: `${location}-img`,
        })
      );
    }
    HomePageContent.appendChild(ImageContainer);
  });
}

export function renderHomepageContent() {
  HomePageContent.appendChild(
    renderText({ text: "Search Bar", component: "div" })
  );
  const contentContainer = document.getElementById("content-div");
  renderLocationsList();
  HomePageContent.appendChild(
    renderLink({ href: "#", target: "_self", innerText: "View more >>" })
  );
  contentContainer.appendChild(HomePageContent);
}
