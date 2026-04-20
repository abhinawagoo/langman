import DottleMascot from './dottle-mascot'

export default function SessionMascot({ session, isLoading, issueCount }) {
  const variant = (() => {
    if (isLoading)                        return 'fixing'
    if (!session)                         return 'sleeping'
    if (session.status === 'failed')      return 'detecting'
    if (issueCount > 0)                   return 'detecting'
    if (session.status === 'completed')   return 'happy'
    return 'idle'
  })()

  return <DottleMascot variant={variant} size={200} />
}
