import Sidebar from '@/components/sidebar'
import React from 'react'

export default function layout({children}) {
  return (
    <div class="admin-layout">
      <div class="admin-flex">
        <div class="admin-sidbar">
          <Sidebar/>
        </div>
        <div class="admin-children">
          <div class="admin-children-alignment">
           {children}
           </div>
        </div>
      </div>
       
     
    </div>
  )
}
