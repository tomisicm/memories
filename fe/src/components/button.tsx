import cx from "classnames";

interface ButtonProps {
  buttonText: string;
  onClick: () => void;
  className?: string;
  isDisabled?: boolean;
}

export const Button = ({
  buttonText,
  onClick,
  className = "",
  isDisabled = false,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(className, { "btn-pressed": isDisabled })}
    >
      {buttonText}
    </button>
  );
};
