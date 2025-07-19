const url_start = "https://script.google.com/macros/s/";
const url_end = "/exec";


const titleId = "id";
const titleCreate = "create";
const titleUpdate = "update";
const titleDate = "date";
const titleAmount = "amount";
const titlePurpose = "purpose";
const titleTag = "tag";
const titlePay = "pay";
const titleItem = "item";
const titleNote = "note";

const TITLE_LIST = [titleId, titleCreate, titleUpdate, titleDate, titleAmount, titlePay, titlePurpose, titleTag, titleItem, titleNote];
const htmlTagTitleList = [titleTag, titlePurpose, titlePay];

const PopupWindowTagNumber = {
  PostData: 0,
  TagSelect: 1,
}
const PopupWindowTag = [`PostData`, `TagSelect`];

let List = [];
let Tags = {};
let Search = {};

let deproyKey = "";
let url = "";

let SearchDate = {};

let first_html = "";

let isGetLocalStrage = false;

let PopupWindow = null;

function SetPopupWindow(tag) {

  PopupWindow = document.getElementById("PopUpWindow");
  PopupWindow.className = `${dispClassName}`;

  var tagElement = null;
  for (var item of PopupWindowTag) {
    var element = document.getElementById(item);
    if (item == PopupWindowTag[tag]) {
      element.className = element.id;
      tagElement = element;
    }
    else {
      element.className = hideClassName;
    }
  }

  return tagElement;
}

//htmlファイルが読み込まれた時に呼ばれる
window.onload = onLoad;
function onLoad() {
  console.log("Load Start");
  const ls = localStorage.getItem("url");
  if (ls != "") {
    localStorage = true;
    loadingGSS(ls);
  }
}

function Submit() {
  var input = document.getElementById("keyInput");
  loadingGSS(input.value);
}

function LogOut() {
  localStorage.setItem("url", "");
  const htmlId = document.getElementById("Records");
  htmlId.innerHTML = first_html;
  document.getElementById("Search").innerHTML = "";
}

//GSSからJsonを取得して変数に保存
async function loadingGSS(_deproyKey) {
  deproyKey = _deproyKey;
  const htmlId = document.getElementById("Records");
  first_html = htmlId.innerHTML;

  try {
    htmlId.innerHTML = "<p>Loading...</p>";
    const records = await fetch(url_start + _deproyKey + url_end);
    url = url_start + _deproyKey + url_end;
    List = await records.json();

    console.log(List);
    CreateHtml(List);
    CreateTag();
    CretateTagHtml();

    localStorage.setItem("url", _deproyKey);
  } catch (error) {
    console.log("Error!");
    console.error(error);
    if (isGetLocalStrage) {
      localStorage.setItem("url", "");
    }
    htmlId.innerHTML = first_html;
  }
}

function GetDate(_date, divider) {
  const date = new Date(_date);
  const yyyy = date.getFullYear();
  const mm = ("00" + (date.getMonth() + 1)).slice(-2);
  const dd = ("00" + date.getDate()).slice(-2);
  return `${yyyy}${divider}${mm}${divider}${dd}`;
}

function CreateHtml(list) {
  list.sort(function (a, b) {
    if (a[titleDate] > b[titleDate]) {
      return 1;
    } else {
      return -1;
    }
  });

  const htmlId = document.getElementById("Records");

  var sum = 0;
  var html = "";

  html += `<table border="0" style="margin:  0 auto;">`;

  html += `<tr>`;

  html += `<th class="calum row${0}">編集</th>`;
  for (title of TITLE_LIST) {
    if (IsIgnorTitle(title)) continue;

    html += `<th class="calum row${0}">${title}</th>`;
  }
  html += "</tr>";

  for (let i in list) {
    item = list[i];
    sum += item[titleAmount];
    html += `<tr>`;
    html += `<td class="calum ${classTag} row${i % 2 + 1}">`
    html += `<button class="editButton" onclick="CreatePopUp(${item[titleId]})">編集</button>`;
    html += `</td>`;
    for (let index in TITLE_LIST) {
      const title = TITLE_LIST[index];

      if (IsIgnorTitle(title)) continue;

      let str = item[title];
      if (title == titleDate) {
        str = GetDate(item[titleDate], '/');
      }
      var classTag = "";

      if (index == 0) {
        classTag = "first";
      }
      else if (index == TITLE_LIST.length - 1) {
        classTag = "last";
      }

      html += `<td class="calum ${classTag} row${i % 2 + 1}">${str}</td>`;
    }
    html += "</tr>";
  }

  html += `</table>`;

  html = `<div align="center"><div class = "sumText">合計:${sum}</div></div>` + html;
  htmlId.innerHTML = html;
}

function CreateTag() {
  var _tag = {};
  for (title of TITLE_LIST) {
    _tag[title] = [];
  }

  for (object of List) {
    for (title of TITLE_LIST) {
      var str = "" + object[title];
      var ts = str.split(", ");
      for (t of ts) {
        _tag[title].push(t);
      }
    }
  }

  for (title of TITLE_LIST) {
    Tags[title] = Array.from(new Set(_tag[title]));
  }

  for (title of htmlTagTitleList) {
    Search[title] = [];
  }
}

function CretateTagHtml() {
  const tagHtml = document.getElementById("Search");
  var html = ``;
  html += `<div align="center">`;

  html += `<div class = "termText">`;
  html += ` 開始<input type="date" id = "StartDate" class = "term" onChange="ChangeDate('StartDate')"/>`;
  html += `</div>`;

  html += `<div class = "termText">`;
  html += ` 終了<input type="date" id = "EndDate" class = "term" onChange="ChangeDate('EndDate')"/>`;
  html += `</div>`;

  for (title of htmlTagTitleList) {
    html += `<button onclick="PopupSelectWindow('${title}')"/>${title}</button>`;
  }

  html += `</div>`;

  tagHtml.innerHTML = html;
}

function PopupSelectWindow(title) {

  const tagSelectPanel = SetPopupWindow(PopupWindowTagNumber.TagSelect);

  var html = ``;
  html += `
            <div style="display: flex; justify-content: flex-end;">
                <button onclick="HidePopUp()">×</button>
            </div>`;
  for (tag of Tags[title]) {
    var isCheck = Search[title].includes(tag)? "checked" : "";
    html += `<input type="checkbox" id="${title}-${tag}" name="${title}" onclick="ClickTag('${title}-${tag}','${title}','${tag}')" ${isCheck}/>`;
    html += `<label for="${title}-${tag}">${tag}</label><br>`;
  }
  tagSelectPanel.innerHTML = html;
}

function ClickTag(id, tagType, data) {
  const checkbox = document.getElementById(id);
  if (checkbox.checked) {
    Search[tagType].push(data);
  } else {
    datas = [];
    for (check of Search[tagType]) {
      if (check == data) continue;
      datas.push(check);
    }
    Search[tagType] = datas;
  }
  ReCreateHtml();
}

function ChangeDate(name) {
  var date = document.getElementById(name).value;
  SearchDate[name] = date;
  ReCreateHtml();
}

function ReCreateHtml() {
  var list = [];

  for (item of List) {
    var isSet = true;
    if (SearchDate["StartDate"] != null && SearchDate["StartDate"] != "") {
      isSet =
        new Date(new Date(SearchDate["StartDate"]).toDateString()) <=
        new Date(item[titleDate]);
    }
    if (SearchDate["EndDate"] != null && SearchDate["EndDate"] != "") {
      isSet =
        isSet &&
        new Date(new Date(item[titleDate]).toDateString()) <=
        new Date(SearchDate["EndDate"]);
    }

    for (title of htmlTagTitleList) {
      if (Search[title].length != 0) {
        var isInTag = false;
        for (tag of Search[title]) {
          isInTag = isInTag || item[title].includes(tag);
        }

        isSet = isSet && isInTag;
      }
    }

    if (isSet) {
      list.push(item);
    }
  }
  CreateHtml(list);
}


function IsIgnorTitle(title) {
  return title == titleId || title == titleCreate || title == titleUpdate;
}