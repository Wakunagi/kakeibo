let amountGraph;

function CreateGraph(list) {

    // 12ヶ月分のデータを入れる配列
    var monthAmountList = [];
    for (var i = 0; i < MonthCount; i++) {
        monthAmountList.push([]);
    }

    // 1年以内のデータを注入
    for (var item of list) {
        var date = GetDate(item.date, '/');

        if (!IsInOneYear(date)) {
            continue;
        }
        var nowMonth = (new Date().getMonth()) + 1;
        var index = (GetMonth(date) - 1 - nowMonth + MonthCount) % MonthCount;
        monthAmountList[index].push(item.amount);
    }

    var monthAmountSumList = [];
    var yearMonthLabels = [];
    for (var i = 0; i < MonthCount; i++) {
        monthAmountSumList.push(GetSum(monthAmountList[i]));
        var now = new Date();
        var nowMonth = now.getMonth() - MonthCount + 1 + i + 1;
        var nowYear = now.getFullYear() - (nowMonth > 0 ? 0 : 1);
        nowMonth = nowMonth > 0 ? nowMonth : nowMonth + MonthCount;
        yearMonthLabels.push(`${nowYear}/${nowMonth}`);
    }

    var ctx = document.getElementById("myLineChart");
    if (amountGraph != undefined) {
        amountGraph.destroy();
        console.log("Destroy!");
    }

    amountGraph = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: yearMonthLabels,
            datasets: [
                {
                    label: '月の使用金額',
                    data: monthAmountSumList,
                    borderColor: "rgba(48, 45, 55, 1)",
                    backgroundColor: "rgba(117, 115, 126, 1)"
                },
            ],
        },
        options: {
            title: {
                display: true,
                text: '月の使用金額'
            },
        }
    });



    console.log(monthAmountSumList);
}

function IsInOneYear(date) {
    var year = GetYear(date);
    var month = GetMonth(date);

    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;

    if (year == nowYear) {
        return true;
    }

    var diff = nowYear - year;
    var deltaMonth = nowMonth + (diff * MonthCount);
    return month >= deltaMonth - MonthCount;
}

function GetMonth(date) {
    // YYYY/MM/DD 形式
    return date.substring(5, 7);
}

function GetYear(date) {
    // YYYY/MM/DD 形式
    return date.substring(0, 4);
}

function GetSum(list) {
    var sum = 0;
    for (var item of list) {
        sum += item;
    }
    return sum;
}