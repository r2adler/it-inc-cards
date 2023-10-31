import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { TableDemo } from '@/components/ui/tables/table-demo'
import { TextField } from '@/components/ui/text-field'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks/decks-api'

const columns = [
  {
    key: 'name',
    sortable: true,
    title: 'Name',
  },
  {
    key: 'cardsCount',
    sortable: true,
    title: 'Cards',
  },
  {
    key: 'updated',
    sortable: true,
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    sortable: true,
    title: 'Created by',
  },
]

export const Decks = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10) // в слайс редакса
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const decks = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    name: search,
    //debounce
  })
  const [createDeck, { isLoading }] = useCreateDeckMutation()

  if (decks.isLoading) {
    return <div>...loading</div>
  }

  if (decks.isError) {
    return <div>ERROR</div>
  }

  return (
    <>
      <Link to={'/cards'}>go to cards</Link>

      <TextField
        label={'Search by name'}
        onChange={e => setSearch(e.currentTarget.value)}
        type={'search'}
        value={search}
      />

      <Button disabled={isLoading} onClick={() => createDeck({ name: 'new name' })}>
        create deck
      </Button>

      <Button onClick={() => setItemsPerPage(30)}>30 items per page</Button>
      <Button onClick={() => setItemsPerPage(10)}>10 items per page</Button>

      <TableDemo columns={columns} data={decks.data?.items} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '30px' }}>
        {[...Array(decks.data?.pagination?.totalPages)].map((_, i) => (
          <Button key={i} onClick={() => setCurrentPage(i + 1)} variant={'secondary'}>
            {i + 1}
          </Button>
        ))}
      </div>
    </>
  )
}
