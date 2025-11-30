// 最初に1回だけ作成する
function CreateConstHtml() {
    var html = ``;

    // ソートのドロップダウンを作成
    var selectSortConst = document.getElementById("SelectSortConst");
    html = ``;
    html += `<div align="right">`;
    html += `<select class="LikeButton" id="SortDropdown" onChange="SelectSortChange()" style="margin-right: 6vw;">`;
    for (var sortName in SortData) {
        var sort = SortData[sortName];
        var selected = sort == _sortOrder ? "selected" : "";
        html += `<option value="${GetSortOrderText(sort)}" ${selected}>${GetSortOrderText(sort)}</option>`;
    }
    html += `</select>`;
    html += `</div>`;

    selectSortConst.innerHTML = html;
}

// 表部分の作成
function CreateHtml(list) {

    list = SortInData(list, _sortOrder);

    var sum = 0;
    var html = "";

    // 表の作成
    html += `<table border="0" style="margin:  0 auto;">`;

    // 1行目（タイトル部分）を作成
    html += `<tr>`;
    html += `<th class="calum row${0}">編集</th>`;
    for (title of TitleList) {
        if (IsIgnorTitle(title)) continue;

        html += `<th class="calum row${0}">${GetTitleText(title)}</th>`;
    }
    html += "</tr>";

    // 各行を作成
    for (let i in list) {
        var record = list[i];
        sum += record[TitleAmount];
        html += `<tr>`;

        // 編集ボタンを作成
        html += `<td class="calum ${classTag} row${i % 2 + 1}">`;
        html += `<button class="editButton" onclick="PopupDataPostPanel(${record[TitleId]})">編集</button>`;
        html += `</td>`;

        // 各データを挿入
        for (let index in TitleList) {
            const title = TitleList[index];

            if (IsIgnorTitle(title)) continue;

            let str = record[title];
            if (title == TitleDate) {
                str = GetDate(record[TitleDate], '/');
            }
            var classTag = "";

            html += `<td class="calum ${classTag} row${i % 2 + 1}">${str}</td>`;
        }
        html += "</tr>";
    }
    html += `</table>`;

    // 合計金額の表示
    html = `<div align="center"><div class = "sumText">合計:${sum}</div></div>` + html;

    // HTMLに適用
    document.getElementById("Records").innerHTML = html;
}

// 検索機能部分のHTMLを作成
function CretateTagHtml() {
    const tagHtml = document.getElementById("Search");
    var html = ``;
    html += `<div align="center">`;

    // 日付検索部分を作成
    html += `<div class = "termText">`;
    html += ` 開始<input type="date" id = "StartDate" class = "term" onChange="InputSearchDateCalendar('StartDate')"/>`;
    html += `</div>`;

    html += `<div class = "termText">`;
    html += ` 終了<input type="date" id = "EndDate" class = "term" onChange="InputSearchDateCalendar('EndDate')"/>`;
    html += `</div>`;

    // タグ検索部分を作成
    for (title of HtmlTagTitleList) {
        html += `<button onclick="PopupSelectPanel('${title}')"/>${GetTitleText(title)}</button>`;
    }

    html += `</div>`;
    tagHtml.innerHTML = html;
}
