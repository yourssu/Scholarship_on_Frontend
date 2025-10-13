import { ReactNode } from 'react';

interface DetailDescriptionProp {
  title: string;
  content: ReactNode;
  extra_title?: string;
  extra_content?: string;
}

export function DetailDescription({
  title,
  content,
  extra_title,
  extra_content,
}: DetailDescriptionProp) {
  return (
    <div>
      <div className="flex w-full items-center gap-3.5 pt-6 text-left text-[0.875rem] leading-[1.5625rem] font-semibold tracking-[-0.0256rem] text-black">
        <div className="text-[#4097F9]">{title}</div>
        <div className="text-black">{content}</div>
      </div>
      {(extra_title || extra_content) && (
        <div className="flex w-full items-center gap-3.5 text-left text-[0.75rem] leading-[1.25rem] font-medium tracking-[-0.0256rem] text-[#7B7B7B]">
          <div>*{extra_title}</div>
          <div>{extra_content}</div>
        </div>
      )}
    </div>
  );
}
