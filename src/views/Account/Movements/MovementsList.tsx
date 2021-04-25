import React, { FunctionComponent, useEffect } from 'react'
import Loader from 'react-loader-spinner'
import useWallet from '../../../hooks/useWallet'
import { MovementType } from '../../../types/PaymentTypes'
import Movement from './Movement'

const MovementList: FunctionComponent<{}> = () => {
  const { loading, movements, getMovements } = useWallet()

  const controllerCancelable = new AbortController()
  const { signal } = controllerCancelable

  useEffect(() => {
    getMovements(signal)

    return () => {
      controllerCancelable.abort()
    }
  }, [])

  if (loading) {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          {loading && <Loader type="TailSpin" color="#615dfa" height={25} width={25} visible />}
        </div>
      </>
    )
  }

  return (
    <>
      {movements &&
        movements.map((item: MovementType) => {
          return <Movement key={item.id} item={item} />
        })}
    </>
  )
}

export default MovementList
