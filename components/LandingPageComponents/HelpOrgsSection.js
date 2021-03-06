
import React from 'react'
import { Button, Divider } from 'antd'
import { HalfGrid, TripleGrid, H2, H3, P, StatContainer, PromoCard, TitleContainerMid, ImageContainer } from '../VTheme/VTheme'

const HelpOrgsSection = () => (
  <div id='orgs'>
    <HalfGrid>
      <div>
        <H2>Empower your organization</H2>
        <H3>Skilled volunteers are offering to help you out. We get all the admin and annoying stuff out of the way to give you more time</H3>

        <StatContainer>
          <img src='./static/img/icons/check.svg' />
          <P>Safe — everyone gets ID checked to keep you safe - for groups</P>
          <img src='./static/img/icons/check.svg' />
          <P>Personalised — we connect you with local people, for an activity at a time that suits</P>
          <img src='./static/img/icons/check.svg' />
          <P>Recognition and support — we help you through the process, and celebrate success</P>
        </StatContainer>
        <Button
          type='primary'
          shape='round'
          size='large'
          href='https://blog.voluntarily.nz'
          style={{ marginRight: '1rem' }}
        >Offer to help
        </Button>
        <Button
          type='secondary'
          shape='round'
          size='large'
          href='https://blog.voluntarily.nz'
        >Join as a business
        </Button>
      </div>
      <ImageContainer src='/static/img/about/empower.png' />

    </HalfGrid>
    <Divider />
    <TitleContainerMid><H2>Organisations on Voluntarily</H2></TitleContainerMid>
    <TripleGrid>

      <PromoCard>
        <img src='https://picsum.photos/400/240' />
      </PromoCard>

      <PromoCard>
        <img src='https://picsum.photos/400/240' />
      </PromoCard>

      <PromoCard>
        <img src='https://picsum.photos/400/240' />
      </PromoCard>

      <PromoCard>
        <img src='https://picsum.photos/400/240' />
      </PromoCard>

      <PromoCard>
        <img src='https://picsum.photos/400/240' />
      </PromoCard>

      <PromoCard>
        <img src='https://picsum.photos/400/240' />
      </PromoCard>

    </TripleGrid>

  </div>
)
export default HelpOrgsSection
