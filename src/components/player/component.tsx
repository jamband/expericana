import Link from "next/link";
import { Loading } from "~/components/loading";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <div style={{ display: props.display }}>
    {props.is1x1Ratio ? (
      <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-3">
        <div className="ratio ratio-1x1">
          {props.player.loading ? <Loading /> : null}
          <iframe
            key={props.player.id}
            className="rounded"
            src={props.src}
            title={props.player.type}
            onLoad={() => props.setLoading(false)}
            allowFullScreen
          />
        </div>
      </div>
    ) : (
      <div className="ratio ratio-16x9">
        {props.player.loading ? <Loading /> : null}
        <iframe
          key={props.player.id}
          className="rounded"
          src={props.src}
          title={props.player.type}
          onLoad={() => props.setLoading(false)}
          allowFullScreen
        />
      </div>
    )}
    <section className="mt-3 mb-4 text-center">
      <h1 className="h5 fw-bold">{props.player.title}</h1>
      <p>via {props.player.provider}</p>
    </section>
    <div className="text-center">
      <Link href={props.backTo}>
        <a>Back to {props.backToText}</a>
      </Link>{" "}
      <span className="mx-1">or</span>{" "}
      <Link href="/">
        <a>Recent favorites</a>
      </Link>
    </div>
  </div>
);
