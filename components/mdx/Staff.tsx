import { getStaff, type StaffMember } from '@/lib/content'
import StaffGrid, { type StaffPerson } from './StaffGrid'

interface StaffProps {
  staff: string
  coca?: boolean
  selector?: boolean
}

const LC_STAFF = ['L', 'C']

// Names shown on the site:
// - Coca page: name and surname
// - L/C pages: only the "nome di caccia" (Akela, Bagheera...), to keep the capi anonymous
// - E/G and R/S pages: first name only
function displayName(person: StaffMember, staff: string, coca: boolean) {
  if (coca) return person.nome
  const firstName = person.nome.split(' ').slice(0, -1).join(' ') || person.nome
  return LC_STAFF.includes(staff) ? person.nomeCaccia || firstName : firstName
}

export default function Staff({ staff, coca = false, selector = false }: StaffProps) {
  // Computed on the server: only what is displayed reaches the page (real names never end up in
  // the L/C pages' HTML or data).
  const people: StaffPerson[] = getStaff()
    .filter(p => (selector || staff === '*' || p.staff?.split('|').includes(staff)) && (!coca || p.coca === 1))
    .sort((a, b) => a.order - b.order)
    .map(p => ({
      name: displayName(p, staff, coca),
      ruolo: p.ruolo,
      staff: p.staff,
      desc: p.desc,
      img: p.img,
    }))

  return <StaffGrid people={people} initialStaff={staff} showBadges={coca} showDesc={!coca} selector={selector} />
}
