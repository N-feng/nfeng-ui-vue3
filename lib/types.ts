import { DefineComponent, PropType } from "vue";

export enum SchemaTypes {
  "NUMBER" = "number",
  "INTEGER" = "integer",
  "STRING" = "string",
  "OBJECT" = "object",
  "ARRAY" = "array",
  "BOOLEAN" = "boolean",
}

type SchemaRef = { $ref: string };

// type Schema = any
export type Schema = {
  type?: SchemaTypes | string;

  title?: string;

  widget?: string | CommonWidgetDefine;
  properties?: {
    [key: string]: Schema;
  };
  items?: Schema | Schema[] | SchemaRef;
} & {
  [key: string]: any;
};

export type UISchema = {
  widget?: string | CommonWidgetDefine;
  properties?: {
    [key: string]: UISchema;
  };
  items?: UISchema | UISchema[];
} & {
  [key: string]: any;
};

export const FieldPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    require: true,
  },
  value: {}
} as const

export const CommonWidgetPropsDefine = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    // required: true,
  },
  errors: {
    type: Array as PropType<string[]>,
  },
  schema: {
    type: Object as PropType<Schema>,
    // required: true,
  },
  options: {
    type: Object as PropType<{ [keys: string]: any }>,
  },
  placeholder: {
    type: String
  }
} as const;

export const SelectionWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<
      {
        label: string
        value: string | number
      }[]
    >,
    require: true,
  },
  placeholder: {
    type: String,
    default: "请选择",
  }
} as const

export type CommonWidgetDefine = DefineComponent<
  typeof CommonWidgetPropsDefine,
  {},
  {}
>;

export type SelectionWidgetDefine = DefineComponent<
  typeof SelectionWidgetPropsDefine,
  {},
  {}
>

export enum SelectionWidgetNames {
  SelectionWidget = "SelectionWidget",
}

export enum CommonWidgetNames {
  TextWidget = "TextWidget",
  NumberWidget = "NumberWidget",
}

export interface Theme {
  widgets: {
    [SelectionWidgetNames.SelectionWidget]: SelectionWidgetDefine
    [CommonWidgetNames.TextWidget]: CommonWidgetDefine
    [CommonWidgetNames.NumberWidget]: CommonWidgetDefine
  }
}

interface ErrorSchemaObject {
  [level: string]: ErrorSchema;
}

export type ErrorSchema = ErrorSchemaObject & {
  __errors?: string[];
};
