interface WriteInfoItemProps {
  category: string;
  value: string;
}

export default function WriteInfoItem({ category, value }: WriteInfoItemProps) {
  return (
    <div className="border-primary-500 h-16 w-full border-b">
      <p className="font-t2-14 text-[#808080]">{category}</p>
      <p className="font-h5-17 text-[#191919]">{value}</p>
    </div>
  );
}
