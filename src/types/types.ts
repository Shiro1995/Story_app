
export type Story = {
  id: number;
  title: string;
  by: string;
  score: number;
  time?: number;
  url?: string;
  text?: string;
  parent?: number;
  kids?: number[];
};
