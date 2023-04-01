export type FilterFieldType = {
  title: string;
  value: string;
  isChosen: boolean;
}

export const filterFields: FilterFieldType[] = [
  { title: "Уход за телом", value: "body", isChosen: false },
  { title: "Уход за руками", value: "hand", isChosen: false },
  { title: "Уход за ногами", value: "foot", isChosen: false },
  { title: "Уход за лицом", value: "face", isChosen: false },
  { title: "Уход за волосами", value: "hair", isChosen: false },
  { title: "Средства для загара", value: "tan", isChosen: false },
  { title: "Средства для бритья", value: "shaving", isChosen: false },
  { title: "Подарочные наборы", value: "gift", isChosen: false },
  { title: "Гигиеническая продукция", value: "hygiene", isChosen: false },
  { title: "Гигиена полости рта", value: "mouth", isChosen: false },
  { title: "Бумажная продукция", value: "paper", isChosen: false }
];