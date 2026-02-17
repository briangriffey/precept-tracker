import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, id, style, onChange, ...props }: TextareaProps) {
  const [focused, setFocused] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const autoGrow = React.useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }, []);

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    minHeight: '6rem',
    padding: '0.5rem 0.75rem',
    fontSize: 'var(--font-size-base)',
    lineHeight: 'var(--line-height)',
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-surface)',
    border: `1px solid ${focused ? 'var(--color-primary)' : 'var(--color-border)'}`,
    borderRadius: 'var(--radius-md)',
    outline: 'none',
    resize: 'none',
    overflow: 'hidden',
    transition: 'border-color 150ms ease',
    fontFamily: 'var(--font-body)',
    ...style,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 'var(--spacing-xs)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontWeight: 400,
  };

  return (
    <div>
      {label && <label htmlFor={id} style={labelStyle}>{label}</label>}
      <textarea
        ref={textareaRef}
        id={id}
        style={textareaStyle}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        onChange={(e) => { autoGrow(); onChange?.(e); }}
        {...props}
      />
    </div>
  );
}
