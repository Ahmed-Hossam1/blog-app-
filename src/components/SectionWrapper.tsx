import { ReactNode } from "react"

interface IProps  {
    children : ReactNode
    className ?: string
}
const SectionWrapper = ({children , className} :IProps) => {
  return (
    <section className={`pt-15 pb-10 ${className}`}>{children}</section>
  )
}

export default SectionWrapper