const url_start = "https://script.google.com/macros/s/";
const url_end = "/exec";

const TITLE_LIST = ["日付", "金額", "支払方法", "区分", "内容", "備考"];
const htmlTagTitleList = ["支払方法", "区分"];
let List = [];
let Tags = {};
let Search = {};

let SearchDate = {};

let first_html = "";

let isGetLocalStrage = false;

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
async function loadingGSS(url) {
  const htmlId = document.getElementById("Records");
  first_html = htmlId.innerHTML;

  try {
    htmlId.innerHTML = "<p>Loading...</p>";
    const records = await fetch(url_start + url + url_end);
    List = await records.json();

    console.log(List);
    CreateHtml(List);
    CreateTag();
    CretateTagHtml();

    localStorage.setItem("url", url);
  } catch (error) {
    console.log("Error!");
    console.error(error);
    if (isGetLocalStrage) {
      localStorage.setItem("url", "");
    }
    htmlId.innerHTML = first_html;
  }
}

function GetDate(_date) {
  const date = new Date(_date);
  const yyyy = date.getFullYear();
  const mm = ("00" + (date.getMonth() + 1)).slice(-2);
  const dd = ("00" + date.getDate()).slice(-2);
  return `${yyyy}/${mm}/${dd}`;
}

function CreateHtml(list) {
  list.sort(function (a, b) {
    if (a["日付"] > b["日付"]) {
      return 1;
    } else {
      return -1;
    }
  });

  const htmlId = document.getElementById("Records");

  var sum = 0;
  var html = "";

  html += `<table border="1">`;

  html += "<tr>";
  for (title of TITLE_LIST) {
    html += `<th>${title}</th>`;
  }
  html += "</tr>";

  for (item of list) {
    sum += item["金額"];
    html += "<tr>";
    for (title of TITLE_LIST) {
      let str = item[title];
      if (title == "日付") {
        str = GetDate(item["日付"]);
      }
      html += `<td>${str}</td>`;
    }
    html += "</tr>";
  }

  html += `</table>`;

  html = `<h3>合計:${sum}</h3>` + html;
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
  html += ` 期間<input type="date" id = "StartDate" onChange="ChangeDate('StartDate')"/>~`;
  html += ` 期間<input type="date" id = "EndDate" onChange="ChangeDate('EndDate')"/>まで`;

  html += `<table >`;
  html += "<tr>";
  for (title of htmlTagTitleList) {
    html += `<td valign="top">`;
    html += `<details>`;

    html += `  <summary>${title}</summary>`;

    for (tag of Tags[title]) {
      html += `<input type="checkbox" id="${tag}" name="${title}" onclick="ClickTag('${tag}','${title}')"/>`;
      html += `<label for="${tag}">${tag}</label><br>`;
    }

    html += `</details>`;
    html += `</td>`;
  }
  html += "</tr>";
  html += `</table>`;

  tagHtml.innerHTML = html;
}

function ClickTag(id, tagType) {
  const checkbox = document.getElementById(id);
  if (checkbox.checked) {
    var data = "";
    for (tag of htmlTagTitleList) {
      data = checkbox.id;
    }
    Search[tagType].push(data);
  } else {
    datas = [];
    for (check of Search[tagType]) {
      if (check == checkbox.id) continue;
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
        new Date(item["日付"]);
    }
    if (SearchDate["EndDate"] != null && SearchDate["EndDate"] != "") {
      isSet =
        isSet &&
        new Date(new Date(item["日付"]).toDateString()) <=
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
