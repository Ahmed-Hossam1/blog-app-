interface IProps {
  msg: string;
}
const ErrorMessage = ({ msg }: IProps) => {
  return msg ? (
    <span className="text-red-500 dark:text-red-400 text-xs">{msg}</span>

  ) : null;
};

export default ErrorMessage;
