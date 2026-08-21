/** 通用小工具 */

/** 断言非空（数据文件哨兵） */
export function assertData<T>(v: T | null | undefined, name: string): T {
  if (v == null) throw new Error(`[data] 缺少字段: ${name}`);
  return v;
}
