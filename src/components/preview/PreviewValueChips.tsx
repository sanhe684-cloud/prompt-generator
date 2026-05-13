interface PreviewValueChipsProps {
  values: string[]
  chipClassName: string
}

export const PreviewValueChips = ({ values, chipClassName }: PreviewValueChipsProps) => {
  return (
    <div className="my-1 flex flex-wrap items-center gap-1.5">
      {values.map((value, index) => (
        <span key={`${value}-${index}`} className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-xs leading-none ${chipClassName}`}>
          {value}
        </span>
      ))}
    </div>
  )
}
