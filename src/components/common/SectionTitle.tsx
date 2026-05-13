interface SectionTitleProps {
  eyebrow?: string
  title: string
  description: string
}

export const SectionTitle = ({ eyebrow, title, description }: SectionTitleProps) => {
  return (
    <div className="space-y-2">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-400">{eyebrow}</p> : null}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-stone-900">{title}</h2>
        <p className="text-sm leading-6 text-stone-500">{description}</p>
      </div>
    </div>
  )
}
