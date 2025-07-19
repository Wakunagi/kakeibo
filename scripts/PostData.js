
let popupDiaplay = null;
const hideClassName = "hide";
const dispClassName = "popupBackground";

let postId = 0;
let postTagList = [];
let isPosted = false;

function CreatePopUp(_id) {    
    popupDiaplay = SetPopupWindow(PopupWindowTagNumber.PostData);
    isPosted = false;
    postTagList = [];
    postId = _id;
    const editData = List.find(x => x.id === _id);

    const postPay = document.getElementById("postPay");
    var html = "";
    for (let item of Tags[titlePay]) {

        var selected = "";
        if (editData != undefined) selected = editData[titlePay] == item ? "selected" : "";
        html += `<option value="${item}" ${selected}>${item}</option>`;
    }
    postPay.innerHTML = html;

    const postPurpose = document.getElementById("postPurpose");
    var html = "";
    for (let item of Tags[titlePurpose]) {

        var selected = "";
        if (editData != undefined) selected = editData[titlePurpose] == item ? "selected" : "";
        html += `<option value="${item}" ${selected}>${item}</option>`;
    }
    postPurpose.innerHTML = html;

    const postTag = document.getElementById("postTag");

    var html = "";
    for (let item of Tags[titleTag]) {

        var selected = "";
        if (editData != undefined) {
            selected = editData[titleTag].includes(item) ? "checked" : "";
            if (selected != "") {
                postTagList.push(item);
            }
        }
        html += `<input type="checkbox" id="${titleTag}-${item}" onchange="AddTag('${titleTag}-${item}','${item}')" ${selected}/>`;
        html += `<label for="${titleTag}-${item}">${item}</label><br>`;
    }
    postTag.innerHTML = html;

    const postDate = document.getElementById("postDate");
    const postAmount = document.getElementById("postAmount");
    const postItem = document.getElementById("postItem");
    const postNote = document.getElementById("postNote");

    if (_id == 0) {
        postDate.value = null;
        postAmount.value = 0;
        postItem.value = "";
        postNote.value = "";
    }
    else {
        postDate.value = GetDate(editData[titleDate], '-');
        postAmount.value = editData[titleAmount];
        postItem.value = editData[titleItem];
        postNote.value = editData[titleNote];
    }

}

function AddTag(_id, _value) {
    const isChecked = document.getElementById(_id).checked;
    if (isChecked == true) {
        postTagList.push(_value);
    }
    else {
        postTagList = postTagList.filter(n => n !== _value);
    }
}

async function HidePopUp() {
    PopupWindow.className = hideClassName;
    if (isPosted) {
        await loadingGSS(deproyKey);
        isPosted = false;
    }
}


async function fetchPost() {
    //id	create	update	date	amount	pay	purpose	tag	item	note

    const postDate = document.getElementById("postDate");

    if (postDate.value == "") return;

    const postAmount = document.getElementById("postAmount").value;
    const postItem = document.getElementById("postItem").value;
    const postNote = document.getElementById("postNote").value;

    const postPay = document.getElementById("postPay").value;
    const postPurpose = document.getElementById("postPurpose").value;

    const postTagElse = document.getElementById("postTagElse").value;
    if (postTagElse != "") postTagList.push(postTagElse);
    const postTag = postTagList.join(', ');

    const editData = List.find(x => x.id === postId);
    const create = GetDateTime(editData == undefined ? new Date() : editData[titleCreate]);

    var SendDATA = {};
    SendDATA[titleId] = postId;
    SendDATA[titleCreate] = create;
    SendDATA[titleUpdate] = GetDateTime(new Date());
    SendDATA[titleDate] = postDate.value.replaceAll("-", "/");
    SendDATA[titleAmount] = postAmount;
    SendDATA[titlePay] = postPay;
    SendDATA[titlePurpose] = postPurpose;
    SendDATA[titleTag] = postTag;
    SendDATA[titleItem] = postItem;
    SendDATA[titleNote] = postNote;

    console.log(SendDATA);

    var postparam =
    {
        "method": "POST",
        "mode": "no-cors",
        "Content-Type": "application/x-www-form-urlencoded",
        "body": JSON.stringify(SendDATA)
    };

    let sendPanel = document.getElementById("SendPanel");
    sendPanel.className = dispClassName;

    const isSend = await fetch(url, postparam);

    sendPanel.className = hideClassName;

    const _postDate = `${postDate.value}`;
    CreatePopUp(0);
    isPosted = true;
    postDate.value = _postDate;
}


function GetDateTime(_date) {
    const date = new Date(_date);
    const YYYY = date.getFullYear();
    const MM = ("00" + (date.getMonth() + 1)).slice(-2);
    const DD = ("00" + date.getDate()).slice(-2);
    const hh = ("00" + date.getHours()).slice(-2);
    const mm = ("00" + date.getMinutes()).slice(-2);
    const ss = ("00" + date.getSeconds()).slice(-2);
    return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`;
}