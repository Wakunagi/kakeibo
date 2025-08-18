let _list = [];
let _tags = {};

let _deproyKey = "";
let _url = "";
let _isGetLocalStrage = false;
let _beforeLoginHtml = "";


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
  htmlId.innerHTML = _beforeLoginHtml;
  document.getElementById("Search").innerHTML = "";
}

//GSSからJsonを取得して変数に保存
async function loadingGSS(deproyKey) {
  _deproyKey = deproyKey;
  const htmlId = document.getElementById("Records");
  _beforeLoginHtml = htmlId.innerHTML;

  try {
    htmlId.innerHTML = "<p>Loading...</p>";
    const records = await fetch(UrlStart + _deproyKey + UrlEnd);
    _url = UrlStart + _deproyKey + UrlEnd;
    _list = await records.json();

    // 見た目の作成
    CreateMainView();

    localStorage.setItem("url", _deproyKey);
  } catch (error) {
    console.log("Error!");
    console.error(error);
    if (_isGetLocalStrage) {
      localStorage.setItem("url", "");
    }
    htmlId.innerHTML = _beforeLoginHtml;
  }
}

function CreateMainView() {
  console.log(_list);
  _sortOrder = SortData.DateDescending;
  CreateConstHtml();
  CreateHtml(_list);
  CreateTag();
  CretateTagHtml();
}


function CreateTag() {
  var _tag = {};
  for (title of TitleList) {
    _tag[title] = [];
  }

  for (object of _list) {
    for (title of TitleList) {
      var str = "" + object[title];
      var ts = str.split(", ");
      for (t of ts) {
        if (t == "") {
          continue;
        }
        _tag[title].push(t);
      }
    }
  }

  for (title of TitleList) {
    _tags[title] = Array.from(new Set(_tag[title]));
  }

  for (title of HtmlTagTitleList) {
    _search[title] = [];
  }
}
