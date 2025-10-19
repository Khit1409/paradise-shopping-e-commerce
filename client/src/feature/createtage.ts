export function createTagName(value: string) {
  const arr = value.split(",");
  const payload = arr.map((a) => {
    return [`#${a.split(" ").join("-")}`];
  });

  return payload;
}
