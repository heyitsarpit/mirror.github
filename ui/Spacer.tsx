type Props = {
  orientation: 'horizontal' | 'vertical'
}

export function Spacer({ orientation }: Props) {
  if (orientation === 'horizontal') {
    return <div className='mx-auto' />
  } else if (orientation === 'vertical') {
    return <div className='my-auto' />
  }

  return null
}
