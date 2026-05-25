import React from 'react'

export default function Home(){
  return (
    <main style={{fontFamily:'Arial, sans-serif',padding:24}}>
      <h1>MayNext Classes API</h1>
      <p>The API routes for this project are listed below. Use Postman or curl to test them.</p>
      <ul>
        <li><a href="/api/here3">POST /api/here3</a> — create student (JSON body)</li>
        <li><a href="/api/here4">GET /api/here4</a> — list students</li>
        <li><a href="/api/here5">PUT /api/here5</a> — update student (JSON body)</li>
        <li><a href="/api/here6?student_id=1">DELETE /api/here6?student_id=1</a> — delete student</li>
      </ul>
      <p>If you still see a 404 at <strong>/</strong>, restart the dev server: <code>npx next dev</code>.</p>
    </main>
  )
}
