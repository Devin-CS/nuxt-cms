<template>
<q-layout view="hHh lpR fFf">
  <layout-header
    :mega-menu="megaMenu"
    @toggle-drawer="toggleDrawer"/>

  <layout-drawer
    :opened="drawerOpen"
    :mega-menu="megaMenu"
    @update="opened => drawerOpen = opened"/>

  <q-page-container>
    <router-view/>
  </q-page-container>

  <layout-footer/>
</q-layout>
</template>

<script setup lang="ts">
import LayoutDrawer from '~/layouts/defaultLayout/LayoutDrawer.vue'
import LayoutHeader from '~/layouts/defaultLayout/LayoutHeader.vue'
import LayoutFooter from '~/layouts/defaultLayout/LayoutFooter.vue'

const drawerOpen = ref(false)

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

const megaMenu: MegaMenuItem[] = [
  {
    label: 'Getting Started',
    path: '/getting-started',
    children: [
      {
        label: 'Sperm banking 101',
        path: '/getting-started/sperm-banking-101',
        description: 'Sperm banking basics, from its history to how it\'s used.\n'
      },
      {
        label: 'Medical and genetic considerations',
        path: '/getting-started/medical-genetic-considerations',
        description: 'Explore donor-screening information, genetics, and essential clinical insights.'
      },
      {
        label: 'Account onboarding and subscriptions',
        path: '/getting-started/account-onboarding-subscriptions',
        description: 'Set up your account, explore subscription options, and dive into donor details.'
      }
    ]
  },
  {
    label: 'Services',
    path: '/services',
    children: [
      {
        label: 'Vial management',
        path: '/services/vial-management',
        description: 'Your guide to vial buying, storing, shipping, returns, and transfers.'
      },
      {
        label: 'Genetic services',
        path: '/services/genetic-services',
        description: 'Utilize our genetic offerings to help you make informed choices.'
      },
      {
        label: 'Family services',
        path: '/services/family-services',
        description: 'Get support and resources for your journey post conception.'
      },
      {
        label: 'International services',
        path: '/services/international-services',
        description: 'See where and how donor vials can be shipped.'
      },
      {
        label: 'Donor reserve',
        path: '/services/donor-reserve',
        description: 'Find greater exclusivity through our Donor Reserve Program.'
      }
    ]
  },
  {
    label: 'Pricing',
    path: '/pricing',
    children: [
      {
        label: 'Financing',
        path: '/pricing/financing',
        description: 'Find flexible payment and finance plans here.'
      },
      {
        label: 'Fertility partner benefits',
        path: '/pricing/fertility-partner-benefits',
        description: 'Learn about our fertility benefit providers.'
      }
    ]
  },
  {
    label: 'About',
    path: '/about',
    children: [
      {
        label: 'Success stories',
        path: '/about/success-stories',
        description: 'Hear from families who went through the process.'
      },
      {
        label: 'Licenses and accreditations',
        path: '/about/licenses-accreditations',
        description: 'View verified industry credentials and qualifications.'
      },
      {
        label: 'Events',
        path: '/about/events',
        description: 'Stay updated with our latest events.'
      },
      {
        label: 'Contact us',
        path: '/about/contact-us',
        description: 'Questions? Get in touch. We’re here to help.'
      }
    ]
  },
  {
    label: 'Learn',
    path: '/learn',
    children: [
      {
        label: 'Vial types and insemination options',
        path: '/learn/vial-types-insemination-options',
        description: 'Educate yourself on different vial types and methods.'
      },
      {
        label: 'Donor types',
        path: '/learn/donor-types',
        description: 'Explore donor identification levels.'
      },
      {
        label: 'Planning your journey',
        path: '/learn/planning-your-journey',
        description: 'Steps and timing for your journey ahead.'
      },
      {
        label: 'Forms',
        path: '/learn/forms',
        description: 'Find the forms that you need for your pre or post insemination needs.'
      },
      {
        label: 'FAQs',
        path: '/learn/faqs',
        description: 'Answers to your most common questions.'
      }
    ]
  }
]
</script>
