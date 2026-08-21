"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";

type Props = { dict: Dict };

/**
 * 留言表单（演示占位）——
 * 一期不接入真实提交；发送后展示「已收到」状态，方便未来接 API
 */
export default function MessageForm({ dict }: Props) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-line bg-cream-deep p-10 text-center">
        <p className="font-serif text-2xl text-ink">✦</p>
        <p className="mt-4 font-serif text-xl text-ink">
          {name}，{dict.contact.formTitle}已收到
        </p>
        <p className="mt-3 text-sm text-mute">{dict.contact.formNote}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label
          htmlFor="msg-name"
          className="kicker !text-[11px]"
        >
          {dict.contact.formName}
        </label>
        <input
          id="msg-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-3 w-full border-b border-line bg-transparent py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-mute focus:border-wood"
          placeholder="…"
        />
      </div>
      <div>
        <label htmlFor="msg-body" className="kicker !text-[11px]">
          {dict.contact.formMessage}
        </label>
        <textarea
          id="msg-body"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="mt-3 w-full resize-none border-b border-line bg-transparent py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-mute focus:border-wood"
          placeholder="…"
        />
      </div>
      <button
        type="submit"
        className="inline-block bg-ink px-10 py-4 text-[13px] tracking-[0.25em] text-cream transition-colors duration-300 hover:bg-wood"
      >
        {dict.contact.formSubmit}
      </button>
      <p className="text-xs leading-relaxed text-mute">{dict.contact.formNote}</p>
    </form>
  );
}
