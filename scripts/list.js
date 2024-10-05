import {
  getItemFromSessionStorage,
  renderImage,
  renderLink,
  renderText,
  setSessionStorage,
} from "./common.js";

const hotels = [
  {
    name: "Radisson Blu Hotel",
    imgUrl:
      "https://media-cdn.tripadvisor.com/media/photo-w/17/b3/09/b4/by-the-poolside.jpg",
    rating: "5 star",
    location: "Delhi",
    amenities: [
      "Room Service",
      "Restaurant",
      "Business Center",
      "Fitness center",
      "Pool",
    ],
    description: "lorem ipsum hotel description",
    ranking: "#38 of 1,289 hotels in New Delhi",
    address: "National Highway 8, New Delhi 110017 India",
  },
  {
    name: "The Lalit New Delhi",
    imgUrl:
      "https://media-cdn.tripadvisor.com/media/photo-w/15/06/31/5f/facade.jpg",
    rating: "5 star",
    location: "Delhi",
  },
  {
    name: "Taj Palace",
    imgUrl:
      "https://media-cdn.tripadvisor.com/media/photo-w/1b/4e/9b/11/exterior.jpg",
    rating: "5 star",
    location: "Delhi",
  },
];

function renderHotel({ imgUrl, rating, name }) {
  const location = getItemFromSessionStorage("currentLocation");
  const hotelContainer = document.createElement("div");
  const hotelImg = renderImage({ src: imgUrl, alt: `${name}-image` });
  const hotelName = renderText({ text: name, component: "h3" });
  const hotelRating = renderText({ text: rating, component: "div" });
  const hotelLocation = renderText({ text: location, component: "div" });
  hotelContainer.append(hotelImg, hotelName, hotelRating, hotelLocation);
  return hotelContainer;
}

function renderHotelLists() {
  const HotelListContainer = document.createElement("div");
  hotels.forEach((hotel) => {
    if (hotel.name === "Radisson Blu Hotel") {
      const detailsLink = renderLink({
        href: "",
        target: "_self",
        innerText: "",
      });
      detailsLink.appendChild(renderHotel({ ...hotel }));
      detailsLink.addEventListener("click", (e) => {
        e.preventDefault();
        setSessionStorage({ key: "currentHotel", value: hotel });
        const origin = window?.location?.origin;
        window.location.href = `${origin}/detail.html`;
      });
      HotelListContainer.appendChild(detailsLink);
    } else {
      HotelListContainer.appendChild(renderHotel({ ...hotel }));
    }
  });
  return HotelListContainer;
}

function renderListPageLinks() {
  const links = ["List View", "Map View"];
  const listPageLinks = document.createElement("div");
  links.forEach((link) => {
    const linkContainer = document.createElement("div");
    linkContainer.appendChild(
      renderLink({ href: "#", target: "_self", innerText: link })
    );
    listPageLinks.appendChild(linkContainer);
  });
  return listPageLinks;
}

function renderMap() {
  const mapComponent = document.createElement("div");
  mapComponent.appendChild(
    renderImage({
      src: "https://cdn.pixabay.com/photo/2018/01/31/05/43/web-3120321_960_720.png",
      alt: "Map Image",
    })
  );
  mapComponent.appendChild(renderText({ text: "MAP VIEW", component: "div" }));
  return mapComponent;
}

export function renderListPageContent() {
  const contentContainer = document.getElementById("content-div");
  contentContainer.append(
    renderListPageLinks(),
    renderHotelLists(),
    renderMap()
  );
}
