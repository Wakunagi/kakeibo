
// Popupを表示する処理
function DisplayPopupWindow(tag) {
  PopupWindow = document.getElementById("PopUpWindow");
  PopupWindow.className = DispClassName;

  var tagElement = null;
  for (var tagName in PopupPanelTags) {
    var panelId = PopupPanelTags[tagName];
    var element = document.getElementById(panelId);

    // タグと同じPanelだけを表示する
    if (panelId == tag) {
      element.className = panelId;
      tagElement = element;
    }

    // タグと違うPanelは非表示
    else {
      element.className = HideClassName;
    }
  }

  return tagElement;
}

// Popupを非表示にする処理
async function HidePopupWindow() {
    PopupWindow.className = HideClassName;

    // データの更新が行われていたら再読み込み
    if (isPosted) {
        await loadingGSS(_deproyKey);
        isPosted = false;
    }
}




