export interface Column {
  label?: string;
  prop: string;
  value?: any;
  disabled?: boolean;
  order?: number;
  span?: number;
  offset?: number;
  row?: boolean;
  count?: number;
  display?: boolean;
  labelWidth?: number;
  styles?: object;
  dataType?: string;
  component?: any;
  // Column-Select
  multiple?: boolean;
  // Column-Slider
  range?: boolean;
  // Column-Dynamic
  type: string;
}

export interface TableOption {
  detail?: boolean;
  display?: boolean;
  // Option
  column?: Column[];
  group?: TableOption[];
  submitBtn?: boolean;
}