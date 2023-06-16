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

export type ColumnProps = {
  label?: string;
  value?: string;
}

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
  props?: ColumnProps;
  dicData?: [];
  // Column-Props
  label?: string;
  value?: any;
  children?: string;
  disabled?: boolean;
  // Column-Input
  placeholder?: string;
  change?: Function;
  // Column-Select
  cascader?: [];
  multiple?: boolean;
  allowCreate?: boolean;
  filterable?: boolean;
  // Column-Slider
  range?: boolean;
  // Column-Dynamic
  type: string;
};