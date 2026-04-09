export interface ParsedProp {
  name: string;
  type: string;
  required: boolean;
}

export interface ComponentDoc {
  key: string;
  componentName: string;
  fileName: string;
  sourcePath: string;
  props: ParsedProp[];
  source: string;
}
