import { Column } from "../form/types";
import { TableColumnType, TableProps as AATableProps } from "ant-design-vue";
import { CSSProperties, VNode } from "vue";

type NewFormItem = Omit<
  Column,
  "name" | "names" | "label" | "row" | "newline" | "hide"
>;

type Col<T> = T extends Array<infer O> ? O : T;

type CustomRender = TableColumnType["customRender"];

export type TableColumn = Omit<Col<AATableProps["columns"]>, "rowSpan"> & {
  editable?: boolean | ((prop: BodyCellParams) => boolean);
  title?: string;
  key?: TableColumnType["key"];
  dataIndex?:
    | TableColumnType["dataIndex"]
    | ((editable: boolean) => TableColumnType["dataIndex"]);
  fixed?: TableColumnType["fixed"];
  width?: string | number | undefined;
  minWidth?: TableColumnType["minWidth"];
  maxWidth?: TableColumnType["maxWidth"];
  resizable?: TableColumnType["resizable"];
  customRender?: (
    props: Parameters<NonNullable<CustomRender>>[0] & { parentRecord?: any }
  ) => any;
  sorter?: TableColumnType["sorter"];
  ellipsis?: TableColumnType["ellipsis"];
  align?: TableColumnType["align"];
  required?: boolean;
  item?: NewFormItem | ((prop: BodyCellParams) => NewFormItem);
  /** 解密接口服务前缀 */
  decryptApiPrefix?: string;
  emptyCell?: VNode | VNode[] | string;
  customHeaderCell?: (column: TableColumn) => Record<string, any>;
  rowSpan?: number | boolean;
  style?: CSSProperties;
  headerStyle?: CSSProperties;
  class?: string;
  headerClass?: string;
  [key: string]: any;
};

export type BodyCellParams = {
  record: any;
  column: TableColumn;
  index: number;
  text: any;
};
