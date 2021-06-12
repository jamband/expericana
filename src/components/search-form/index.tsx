import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Component } from "./component";
import type { Props } from "./types";

export const SearchForm: React.VFC<Props> = (props) => {
  const router = useRouter();
  const search = router.query.q || "";
  const [value, setValue] = useState(search);

  const disabled = !["/tracks", "/labels", "/stores", "/bookmarks"].includes(
    router.pathname
  );

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push({
      pathname: router.pathname,
      query: { q: value },
    });
  };

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue(search);
  }, [search]);

  return (
    <Component
      {...props}
      disabled={disabled}
      submit={submit}
      value={value}
      change={change}
    />
  );
};
