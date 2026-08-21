import { redirect } from "next/navigation";

/** 根路径 → 默认中文首页 */
export default function RootPage() {
  redirect("/zh");
}
