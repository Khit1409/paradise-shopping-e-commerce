// 📂 utils/renderIcon.ts
import * as Icons from "@fortawesome/free-solid-svg-icons";
export function getIconByName(name: string) {
  return (Icons as any)[name];
}
