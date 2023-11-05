import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { MyProfileImg } from '@/assets/my-profile-img'
import { SignOutImg } from '@/assets/sign-out-img'
import { EditProfile } from '@/components/auth/edit-profile'
import { FormValues } from '@/components/auth/edit-profile/edit-mode-on'
import { Header } from '@/components/header'
import { DropDownItem } from '@/components/ui/drop-down'
import { Modal } from '@/components/ui/modal'
import { useAppSelector } from '@/services'
import { useMeQuery } from '@/services/auth/auth-api'

import s from './layout.module.scss'

import ava from '../../assets/ava.jpg'

export const Layout = () => {
  const auth = useMeQuery()
  const avatar = useAppSelector(state => state.auth.avatar) || ava
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('Ivan')

  return (
    <>
      <Header
        avatar={avatar}
        dropDownChildren={
          <>
            <DropDownItem
              icon={<MyProfileImg />}
              onSelect={() => setIsModalOpen(true)}
              text={'My profile'}
            />
            <DropDownItem
              icon={<SignOutImg />}
              lastItem
              onSelect={() => alert('SIGN OUT')}
              text={'Sign Out'}
            />
          </>
        }
        email={auth.data?.email}
        isLoggedIn
        name={name}
      />
      {isModalOpen && (
        <Modal onOpenChange={() => setIsModalOpen(false)} open={isModalOpen}>
          <EditProfile
            avatar={avatar}
            email={auth.data?.email}
            name={name}
            onSubmit={(data: FormValues) => {
              setIsModalOpen(false)
              setName(data.name)
            }}
          />
        </Modal>
      )}
      <div className={s.content}>
        <Outlet />
      </div>
    </>
  )
}
