interface HeadingProps {
  title?: string;
  description?: string;
}
const DashboardHeadingTitle = ({ title, description }: HeadingProps) => {
  return (
    <>
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-zinc-500 dark:text-zinc-400">{description}</p>
    </>
  );
};

export default DashboardHeadingTitle;
