import Row, { RowProps as NRowProps, RowProps } from "../../../packages/antd/row/Row";
import Form from "../../../packages/antd/form/Form";
import Divider from "../../../packages/antd/divider/Divider";
import Input from "../../../packages/antd/input/Input";
import Select from "../../../packages/antd/select/Select";
import ContentLayout from "../../../packages/antd/layouts/ContentLayout";
import HeaderLayout from "../../../packages/antd/layouts/HeaderLayout";
import SiderLayout from "../../../packages/antd/layouts/SiderLayout";
import HeaderSystemMenu from "../../../packages/antd/menus/HeaderSystemMenu";

// const components = [
//   Row,
//   Form,
//   Divider,
//   Input,
//   Select,
//   ContentLayout,
//   HeaderLayout,
//   SiderLayout,
//   HeaderSystemMenu,
// ];

// export { HeaderLayout, HeaderSystemMenu, Row };

// export default components;

const components: {
  [propName: string]: Component;
} = {
  Row,
  Form,
  Divider,
  Input,
  Select,
  ContentLayout,
  HeaderLayout,
  SiderLayout,
  HeaderSystemMenu,
};

export default components

// export {
//   Row,
  // Form,
  // Divider,
  // Input,
  // Select,
  // ContentLayout,
  // HeaderLayout,
  // SiderLayout,
  // HeaderSystemMenu,
// };

// export type {
//   NRowProps,
// }
