/**
 * Input — Underline-only style with italic serif placeholder.
 * Supports: input, textarea
 */
export default function Input({ as = 'input', label, id, className = '', rows = 4, ...props }) {
    const Tag = as;
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label
                    htmlFor={id}
                    className="text-[10px] uppercase tracking-[0.25em] text-[#6C6863] font-medium"
                >
                    {label}
                </label>
            )}
            <Tag
                id={id}
                rows={as === 'textarea' ? rows : undefined}
                className={`input-underline ${className}`}
                {...props}
            />
        </div>
    );
}
