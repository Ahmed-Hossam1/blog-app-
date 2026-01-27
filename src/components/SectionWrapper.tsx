import { ReactNode } from "react"

interface IProps  {
    children : ReactNode
}
const SectionWrapper = ({children} :IProps) => {
  return (
    <section className="pt-15 pb-10">{children}</section>
  )
}

export default SectionWrapper