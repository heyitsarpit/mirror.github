export function LoadingBars({ count = 10 }: { count?: number }) {
  return (
    <div className='flex flex-col gap-4'>
      {Array(count)
        .fill(1)
        .map((_, i) => (
          <div key={i} className='h-16 bg-gray-800 rounded-md animate-pulse'></div>
        ))}
    </div>
  )
}
