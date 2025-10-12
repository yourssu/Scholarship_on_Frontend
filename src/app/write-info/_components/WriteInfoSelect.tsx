interface WriteInfoSelectProps {
  category: string;
  value: string;
  onChange: (newValue: string) => void;
  description?: React.ReactNode;
  error?: string;
  options?: string[];
}

export default function WriteInfoSelect({
  category,
  value,
  onChange,
  description,
  error,
  options = [],
}: WriteInfoSelectProps) {
  const [placeholder, ...selectableOptions] = options;

  return (
    <div className="mt-9 mb-6">
      <label className="font-h5-17 block text-neutral-800">{category}</label>
      <select
        className={`border-primary-500 flex w-full items-center border-b bg-transparent outline-none ${!value ? 'font-t1-14 h-8 text-neutral-500' : 'font-h5-17 h-10 text-neutral-800'} `}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="" disabled>
          {placeholder || '선택해주세요'}
        </option>
        {selectableOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {description && (
        <p className="font-t3-12 mt-1 text-[#7B7B7B]">{description}</p>
      )}
      {error && <p className="font-t3-12 mt-1 text-red-500">{error}</p>}
    </div>
  );
}
