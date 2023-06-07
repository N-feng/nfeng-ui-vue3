export type TableOption = {
  detail?: boolean;
  display?: boolean;
  // Option
  column?: Column[];
  labelWidth?: string;
  group?: TableOption[];
  menuSpan?: number;
  menuPosition?: string;
  submitBtn?: boolean;
} & {
  [key: string]: any;
};

export type Column = {
  prop: string;
  order?: number;
  span?: number;
  xsSpan?: number;
  offset?: number;
  push?: number;
  pull?: number;
  row?: boolean;
  count?: number;
  display?: boolean;
  labelWidth?: number;
  styles?: object;
  dataType?: string;
  component?: any;
  // Column-字典属性
  dicMap?: Object;
  dicData?: [];
  // Column-Props
  label?: string;
  value?: any;
  children?: string;
  disabled?: boolean;
  // Column-Input
  placeholder?: string;
  // Column-Select
  multiple?: boolean;
  filterable?: boolean;
  // Column-Slider
  range?: boolean;
  // Column-Dynamic
  type: string;
};