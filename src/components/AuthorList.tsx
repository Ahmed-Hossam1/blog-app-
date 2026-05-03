"use client";
import AuthorCard from "@/components/cards/AuthorCard";
import { IAuthor } from "@/types";
import { useState, useEffect, useCallback } from "react";

const AuthorsList = ({ authors }: { authors: IAuthor[] }) => {

  const [displayCount, setDisplayCount] = useState(8);
  const [isThrottled, setIsThrottled] = useState(false);

  const handleScroll = useCallback(() => {
    if (isThrottled) return;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      setIsThrottled(true);
      setDisplayCount((prev) => Math.min(prev + 4, authors.length));

      setTimeout(() => {
        setIsThrottled(false);
      }, 500); // 500ms throttle
    }
  }, [isThrottled, authors.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      {authors.slice(0, displayCount).map((author) => (
        <AuthorCard key={author.id} {...author} />
      ))}
    </>
  );
};

export default AuthorsList;

