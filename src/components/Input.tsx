type InputProps = {
  type: "textarea" | "text"
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>

export default function Input({ type, ...props }: InputProps) {
  return type === "textarea"
    ? <textarea {...props} />
    : <input type="text" {...props} />
}