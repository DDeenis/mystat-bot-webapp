const scheduleTodayBtn = document.getElementById("schedule-today");

scheduleTodayBtn.addEventListener("click", () => {
  const newElem = document.createElement("button");
  newElem.textContent = "Created using javascript";
  newElem.classList.add("main-menu-actions__button");
  scheduleTodayBtn.insertAdjacentElement("afterend", newElem);
  scheduleTodayBtn.textContent = "Test";
});
