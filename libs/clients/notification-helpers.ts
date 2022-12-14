import { useEffect } from "react";

export const ContainerId = "notifications__container";

export default function useNotification() {
  useEffect(() => {
    if (!window) return;

    let container = document.querySelector(
      `#${ContainerId}`
    ) as HTMLUListElement;

    // There is no container?
    if (!container) {
      container = document.createElement("ul");
      container.id = `${ContainerId}`;

      container.style.position = "fixed";
      container.style.right = "0px";
      container.style.bottom = "0px";
      container.style.zIndex = "999";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "5px";

      document.body.appendChild(container);
    }

    // Create observer.
    const observer = new MutationObserver((mutations) => {
      const filtered = mutations.filter(
        (mutation) => mutation.type === "childList"
      );

      if (filtered.length && container.children) {
        if (container.children.length) {
          container.style.paddingBottom = "5px";
          container.style.paddingRight = "5px";
        } else {
          container.style.padding = "0px";
        }
      }
    });

    // Subscribe.
    observer.observe(container, { childList: true });

    return () => {
      // Unsubscribe.
      observer.disconnect();
    };
  }, []);
}

export const createNotification = (text: string) => {
  if (!window) return;

  const container = document.querySelector(
    `#${ContainerId}`
  ) as HTMLUListElement;
  if (!container) return;

  const DELETE_SECOND = 3;
  const GAP_SECOND = 1;

  let firstProcessId: number | undefined;
  let secondProcessId: number | undefined;
  let thirdProcessId: number | undefined;

  // Create notification box.
  const notificationItem = document.createElement("li");
  notificationItem.style.position = "relative";
  notificationItem.style.bottom = "-10px";
  notificationItem.style.transition = `all ${GAP_SECOND}s ease-in-out`;
  notificationItem.style.opacity = "0";
  notificationItem.style.padding = "10px 20px";
  notificationItem.style.border = "1px solid #6366f1";
  notificationItem.style.borderRadius = "5px";
  notificationItem.style.backgroundColor = "#6366f1";
  notificationItem.style.color = "white";
  notificationItem.style.fontSize = "0.9rem";
  notificationItem.style.userSelect = "none";
  notificationItem.innerText = text;

  container.appendChild(notificationItem);

  firstProcessId = window.setTimeout(() => {
    addItem(notificationItem);
  }, 10);

  secondProcessId = window.setTimeout(() => {
    hideItem(notificationItem);
  }, DELETE_SECOND * 1000);

  thirdProcessId = window.setTimeout(() => {
    removeItem(container, notificationItem);
  }, DELETE_SECOND * 1000 + GAP_SECOND * 1000);

  function addItem(item: HTMLLIElement) {
    item.style.opacity = "1";
    item.style.transform = "translateY(-10px)";
  }

  function hideItem(item: HTMLLIElement) {
    item.style.opacity = "0";
    item.style.transform = "translate(100%, -10px)";
  }

  function removeItem(container: HTMLUListElement, item: HTMLLIElement) {
    container.removeChild(notificationItem);
  }
};
