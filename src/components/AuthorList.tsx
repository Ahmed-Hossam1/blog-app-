import AuthorCard from "@/components/cards/AuthorCard";
import { getAuthors } from "@/services";

const AuthorsList = async () => {
  const authors = await getAuthors();

  return (
    <>
      {authors.map((author) => (
        <AuthorCard key={author.id} {...author} />
      ))}
    </>
  );
};

export default AuthorsList;
