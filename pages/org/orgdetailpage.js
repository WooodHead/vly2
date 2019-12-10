import { Button, message } from 'antd'
import Link from 'next/link'
import Router from 'next/router'
import { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import Loading from '../../components/Loading'
import OrgDetail from '../../components/Org/OrgDetail'
import OrgDetailForm from '../../components/Org/OrgDetailForm'
import { FullPage } from '../../components/VTheme/VTheme'
import publicPage from '../../hocs/publicPage'
import reduxApi, { withOrgs } from '../../lib/redux/reduxApi.js'
// import { MemberStatus } from '../../server/api/member/member.constants'

const blankOrg = {
  name: '',
  about: '',
  imgUrl: '/static/img/organisation/organisation.png',
  contactEmail: '',
  contactId: null,
  website: null,
  facebook: null,
  twitter: null,
  category: ['vp']
}

class OrgDetailPage extends Component {
  state = {
    editing: false,
    text: ''
  }

  static async getInitialProps ({ store, query }) {
    // Get one Org
    const isNew = query && query.new && query.new === 'new'
    if (isNew) {
      return {
        isNew: true,
        orgid: null
      }
    } else if (query && query.id) {
      await store.dispatch(reduxApi.actions.organisations.get(query))
      if (store.getState().session.isAuthenticated) {
        const meid = store.getState().session.me._id
        await store.dispatch(
          reduxApi.actions.members.get({ orgid: query.id, meid: meid })
        )
      }
      return {
        isNew: false,
        orgid: query.id
      }
    }
  }

  componentDidMount () {
    if (this.props.isNew) {
      this.setState({ editing: true })
    }
  }

  handleCancel = () => {
    this.setState({ editing: false })
    if (this.props.isNew) {
      // return to previous
      Router.back()
    }
  }

  async handleDelete (org) {
    if (!org) return
    // Actual data request
    await this.props.dispatch(
      reduxApi.actions.organisations.delete({ id: org._id })
    )
    // TODO: error handling - how can this fail?
    message.success('Deleted. ')
    Router.replace('/orgs')
  }

  async handleSubmit (org) {
    if (!org) return
    // Actual data request
    let res = {}
    if (org._id) {
      res = await this.props.dispatch(
        reduxApi.actions.organisations.put(
          { id: org._id },
          { body: JSON.stringify(org) }
        )
      )
    } else {
      res = await this.props.dispatch(
        reduxApi.actions.organisations.post({}, { body: JSON.stringify(org) })
      )
      org = res[0]
      Router.replace(`/orgs/${org._id}`)
    }
    this.setState({ editing: false })
    message.success('Saved.')
  }

  handleDeleteCancel = () => {
    message.error('Delete Cancelled')
  }

  render () {
    // TODO: [VP-274] identify if current person is an org Admin for this organisation
    // const isOrgAdmin =
    //   this.props.members.data.length &&
    //   this.props.members.data[0].status === MemberStatus.ORGADMIN
    // const isAdmin = this.props.me && this.props.me.role.includes('admin')
    // const canEdit = isOrgAdmin || isAdmin
    // const canRemove = isAdmin

    let content = ''
    let org = null
    if (this.props.organisations.loading) {
      content = <Loading />
    } else if (this.props.isNew) {
      org = blankOrg
    } else {
      const orgs = this.props.organisations.data
      if (orgs.length === 1) {
        org = orgs[0]
      }
    }

    if (!org) {
      content = (
        <div>
          <h2>Sorry this organisation is not available</h2>
          <Button shape='round'>
            <Link href='/orgs'>
              <a>
                <FormattedMessage
                  id='showOrgs'
                  defaultMessage='Show All'
                  description='Button to show all organisations'
                />
              </a>
            </Link>
          </Button>
          {/* <Button shape='round'>
          <Link href='/org/new'><a>
            <FormattedMessage id='org.altnew' defaultMessage='New Organisation' description='Button to create a new organisation' />
          </a></Link>
        </Button> */}
        </div>
      )
    } else {
      content = this.state.editing ? (
        <div>
          <OrgDetailForm
            org={org}
            onSubmit={this.handleSubmit.bind(this, org)}
            onCancel={this.handleCancel.bind(this)}
          />
        </div>
      ) : (
        <div>
          <OrgDetail org={org} meid={this.props.me._id} isAuthenticated={this.props.isAuthenticated} me={this.props.me} />
          {/* //TODO: this commented out code will likely go in the new settings tab
          <Divider />

          <h2>
            <FormattedMessage
              id='getInvolved'
              defaultMessage='Get involved'
              description='Header for org activities'
            />
          </h2>
          <h5>Volunteer with {org.name}</h5>
          <OpListSection org={org._id} />
          <div style={{ float: 'right' }}>
            <Button shape='round'>
              <Link href='/orgs'>
                <a>
                  <FormattedMessage
                    id='showOrgs'
                    defaultMessage='Show All'
                    description='Button to show all organisations'
                  />
                </a>
              </Link>
            </Button>
            {canEdit && (
              <Button
                type='primary'
                shape='round'
                onClick={() => this.setState({ editing: true })}
              >
                Edit
              </Button>
            )}
            {canRemove && (
              <Popconfirm
                title='Confirm removal of this organisation.'
                onConfirm={this.handleDelete.bind(this, org)}
                onCancel={this.handleDeleteCancel.bind(this)}
                okText='Yes'
                cancelText='No'
              >
                <Button style={{ float: 'right' }} type='danger' shape='round'>
                  <FormattedMessage
                    id='deleteOrg'
                    defaultMessage='Remove Organisation'
                    description='Button to remove an Organisatino on OrgDetails page'
                  />
                </Button>
              </Popconfirm>
            )}
          </div> */}
        </div>
      )
    }
    return <FullPage>{content}</FullPage>
  }
}

export default publicPage(withOrgs(OrgDetailPage))
