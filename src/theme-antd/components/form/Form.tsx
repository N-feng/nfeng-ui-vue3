export default defineComponent({
  setup(props, { slots }) {
    return () => {
      return (
        <a-form>
          {slots.default && slots.default()}
        </a-form>
      )
    }
  }
})