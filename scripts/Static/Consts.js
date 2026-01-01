const UrlStart = "https://script.google.com/macros/s/";
const UrlEnd = "/exec";

const TitleId = "id";
const TitleCreate = "create";
const TitleUpdate = "update";
const TitleDate = "date";
const TitleAmount = "amount";
const TitlePurpose = "purpose";
const TitleTag = "tag";
const TitlePay = "pay";
const TitleItem = "item";
const TitleNote = "note";

const TitleList = [TitleId, TitleCreate, TitleUpdate, TitleDate, TitleAmount, TitlePay, TitlePurpose, TitleTag, TitleItem, TitleNote];
const HtmlTagTitleList = [TitleTag, TitlePurpose, TitlePay];

const PopupPanelTags = {
  PostData: `PostData`,
  TagSelect: `TagSelect`,
}

const SortData = {
  DateAscending: { Title: TitleDate, IsAscending: true },
  DateDescending: { Title: TitleDate, IsAscending: false },
  CreateAscending: { Title: TitleCreate, IsAscending: true },
  CreateDescending: { Title: TitleCreate, IsAscending: false },
  AmountAscending: { Title: TitleAmount, IsAscending: true },
  AmountDescending: { Title: TitleAmount, IsAscending: false },
}

const HideClassName = "hide";
const DispClassName = "popupBackground";

const TitleText = [
  new TitleKeyValue(TitleId,"ID"),
  new TitleKeyValue(TitleCreate,"作成日"),
  new TitleKeyValue(TitleUpdate,"更新日"),
  new TitleKeyValue(TitleDate,"日付"),
  new TitleKeyValue(TitleAmount,"金額"),
  new TitleKeyValue(TitlePurpose,"区分"),
  new TitleKeyValue(TitleTag,"タグ"),
  new TitleKeyValue(TitlePay,"支払方法"),
  new TitleKeyValue(TitleItem,"内容"),
  new TitleKeyValue(TitleNote,"備考"),
];

function TitleKeyValue(key, value) {
  this.key = key;
  this.value = value;
}

const MonthCount = 12;