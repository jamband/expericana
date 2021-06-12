import { Footer } from "~/layouts/footer";
import { Header } from "~/layouts/header";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <div>
    <Header />
    <div className="container pt-4 pb-6">{props.children}</div>
    <Footer />
  </div>
);
