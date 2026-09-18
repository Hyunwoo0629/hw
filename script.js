const dialog = document.querySelector("[data-film-dialog]");
const frame = document.querySelector("[data-video-frame]");
const closeButton = document.querySelector("[data-film-close]");
const externalLink = document.querySelector("[data-film-external]");
const dialogTitle = document.querySelector("#film-dialog-title");
let activeTrigger = null;

const closeFilm = () => {
  if (dialog?.open) dialog.close();
};

document.querySelectorAll(".film-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const { platform, video, url } = trigger.dataset;
    const title = trigger.querySelector(".film-info strong")?.textContent || "Film player";
    const source =
      platform === "vimeo"
        ? `https://player.vimeo.com/video/${video}?autoplay=1&title=0&byline=0&portrait=0`
        : `https://www.youtube-nocookie.com/embed/${video}?autoplay=1&rel=0`;

    const iframe = document.createElement("iframe");
    iframe.src = source;
    iframe.title = `${title} video player`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    activeTrigger = trigger;
    frame?.replaceChildren(iframe);
    if (dialogTitle) dialogTitle.textContent = title;
    if (externalLink) externalLink.href = url;
    dialog?.showModal();
    document.body.classList.add("dialog-open");
  });
});

closeButton?.addEventListener("click", closeFilm);

dialog?.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();
  const outside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;
  if (outside) closeFilm();
});

dialog?.addEventListener("close", () => {
  frame?.replaceChildren();
  document.body.classList.remove("dialog-open");
  activeTrigger?.focus();
  activeTrigger = null;
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
