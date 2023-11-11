import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { ItIncubatorImg } from '@/assets/it-incubator'
import { Button } from '@/components/ui/button'
import { DropDown } from '@/components/ui/drop-down'
import { Typography } from '@/components/ui/typography'

import s from './header.module.scss'

type HeaderProps = {
  avatar?: string | undefined
  dropDownChildren?: ReactNode
  email?: string
  isLoggedIn: boolean
  name?: string
}

export const Header: FC<HeaderProps> = ({ avatar, dropDownChildren, email, isLoggedIn, name }) => {
  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        <Link to={'/'}>
          <ItIncubatorImg className={s.incImg} />
        </Link>

        {isLoggedIn ? (
          <div className={s.avatarBlock}>
            <Typography className={s.name} variant={'subtitle1'}>
              {name}
            </Typography>
            <DropDown
              avatar={avatar}
              email={email}
              name={name}
              trigger={
                <button>
                  <div className={s.img} style={{ backgroundImage: `url(${avatar})` }} />
                </button>
              }
            >
              {dropDownChildren}
            </DropDown>
          </div>
        ) : (
          <Button as={'a'} href={'/login'}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  )
}
