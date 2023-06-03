export default function Input({
  type,
  id,
  name,
  ghostText,
  cssString,
}: {
  type: string;
  id: string;
  name?: string;
  ghostText?: string;
  cssString?: string;
}) {
  var inputField;

  switch (type) {
    case "textarea":
      inputField = (
        <textarea
          id={id}
          name={name}
          placeholder={ghostText}
          className={cssString}
        ></textarea>
      );
      break;
    default:
      inputField = (
        <input
          type="text"
          id={id}
          name={name}
          placeholder={ghostText}
          className={cssString}
        />
      );
      break;
  }

  return <>{inputField}</>;
}
