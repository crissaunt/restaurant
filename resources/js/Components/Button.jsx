/**
 * Button — Luxury/Editorial style
 * variant: 'primary' | 'secondary' | 'gold'
 */
export default function Button({ children, variant = 'primary', className = '', type = 'button', onClick, disabled }) {
    let btnClass = 'btn-dark';
    if (variant === 'secondary') {
        btnClass = 'btn-outline-dark';
    } else if (variant === 'gold') {
        btnClass = 'btn-gold';
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${btnClass} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    );
}
