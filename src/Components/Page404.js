import React from 'react'

export default function Page404({location}) {
  return (
    <div>
      <h2>404 Nema pronađeni rezultata za <code>{location.pathname}</code></h2>
   </div>
  )
}
