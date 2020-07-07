import { ReactNode } from 'react'

export interface ITabOption {
  key: string
  title: string
  content: ReactNode
  onScrollBottom?: () => void
}
