import { FixedSizeList as List } from "react-window";

export const CustomMenuList = (props: any) => {
  const itemHeight = 35;
  const { options, children, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * itemHeight;
  return (
    <div>
      <List
        height={150 || 100}
        itemCount={children.length}
        itemSize={itemHeight || 35}
        initialScrollOffset={initialOffset}
        width={'100%'}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    </div>
  );
};