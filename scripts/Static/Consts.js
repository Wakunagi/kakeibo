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