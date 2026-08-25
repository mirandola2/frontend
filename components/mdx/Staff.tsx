import { getStaff } from '@/lib/content'
import StaffGrid from './StaffGrid'

interface StaffProps {
  staff: string
  coca?: boolean
  selector?: boolean
}

export default function Staff({ staff, coca = false, selector = false }: StaffProps) {
  const allStaff = getStaff()

  return (
    <StaffGrid allStaff={allStaff} initialStaff={staff} coca={coca} selector={selector} />
  )
}
