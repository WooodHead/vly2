// Loading spinner to use when waiting for reduxAPI to get data.
// states
//  loading - display spinner
//  synced - display children
//  error - show error message.
import { Alert } from 'antd'

/* use for generic loading spinner not attached to ReduxAPI */
export const LoadSpinner = ({ className }) => <img src='/static/loading.svg' className={className} />

export const ReduxLoading = ({ entity, label }) => {
  if (!entity) { return <LoadSpinner /> }
  if (entity.loading) { return <LoadSpinner /> }
  if (entity.error) {
    return (
      <Alert
        style={{ margin: '2rem' }}
        message={`Error loading ${label}: ${entity.error.status} ${entity.error.statusText}`}
        type='error'
      />)
  }

  return null
}

export default ReduxLoading
