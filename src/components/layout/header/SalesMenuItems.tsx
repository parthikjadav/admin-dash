import React from 'react'
import SalesMenuItem from './SalesMenuItem'
import { Separator } from '../../ui/separator'

const SalesMenuItems = () => {
  return (
    <>
      <SalesMenuItem icon="🎟️" title='Events' description='Manage your events effortlessly. Create, edit, and track event bookings in one place.' />
      <Separator />
      <SalesMenuItem icon="💃" title='Classes' description='Easily schedule, update, and manage class reservations for your students.' />
      <Separator />
      <SalesMenuItem icon="🔐" title='Private Classes' description='Handle private class inquiries and bookings smoothly for a personalized experience.' />
      <Separator />
      <SalesMenuItem icon="🕺" title='Trainers' description='Keep track of trainer profiles and availability with ease.' />
    </>
  )
}

export default SalesMenuItems