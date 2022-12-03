export interface MetaData {
  title: string;
  description: string;
}

export interface MetaType {
  [key: string]: MetaData;
}
