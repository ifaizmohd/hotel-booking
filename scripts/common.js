import { renderDetailsPageContent } from "./detail.js";
import { renderHomepageContent } from "./index.js";
import { renderListPageContent } from "./list.js";
import { renderPaymentContent } from "./payment.js";

const GlobalHeader = document.createElement("div");
const GlobalFooter = document.createElement("div");
const socialMedia = {
  facebook: {
    url: "https://facebook.com",
    imgUrl: "../assests/images/facebook.png",
  },
  instagram: {
    url: "https://instagram.com",
    imgUrl: "../assests/images/instagram.png",
  },
  twitter: {
    url: "https://twitter.com",
    imgUrl: "../assests/images/twitter.png",
  },
};

export function setAttributes(attributes = {}, element) {
  if (Object.keys(attributes).length && element) {
    Object.keys(attributes).forEach((attr) => {
      element.setAttribute(attr, attributes[attr]);
    });
  }
}

export function setSessionStorage({ key, value }) {
  if (window && window.sessionStorage) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
}

export function getItemFromSessionStorage(key) {
  if (window && window.sessionStorage) {
    return JSON.parse(window.sessionStorage.getItem(key));
  }
  return null;
}

export function capitalizeFirstLetter(string) {
  const strArr = string.split("_");
  return strArr
    .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
    .join(" ");
}

export function renderImage({ src, height, width, alt }) {
  const image = document.createElement("img");
  setAttributes({ src, height, width, alt }, image);
  return image;
}

function renderLogo() {
  return renderImage({
    src: "../assests/images/logo.png",
    height: "100",
    width: "150",
    alt: "brand logo",
  });
}

export function renderLink({ href, target = "_self", innerText }) {
  const link = document.createElement("a");
  setAttributes({ href, target }, link);
  link.innerText = innerText;
  return link;
}

export function renderText({ text, component }) {
  const textComponent = document.createElement(component);
  textComponent.innerText = text;
  return textComponent;
}

export function renderList(items, type) {
  if (Array.isArray(items) && items.length) {
    const listContainer = document.createElement(type);
    items.forEach((item) => {
      const li = document.createElement("li");
      li.innerText = item;
      listContainer.appendChild(li);
    });
    return listContainer;
  }
  return document.createElement("div");
}

function renderGlobalHeader() {
  const headerDiv = document.getElementsByClassName("header-div")[0];
  GlobalHeader.appendChild(renderLogo());
  GlobalHeader.appendChild(
    renderLink({ href: "../login.html", target: "_blank", innerText: "Login" })
  );
  headerDiv.appendChild(GlobalHeader);
}

function renderFooter() {
  const contactUsLink = renderLink({
    href: "../contact.html",
    target: "_blank",
    innerText: "Contact Us",
  });
  GlobalFooter.appendChild(contactUsLink);
  const socialMediaContainer = document.createElement("div");
  Object.keys(socialMedia).forEach((handler) => {
    const link = renderLink({
      href: socialMedia[handler]?.url,
      target: "_blank",
      innerText: "",
    });
    link.appendChild(
      renderImage({
        src: socialMedia[handler]?.imgUrl,
        height: "20",
        width: "22",
        alt: `${handler}-logo`,
      })
    );
    socialMediaContainer.appendChild(link);
  });
  GlobalFooter.appendChild(socialMediaContainer);
  GlobalFooter.appendChild(
    renderText({ text: "© 2020 ROOM SEARCH PVT. LTD.", component: "div" })
  );
  const footerContainer = document.getElementById("footer-div");
  footerContainer.appendChild(GlobalFooter);
}

window.addEventListener("load", () => {
  const pathname = window?.location?.pathname;
  renderGlobalHeader();
  if (pathname.includes("index.html")) {
    renderHomepageContent();
  } else if (pathname.includes("list.html")) {
    renderListPageContent();
  } else if (pathname.includes("detail.html")) {
    renderDetailsPageContent();
  } else if (pathname.includes("payment.html")) {
    renderPaymentContent();
  }
  renderFooter();
});
