import ContentLayout from "../../../packages/antd/layouts/ContentLayout";
import Crud from "../../../packages/antd/crud/Crud";
import Divider from "../../../packages/antd/divider/Divider";
import Form from "../../../packages/antd/form/Form";
import Group from "../../../packages/antd/group/Group";
import HeaderLayout from "../../../packages/antd/layouts/HeaderLayout";
import HeaderSystemMenu from "../../../packages/antd/menus/HeaderSystemMenu";
import Image from "../../../packages/antd/image/Image";
import Input from "../../../packages/antd/input/Input";
import InputTable from "../../../packages/antd/input-table/InputTable";
import Radio from "../../../packages/antd/radio/Radio";
import Select from "../../../packages/antd/select/Select";
import SiderLayout from "../../../packages/antd/layouts/SiderLayout";
import Switch from "../../../packages/antd/switch/Switch";
import { Component } from "vue";

const components: {
  [propName: string]: Component;
} = {
  ContentLayout,
  Crud,
  Divider,
  Form,
  Group,
  HeaderLayout,
  HeaderSystemMenu,
  Image,
  Input,
  InputTable,
  Radio,
  Select,
  SiderLayout,
  Switch,
};

export default components;
