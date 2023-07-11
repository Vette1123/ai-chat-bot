import { ThemeToggle } from '@/components/theme-toggle'
import NavOptions from '@/components/navbar/nav-options'

const Navbar = async () => {
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <NavOptions className='px-4' />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
