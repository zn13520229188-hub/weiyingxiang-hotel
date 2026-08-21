import type { ReactNode } from "react";

type Props = {
  /** 英文衬线小标，如 SPACE */
  kicker?: string;
  title: ReactNode;
  /** 可选正文 */
  text?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * 章节标题 —— kicker 小标 + 衬线大标题 + 细线 + 可选正文
 * 服务端组件，动画由外层 Reveal 包裹
 */
export default function SectionHeading({
  kicker,
  title,
  text,
  align = "center",
  className = "",
}: Props) {
  const center = align === "center";
  return (
    <div
      className={`${center ? "text-center items-center" : "text-left items-start"} flex flex-col gap-6 ${className}`}
    >
      {kicker && <span className="kicker">{kicker}</span>}
      <h2 className="font-serif text-3xl leading-snug tracking-wide text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className={`hairline w-16 ${center ? "mx-auto" : ""}`} />
      {text && (
        <p
          className={`max-w-xl text-[15px] leading-relaxed text-body ${center ? "mx-auto" : ""}`}
        >
          {text}
        </p>
      )}
    </div>
  );
}
