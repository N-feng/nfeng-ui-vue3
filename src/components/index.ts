import Row from "./row/Row";
import Theme from "../_hooks/useTheme";
import Form from "./form/Form";
import Image from "./image/Image";

import Divider from "./divider/Divider";

import Input from "./input/Input";

import ContentLayout from "./layouts/ContentLayout";
import HeaderLayout from "./layouts/HeaderLayout";
import SiderLayout from "./layouts/SiderLayout";

import HeaderSystemMenu from "./menus/HeaderSystemMenu";

const components = [
  Row,
  Theme,
  Form,
  Image,
  Divider,
  Input,
  ContentLayout,
  HeaderLayout,
  SiderLayout,
  HeaderSystemMenu,
];

export { Image, HeaderLayout, HeaderSystemMenu, Row };

export default components;
