interface WriteInfoInputProps {
  category: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  description?: React.ReactNode;
  error?: string;
}

export default function WriteInfoInput({
  category,
  value,
  onChange,
  placeholder,
  description,
  error,
}: WriteInfoInputProps) {
  return (
    <div className="mt-9 mb-6">
      <label className="font-h5-17 block text-neutral-800">{category}</label>
      <input
        className={`border-primary-500 placeholder:font-t1-14 flex w-full items-center border-b bg-transparent outline-none placeholder:text-neutral-500 ${!value ? 'h-8' : 'font-h5-17 h-10 text-neutral-800'} `}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {description && (
        <p className="font-t3-12 mt-1 text-[#7B7B7B]">{description}</p>
      )}
      {error && <p className="font-t3-12 mt-1 text-red-500">{error}</p>}
    </div>
  );
}
