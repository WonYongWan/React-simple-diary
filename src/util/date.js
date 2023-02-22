// new Date를 사람이 알아볼 수 있는 날짜로 변경
export const getStringDate = (date) => {
  // toISOString만 하면 2023-02-17T11:15:59.162Z이 나온다. slice를 통해 2023-02-17까지만 출력될 수 있도록 조정했다.
  return date.toISOString().slice(0, 10);
}