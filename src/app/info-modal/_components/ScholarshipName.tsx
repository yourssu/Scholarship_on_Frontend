interface ShortDescriptionProp {
  name: string;
  description: string;
}

export function ShortDescription({ name, description }: ShortDescriptionProp) {
  return (
    <div className="flex w-full flex-col items-center gap-[0.375rem] pt-6 text-left text-[1.375rem] leading-[1.5625rem] font-bold tracking-[-0.0256rem] text-black">
      <div className="w-full border-b-[0.03125rem] border-[#7B7B7B] py-2.5 text-center">
        {name}
      </div>
      <div className="pt-2 text-[0.875rem] leading-[1rem] font-normal tracking-[-0.0256rem] text-[#7B7B7B]">
        {description}
      </div>
    </div>
  );
}
