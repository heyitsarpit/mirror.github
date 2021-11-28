import { UserDropDown } from './UserDropDown'

export function Header() {
  return (
    <header className='flex flex-row-reverse p-4'>
      <UserDropDown />
    </header>
  )
}
