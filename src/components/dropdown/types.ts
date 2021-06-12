export type Props = {
  id: string;
  className?: string;
  label?: string;
  children: React.ReactNode;
  nav?: boolean;
};

export type _Props = Props & {
  labelClass: string;
};
