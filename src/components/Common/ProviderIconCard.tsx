import React, { useEffect, useState } from 'react'
import { IconName } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ProviderIconCardProps {
  provider: string
  color?: string
}

export default function ProviderIconCard(props: ProviderIconCardProps) {
  const { provider, color } = props

  const [icon, setIcon] = useState<IconName | null>(null)

  const iconColor = color || '#3e3f5e'

  useEffect(() => {
    const providerLower = provider.toLowerCase()
    if (provider === 'VISA' || providerLower === 'visa') setIcon('cc-visa')
    else if (provider === 'MASTER_CARD' || providerLower === 'mastercard') setIcon('cc-mastercard')
    else if (provider === 'AMERICAN_EXPRESS' || providerLower === 'amex') setIcon('cc-amex')
    else if (provider === 'DINNERS' || providerLower === 'dinners') setIcon('cc-diners-club')
    else if (provider === 'DISCOVER' || providerLower === 'discover') setIcon('cc-discover')
    else if (provider === 'JCB' || providerLower === 'jcb') setIcon('cc-jcb')
    else setIcon(null)
  }, [provider])

  return <>{icon && <FontAwesomeIcon color={iconColor} icon={['fab', icon]} />}</>
}
