import { getPrefix } from "../../../src/_utils/common";
import { useProps, defineProps } from "../../core/common/props";
import { useEvent } from "../../core/common/event";
import b from "../../../src/utils/bem";
import { setPx } from "../../../src/utils/util";

const { prefixName, prefixCls } = getPrefix("InputTable");

export default defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...defineProps(),
    load: Function,
    dialogWidth: {
      type: String,
      default: "80%",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    const crudRef = ref<any>();
    const { clearableVal, valueKey } = useProps(props);
    const { object, text } = useEvent(props, emit);

    const {
      dialogWidth,
      disabled,
      placeholder,
      readonly,
      size,
      tip,
      tipPlacement,
    } = props;

    const box = ref<boolean>();
    const data = ref<any[]>([]);
    const loading = ref<boolean>(false);
    const main = ref<any>();
    const page: any = reactive({});
    const search = reactive({});

    const option = computed(() => {
      return Object.assign(
        {
          menu: false,
          header: false,
          size: size,
          headerAlign: "center",
          align: "center",
          highlightCurrentRow: true,
        },
        props.column.children
      );
    });

    watch(text, (val) => {
      console.log("val: ", val);
    });

    function handleSearchChange(form: any, done: Function) {
      Object.assign(page, {
        page: 1,
      });
      onList();
      done && done();
    }

    function handleShow() {
      main.value.blur();
      if (disabled || readonly) return;
      Object.assign(page, {
        currentPage: 1,
        total: 0,
      });
      data.value = [];
      box.value = true;
    }

    function onList() {
      loading.value = true;
      if (typeof props.load == "function") {
        props.load({ page: page, data: search }, (res: any) => {
          page.total = res.total;
          data.value = res.data;
          loading.value = false;
          let active = data.value.find(
            (ele: any) => ele[valueKey.value] == object[valueKey.value]
          );
          setTimeout(() => crudRef.value.setCurrentRow(active));
        });
      }
    }

    return () => {
      return (
        <div class={b(prefixCls)}>
          {tip ? (
            <a-tooltip
              trigger={["hover"]}
              placement={tipPlacement}
              v-slots={{
                title: () => tip,
                default: () => (
                  <a-input
                    ref={main}
                    v-model:value={text.value}
                    allow-clear={clearableVal.value}
                    disabled={disabled}
                    placeholder={placeholder}
                    size={size}
                    onFocus={handleShow}
                  />
                ),
              }}
            />
          ) : (
            <a-input
              ref={main}
              v-model:value={text.value}
              allow-clear={clearableVal.value}
              disabled={disabled}
              placeholder={placeholder}
              size={size}
              onFocus={handleShow}
            />
          )}
          <>
            {box.value && (
              <a-modal
                width={setPx(dialogWidth)}
                title={placeholder}
                v-model:visible={box.value}
              >
                {box.value && (
                  <n-crud
                    ref={crudRef}
                    class={b("crud")}
                    data={data.value}
                    onLoad={onList}
                    onSearchChange={handleSearchChange}
                    onSearchReset={handleSearchChange}
                    option={option.value}
                    page={page}
                    search={search}
                    tableLoading={loading.value}
                  ></n-crud>
                )}
              </a-modal>
            )}
          </>
        </div>
      );
    };
  },
});
