import { SVGProps, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={16}
    viewBox={'0 0 16 16'}
    width={16}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M11.707 14a.666.666 0 01-.307-.073L8 12.147l-3.4 1.78a.666.666 0 01-.967-.707L4.3 9.467 1.553 6.8a.667.667 0 01-.166-.667.667.667 0 01.54-.453l3.8-.553L7.4 1.707a.667.667 0 011.2 0l1.693 3.413 3.8.553a.666.666 0 01.54.454.667.667 0 01-.166.666L11.72 9.46l.667 3.753a.666.666 0 01-.267.667.667.667 0 01-.413.12zM8 10.733a.614.614 0 01.307.074l2.513 1.333-.48-2.807a.666.666 0 01.193-.593l2-1.953-2.8-.414A.667.667 0 019.26 6L8 3.5 6.74 6a.667.667 0 01-.5.36l-2.8.413 2 1.954a.667.667 0 01.193.593l-.48 2.773 2.514-1.333A.614.614 0 018 10.733z'
      }
      fill={'#E6AC39'}
    />
  </svg>
)

export const StarEmpty = memo(SvgComponent)
