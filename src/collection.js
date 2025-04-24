function openAdjWindow(entryID) {
  let adjWindow = open(
    `/newAdj?entryID=${entryID}`,
    "adjWindow",
    "height=600, width=500, left=200, top=200, menubar=no, resizeable=no, scrollbars=no, status=no"
  );
  adjWindow.onbeforeunload = () => {
    setTimeout(() => {
      location.reload();
    }, 1000);
  };
}
function openDetailWindow(entryID) {
  let detailWindow = open(
    `/details?entryID=${entryID}`,
    "detailWindow",
    "height=600, width=500, left=200, top=200, menubar=no, resizeable=no, scrollbars=no, status=no"
  );
  detailWindow.onbeforeunload = () => {
    setTimeout(() => {
      location.reload();
    }, 1000);
  };
}
window.onload = () => {
  document.getElementById("table").innerHTML +=
    localStorage["PokeTCGPreRender"];
};
