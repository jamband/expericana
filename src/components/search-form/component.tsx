import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <fieldset disabled={props.disabled} className={props.className}>
    <form onSubmit={props.submit}>
      <input
        type="search"
        name="search"
        className="form-control"
        placeholder="Search..."
        value={props.value}
        onChange={props.change}
      />
    </form>
  </fieldset>
);
