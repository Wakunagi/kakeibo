// DateTextを"YYYY/MM/DD" (/ = divider) の形に変換
function GetDate(dateText, divider) {
  const date = new Date(dateText);
  const YYYY = date.getFullYear();
  const MM = ("00" + (date.getMonth() + 1)).slice(-2);
  const DD = ("00" + date.getDate()).slice(-2);
  return `${YYYY}${divider}${MM}${divider}${DD}`;
}

// DateTextを"YYYY/MM/DD hh;mm:ss"の形に変換
function GetDateTime(dateText) {
  const date = new Date(dateText);
  const YYYY = date.getFullYear();
  const MM = ("00" + (date.getMonth() + 1)).slice(-2);
  const DD = ("00" + date.getDate()).slice(-2);
  const hh = ("00" + date.getHours()).slice(-2);
  const mm = ("00" + date.getMinutes()).slice(-2);
  const ss = ("00" + date.getSeconds()).slice(-2);
  return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`;
}

function IsIgnorTitle(title) {
  return title == TitleId || title == TitleCreate || title == TitleUpdate;
}

function GetSortOrderText(order) {
  return order.IsAscending ? `${order.Title}（昇順）` : `${order.Title}（降順）`;
}