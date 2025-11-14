
let postId = 0;
let postTagList = [];
let isPosted = false;

function AddPostTag(_id, _value) {
    const isChecked = document.getElementById(_id).checked;

    // Tagを挿入
    if (isChecked == true) {
        postTagList.push(_value);
    }

    // Tagを削除
    else {
        postTagList = postTagList.filter(n => n !== _value);
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

    const editData = _list.find(x => x.id === postId);
    const create = GetDateTime(editData == undefined ? new Date() : editData[TitleCreate]);

    var SendDATA = {};
    SendDATA[TitleId] = postId;
    SendDATA[TitleCreate] = create;
    SendDATA[TitleUpdate] = GetDateTime(new Date());
    SendDATA[TitleDate] = postDate.value.replaceAll("-", "/");
    SendDATA[TitleAmount] = postAmount;
    SendDATA[TitlePay] = postPay;
    SendDATA[TitlePurpose] = postPurpose;
    SendDATA[TitleTag] = postTag;
    SendDATA[TitleItem] = postItem;
    SendDATA[TitleNote] = postNote;

    console.log(SendDATA);

    var postparam =
    {
        "method": "POST",
        "mode": "no-cors",
        "Content-Type": "application/x-www-form-urlencoded",
        "body": JSON.stringify(SendDATA)
    };

    let sendPanel = document.getElementById("SendPanel");
    sendPanel.className = DispClassName;

    const isSend = await fetch(_url, postparam);

    sendPanel.className = HideClassName;

    const _postDate = `${postDate.value}`;

    var backData = {};
    backData[TitlePay] = postPay;
    backData[TitlePurpose] = postPurpose;

    PopupDataPostPanel(0, backData);
    isPosted = true;
    postDate.value = _postDate;
}
