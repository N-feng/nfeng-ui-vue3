import b from "../../../src/utils/bem";
import { getPrefix } from "../../../src/_utils/common";
import lang from "../../../src/locale/lang/zh";
import { setPx } from "../../../src/utils/util";
import { useProps, defineProps } from "../../core/common/props";
import { useEvent } from "../../core/common/event";
import { validatenull } from "../../../src";

const { prefixName, prefixCls } = getPrefix("InputTable");

export default defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...defineProps(),
    formatter: Function,
    load: Function,
    dialogWidth: {
      type: String,
      default: "80%",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    const crudRef = ref<any>();
    const { clearableVal, labelKey, valueKey } = useProps(props);
    const { text } = useEvent(props, emit);

    const {
      dialogWidth,
      disabled,
      placeholder,
      readonly,
      size,
      tip,
      tipPlacement,
    } = props;

    const active = ref<any>({});
    const box = ref<boolean>();
    const clear = ref<boolean>();
    const created = ref(false);
    const data = ref<any[]>([]);
    const loading = ref<boolean>(false);
    const main = ref<any>();
    const object = ref<any>({});
    const page: any = reactive({});
    const search = reactive({});

    const labelShow = computed(() => {
      if (typeof props.formatter === "function") {
        return props.formatter(object.value);
      }
      return object.value[labelKey.value] || ''
    });

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

    watch(() => props.modelValue, (val) => {
      if (validatenull(val)) {
        active.value = {}
        object.value = {}
      }
    });

    watch(text, (val) => {
      if (created.value || validatenull(val)) return;
      if (typeof props.load === "function") {
        props.load({ value: text.value }, (data: any) => {
          active.value = data;
          object.value = data;
          created.value = true;
        });
      }
    }, { immediate: true });

    function handleChange(event: any) {
      if (!event.target.value) handleClear();
    }

    function handleClear() {
      clear.value = true;
      active.value = {};
      setVal();
    }

    function handleCurrentRowChange(val: any) {
      active.value = val;
    }

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
      if (clear.value) {
        clear.value = false;
        return;
      }
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
            (ele: any) => ele[valueKey.value] == object.value[valueKey.value]
          );
          setTimeout(() => crudRef.value.setCurrentRow(active));
        });
      }
    }

    function setVal() {
      object.value = active.value;
      text.value = active.value[valueKey.value] || '';
      box.value = false;
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
                    value={labelShow.value}
                    allow-clear={clearableVal.value}
                    disabled={disabled}
                    placeholder={placeholder}
                    size={size}
                    onFocus={handleShow}
                    onChange={handleChange}
                  />
                ),
              }}
            />
          ) : (
            <a-input
              ref={main}
              value={labelShow.value}
              allow-clear={clearableVal.value}
              disabled={disabled}
              placeholder={placeholder}
              size={size}
              onFocus={handleShow}
              onChange={handleChange}
            />
          )}
          <>
            {box.value && (
              <a-modal
                width={setPx(dialogWidth)}
                title={placeholder}
                v-model:visible={box.value}
                v-slots={{
                  footer: () => {
                    return (
                        <div class="dialog-footer">
                          <a-button type="primary" onClick={setVal}>
                            <check-outlined />
                            {lang.common.submitBtn}
                          </a-button>
                        </div>
                    );
                  },
                }}
              >
                {box.value && (
                  <n-crud
                    ref={crudRef}
                    class={b("crud")}
                    data={data.value}
                    onCurrentRowChange={handleCurrentRowChange}
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
