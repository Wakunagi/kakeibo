let PopupWindow = null;

function PopupSelectPanel(title) {
    DisplayPopupWindow(PopupPanelTags.TagSelect);
    const tagSelectPanel = document.getElementById("TagSelectBody");

    var html = ``;
    html += `<h3 style="text-align:center">${GetTitleText(title)}</h3>`;
    html += `<div class = "TagSelectBody">`;
    for (tag of _tags[title]) {
        var isCheck = _search[title].includes(tag) ? "checked" : "";
        html += `<input type="checkbox" id="${title}-${tag}" name="${title}" onclick="OnClickSearchTagButton('${title}-${tag}','${title}','${tag}')" ${isCheck}/>`;
        html += `<label for="${title}-${tag}">${tag}</label><br>`;
    }
    html += `</div>`;
    tagSelectPanel.innerHTML = html;
}


function PopupDataPostPanel(id, backData = undefined) {
    DisplayPopupWindow(PopupPanelTags.PostData);
    isPosted = false;
    postTagList = [];
    postId = id;
    const editData = _list.find(x => x.id === id);

    // 支払い方法のHTMLを作成
    const postPay = document.getElementById("postPay");
    var html = "";
    for (let item of _tags[TitlePay]) {

        var selected = "";
        if (editData != undefined) selected = editData[TitlePay] == item ? "selected" : "";
        if (selected == "" && backData != undefined && backData[TitlePay] == item) selected = "selected";
        html += `<option value="${item}" ${selected}>${item}</option>`;
    }
    postPay.innerHTML = html;

    // 目的のHTMLを作成
    const postPurpose = document.getElementById("postPurpose");
    var html = "";
    for (let item of _tags[TitlePurpose]) {

        var selected = "";
        if (editData != undefined) selected = editData[TitlePurpose] == item ? "selected" : "";
        if (selected == "" && backData != undefined && backData[TitlePurpose] == item) selected = "selected";
        html += `<option value="${item}" ${selected}>${item}</option>`;
    }
    postPurpose.innerHTML = html;

    // タグのHTMLを作成
    const postTag = document.getElementById("postTag");
    var html = "";
    for (let item of _tags[TitleTag]) {

        var selected = "";
        if (editData != undefined) {
            selected = editData[TitleTag].includes(item) ? "checked" : "";
            if (selected != "") {
                postTagList.push(item);
            }
        }
        html += `<input type="checkbox" id="${TitleTag}-${item}" onchange="AddPostTag('${TitleTag}-${item}','${item}')" ${selected}/>`;
        html += `<label for="${TitleTag}-${item}">${item}</label><br>`;
    }
    postTag.innerHTML = html;

    const postDate = document.getElementById("postDate");       // 日付
    const postAmount = document.getElementById("postAmount");   // 料金 
    const postItem = document.getElementById("postItem");       // 内容
    const postNote = document.getElementById("postNote");       // 備考

    if (id == 0) {
        postDate.value = null;
        postAmount.value = 0;
        postItem.value = "";
        postNote.value = "";
    }
    else {
        postDate.value = GetDate(editData[TitleDate], '-');
        postAmount.value = editData[TitleAmount];
        postItem.value = editData[TitleItem];
        postNote.value = editData[TitleNote];
    }

}