let _search = {};
let _searchDate = {};
let _sortOrder = {};

function OnClickSearchTagButton(id, tagType, data) {
    const checkbox = document.getElementById(id);
    if (checkbox.checked) {
        _search[tagType].push(data);
    } else {
        datas = [];
        for (check of _search[tagType]) {
            if (check == data) continue;
            datas.push(check);
        }
        _search[tagType] = datas;
    }
    ReCreateHtml();
}

function InputSearchDateCalendar(name) {
    var date = document.getElementById(name).value;
    _searchDate[name] = date;
    ReCreateHtml();
}

function SelectSortChange() {
    const checkbox = document.getElementById("SortDropdown");
    for (var sortName in SortData) {
        var sort = SortData[sortName];
        if (checkbox.value == GetSortOrderText(sort)) {
            _sortOrder = sort;
            ReCreateHtml();
            return;
        }
    }
}

function SortInData(list, sortData) {
    _sortOrder = sortData;
    return Sort(list, _sortOrder.Title, _sortOrder.IsAscending);
}

function Sort(list, title, isSortAscending) {
    return list.sort(function (a, b) {
        var order = isSortAscending ? a[title] > b[title] : a[title] < b[title];
        if (order) {
            return 1;
        } else {
            return -1;
        }
    });
}


// 表示するデータを編集
function ReCreateHtml() {
    var list = [];

    var startDate = null;
    if (_searchDate["StartDate"] != null && _searchDate["StartDate"] != "") {
        // 0時に修正(以上なら表示)
        startDate = new Date(_searchDate["StartDate"]);
        startDate.setHours(startDate.getHours() + startDate.getTimezoneOffset() / 60);
    }

    var endDate = null;
    if (_searchDate["EndDate"] != null && _searchDate["EndDate"] != "") {
        // 翌日の0時に修正(未満なら表示)
        endDate = new Date(_searchDate["EndDate"]);
        endDate.setHours(endDate.getHours() + endDate.getTimezoneOffset() / 60 + 24);
    }

    for (item of _list) {
        var isSet = true;

        // 日時検索（開始）を指定
        if (startDate != null) {
            isSet = startDate <= new Date(item[TitleDate]);
        }

        // 日時検索（終了）を指定
        if (endDate != null) {
            isSet &= new Date(item[TitleDate]) < endDate;
        }

        // 各タグに当てはまるかを判定
        for (title of HtmlTagTitleList) {
            if (_search[title] != null && _search[title].length != 0) {
                var isInTag = false;
                for (tag of _search[title]) {
                    isInTag = isInTag || item[title].includes(tag);
                }

                isSet &= isInTag;
            }
        }

        if (isSet) {
            list.push(item);
        }
    }

    CreateHtml(list);
}