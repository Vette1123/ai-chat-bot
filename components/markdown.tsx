import { FC, memo } from 'react'
import ReactMarkdown, { Options } from 'react-markdown'

// compare the previous and next props to determine whether the component should be re-rendered
// https://reactjs.org/docs/react-api.html#reactmemo

export const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
)
