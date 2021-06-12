export type Props = {
  className?: string;
};

export type _Props = Props & {
  disabled: boolean;
  submit: (event: React.FormEvent<HTMLFormElement>) => void;
  value: string | string[];
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
