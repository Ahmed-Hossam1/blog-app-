interface IProps {
  msg: string;
}
const ErrorMessage = ({ msg }: IProps) => {
  return msg ? (
    <span className="text-red-500  text-xs">{msg}</span>
  ) : null;
};

export default ErrorMessage;
