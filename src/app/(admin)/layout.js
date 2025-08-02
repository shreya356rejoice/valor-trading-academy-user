import Sidebar from '@/components/sidebar'
import React from 'react'

export default function layout({children}) {
  return (
    <div className="admin-layout">
      <div className="admin-flex">
        <div className="admin-sidbar">
          <Sidebar/>
        </div>
        <div className="admin-children">
          <div className="admin-children-alignment">
           {children}
           </div>
        </div>
      </div>
       
     
    </div>
  )
}
