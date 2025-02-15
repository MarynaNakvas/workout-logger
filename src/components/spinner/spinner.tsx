import classNames from "classnames";
import { FC, memo, ReactNode } from "react";

interface SpinnerProps {
  className?: string;
  isLoading?: boolean;
  children?: ReactNode;
}

const Spinner: FC<SpinnerProps> = memo(({ className, isLoading, children }) =>
  isLoading ? (
    <div
      className={classNames(
        "w-10 h-10 my-4 mx-auto animate-spin border-4 rounded-full border-button-dark border-t-text",
        className
      )}
    />
  ) : (
    children
  )
);

Spinner.displayName = "Spinner";
export default Spinner;
